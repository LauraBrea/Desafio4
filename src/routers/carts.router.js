import { Router } from "express";
import * as CartsService from "../services/carts.service.js";

const cartsRouter = Router();

// Get product --> GET --> localhost:8080/api/carts
cartsRouter.get("/", (req, res) => {
    try {
      const carts = CartsService.getProducts();
      res.json(carts);
    } catch (error) {
      res.status(400).send(error);
    }
});

// Get product ID --> GET --> localhost:8080/api/carts/:cid?
cartsRouter.get("/:cid", (req, res) => {
    try {
        const {cid} = req.params;
        const cart = CartsService.getProduct(cid);
        res.json(cart);
    } catch (error) {
        res.status(400).send({ error: 'Product not found (search)' });
    }
});

// Create product --> POST --> localhost:8080/api/carts
cartsRouter.post("/", async (req, res) => {
    try {
        const {title, price, category, thumbnail } = req.body;
        await CartsService.createProduct (title, price, category, thumbnail);
        res.status(201).send("New product added");
    } catch (error) {
        res.status(400).send({ error: 'Incomplete values'});
    }
});

// Increment product ID cart--> POST --> localhost:8080/api/carts/product/:pid?
cartsRouter.post("/product/:pid?", (req, res) => {
    try {
        const {pid} = req.params;
        const cart = CartsService.addProduct(pid);
        res.json(cart);
    } catch (error) {
        res.status(400).send({ error: 'Product not found (select cart)' });
    }
});

export default cartsRouter;

