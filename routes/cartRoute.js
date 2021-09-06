const app = require("express").Router();
const cartController = require("../controllers/cartController");
const { verifyUser } = require("../middleware/verifyToken");

/*
    method => get 
    route  => api/cart/
    accses => only user have the account 
    desc   => to get cart and product in cart
*/
app.get("/", verifyUser, cartController.getCart);

/*
    method => post 
    route  => api/product/
    accses => all 
    desc   => to add product to cart
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
    desc   => to remove one product frome cart
*/
app.delete("/:id", verifyUser, cartController.RemoveProductfromeCart);

module.exports = app;
