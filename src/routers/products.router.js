import { Router } from "express";
import * as ProductService from "../services/products.service.js";

const productsRouter = Router();

// Get product --> GET --> localhost:8080/api/products
productsRouter.get("/", (req, res) => {
    try {
      const products = ProductService.getProducts();
      res.json(products);
    } catch (error) {
      res.status(400).send(error);
    }
});

// Get product ID --> GET --> localhost:8080/api/products/:pid?
productsRouter.get("/:pid", (req, res) => {
    try {
        const {pid} = req.params;
        const product = ProductService.getProduct(pid);
        res.json(product);
    } catch (error) {
        res.status(400).send({ error: 'Product not found (search)' });
    }
});
  
// Create product --> POST --> localhost:8080/api/products
productsRouter.post("/", async (req, res) => {
    try {
        const {title, description, code, price, status, stock, category, thumbnail } = req.body;
        await ProductService.createProduct (title, description, code, price, status, stock, category, thumbnail);
        res.status(201).send("New product added");
    } catch (error) {
        res.status(400).send({ error: 'Incomplete values'});
    }
});

// Update product ID --> PUT --> localhost:8080/api/products/:pid?
productsRouter.put("/:pid?", (req, res) => {
    try {
        const {title, description, code, price, status, stock, category, thumbnail } = req.body;
        const {pid} = req.params;
        const putProduct = ProductService.updateProduct(pid, title, description, code, price, status, stock, category, thumbnail );
        res.json(putProduct);
    } catch (error) {
        res.status(400).send({ error: 'Product not found (update)' });
    }
});

// Delete product ID --> DELETE --> localhost:8080/api/products/:pid?
productsRouter.delete("/:pid?", (req, res) => {
    try {
        const {pid} = req.params;
        const delProduct = ProductService.deleteProduct(pid);
        res.json(delProduct);
    } catch (error) {
        res.status(400).send({ error: 'Product not found (delete)' });
    }
});

export default productsRouter;


/* postman > post > body > raw > json --> POST --> localhost:8080/api/products

    {
        "title": "Producto prueba",
        "description": "Este es un producto prueba",
        "code": "abc126",
        "price": 200,
        "status": true,
        "stock": 25,
        "category": "producto",
        "thumbnail": "Sin imagen"
    }

*/