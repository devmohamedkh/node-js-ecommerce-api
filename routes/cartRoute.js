const app = require("express").Router();
const cartController = require("../controllers/cartController");
const { verifyUser } = require("../middleware/verifyToken");

/*
    method => get 
    route  => api/cart/
    accses => all 
    desc   => to get all product in cart
*/
app.get("/", verifyUser, cartController.getCart);

/*
    method => post 
    route  => api/product/
    accses => all 
    desc   => to create product
*/
app.post("/", verifyUser, cartController.addProductTocart);

/*
    method => delete 
    route  => api/cart/empty-cart
    accses => only user have the account  
    desc   => to delete all product frome cart
*/
app.delete("/empty-cart", verifyUser, cartController.emptyCart);

/*
    method => post 
    route  => api/product/:id
    accses => only user have the account 
    desc   => to create product
*/
app.delete("/:id", verifyUser, cartController.RemoveProductfromeCart);

module.exports = app;
