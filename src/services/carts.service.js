import fs from "fs";

let carts = [];
const Carts_File = "Carts.json" ;

const productsCart = [];


if (fs.existsSync(Carts_File)) {
    try {
        carts = JSON.parse(fs.readFileSync(Carts_File, "utf-8"));
    } catch (error) {
        throw new Error({ error: 'File not found'});
    }
}

export function getProducts() {
    try {
        return carts;
    } catch (error) {
        throw new Error(error.message);
    }
}

export function getProduct(cid) {
    try {
      const searchProduct = carts.find((cart) => cart.id == cid);
        if (searchProduct) {
            return searchProduct;
        } else {
            res.status(400).send(error.message);
        }
    } catch (error) {
        throw new Error(error.message);
    }
}

export async function createProduct(title, price, category, thumbnail) {
    try {
        let checkForm = {title, price, category, thumbnail };
            if (!checkForm.title || !checkForm.price || !checkForm.category || !checkForm.thumbnail) {
                res.status(400).send(error.message);
            } else {
                const dataProduct = {title, price, category, thumbnail };
                const addId = Math.floor(Math.random() * (100 - 1)) + 1;
                const addProduct = { id: addId, ...dataProduct }
                carts.push(addProduct);
                fs.writeFileSync(Carts_File, JSON.stringify(carts));
            }
    } catch (error) {
        throw new Error(error.message);
    }
}

export function addProduct(pid) {
    try {
        const searchProd = carts.find ((cart) => cart.id == pid);
            if (searchProd) {
                const selectProd = searchProd;
                const idProd = selectProd.id;
                let qty = productsCart.length;
                const cartProd = { id: idProd, qty: qty + 1}
                productsCart.push(cartProd);
                const showCart = (productsCart.at(-1));
                return showCart;
            }  else {
                res.status(400).send(error.message);
            }
    } catch (error) {
        throw new Error(error.message);
    }
}
