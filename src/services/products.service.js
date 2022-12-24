import fs from "fs";

let products = [];
const Products_File = "Products.json" ;


if (fs.existsSync(Products_File)) {
    try {
        products = JSON.parse(fs.readFileSync(Products_File, "utf-8"));
    } catch (error) {
        throw new Error({ error: 'File not found'});
    }
}

export function getProducts() {
    try {
        return products;
    } catch (error) {
        throw new Error(error.message);
    }
}

export function getProduct(pid) {
    try {
      const searchProduct = products.find((product) => product.id == pid);
        if (searchProduct) {
            return searchProduct;
        } else {
            res.status(400).send(error.message);
        }
    } catch (error) {
        throw new Error(error.message);
    }
}
  
export async function createProduct(title, description, code, price, status, stock, category, thumbnail) {
    try {
        let checkForm = {title, description, code, price, status, stock, category, thumbnail };
            if (!checkForm.title || !checkForm.description || !checkForm.code || !checkForm.price || 
                !checkForm.status || !checkForm.stock || !checkForm.category || !checkForm.thumbnail) {
                res.status(400).send(error.message);
            } else {
                const dataProduct = {title, description, code, price, status, stock, category, thumbnail };
                const addId = Math.floor(Math.random() * (100 - 1)) + 1;
                const addProduct = { id: addId, ...dataProduct }
                products.push(addProduct);
                fs.writeFileSync(Products_File, JSON.stringify(products));
            }
    } catch (error) {
        throw new Error(error.message);
    }
}

export function updateProduct(pid, title, description, code, price, status, stock, category, thumbnail ) {
    try {
        let checkForm = {title, description, code, price, status, stock, category, thumbnail };
            if (!checkForm.title || !checkForm.description || !checkForm.code || !checkForm.price || 
                !checkForm.status || !checkForm.stock || !checkForm.category || !checkForm.thumbnail) {
                res.status(400).send(error.message);
            } else {
                const searchProduct = products.find ((product) => product.id == pid);
                    if (searchProduct) {
                        const filterProduct = products.filter((product) => product.id != pid);  
                        const listProduct= filterProduct;  
                        const dataProduct = {title, description, code, price, status, stock, category, thumbnail };
                        const idProduct = pid;
                        const updateProduct = { id: idProduct, ...dataProduct }
                        listProduct.push(updateProduct);
                        fs.writeFileSync(Products_File, JSON.stringify(listProduct));
                        return listProduct;
                    } else {
                        res.status(400).send(error.message);
                    }
            } 
    } catch (error) {
        throw new Error(error.message);
    }
}

export function deleteProduct(pid) {
    try {
      const searchProduct = products.find((product) => product.id == pid);
        if (searchProduct) {
            const deleteProduct = products.filter((product) => product.id != pid);
            products = deleteProduct;
            fs.writeFileSync(Products_File, JSON.stringify(products));
            return products;
        } else {
            res.status(400).send(error.message);
        }
    } catch (error) {
        throw new Error(error.message);
    }
}



