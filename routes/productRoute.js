const app = require("express").Router();
const productController = require("../controllers/productController");
const { verifyUser, isAuth } = require("../middleware/verifyToken");

/*
    method => get 
    route  => api/product/:id
    accses => all 
    desc   => to get all product
*/
app.get("/", productController.getAllProduct);
/*
    method => get 
    route  => api/product/
    accses => all 
    desc   => to product by id
*/
app.get("/:id", productController.getProductById);
/*
    method => post 
    route  => api/product/
    accses => all 
    desc   => to create product
*/
app.post("/", productController.addProduct);

/*
    method => patch 
    route  => api/product/id
    accses => only user have the account  
    desc   => to updet product
*/
app.patch("/:id", verifyUser, productController.updateProduct);

/*
    method => delete 
    route  => api/product/id
    accses => only user have the account  
    desc   => to delete product
*/
app.delete("/:id", verifyUser, productController.deleteProductById);

module.exports = app;
