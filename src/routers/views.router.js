import { Router } from "express";
import fs from "fs";

const viewsRouter = Router();

viewsRouter.get("/", (req, res) => {
    try {
        const productsList = JSON.parse(fs.readFileSync("Products.json", "utf-8"));
        res.status(200).render("home", {products: productsList});
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

viewsRouter.get("/realtimeproducts", (req, res) => {
    try {
        const productsList = JSON.parse(fs.readFileSync("Products.json", "utf-8"));
        res.status(200).render('realTimeProducts', {products: productsList})
    } catch (error) {
        res.status(500).send({ error: error.message });
    }

});

export default viewsRouter;




/*
viewsRouter.get("/", (req, res) => {
    try {
        const productsList = productManager.getProducts();
        res.status(200).render("home", {products: productsList});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

viewsRouter.get("/realtimeproducts", (req, res) => {
    try {
        const productsList = productManager.getProducts();
        res.status(200).render('realTimeProducts', {products: productsList})
    } catch (error) {
        res.status(500).json({ error: error.message });
    }

});
*/