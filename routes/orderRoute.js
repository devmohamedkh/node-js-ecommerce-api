const app = require("express").Router();
const cartController = require("../controllers/cartController");
const orderController = require("../controllers/orderController");
const { verifyUser } = require("../middleware/verifyToken");

/*
    method => get 
    route  => api/order/
    accses => all 
    desc   => to get all product in cart
*/
app.get("/", verifyUser, orderController.getOrder);

/*
    method => post 
    route  => api/order/
    accses => all 
    desc   => to create product
*/
app.post("/", verifyUser, orderController.createOrder);

/*
    method => delete 
    route  => 
    accses => 
    desc   => 
*/
///not working
// app.delete("/cansel-order", verifyUser, orderController.canselOrder);

/*
    method => post 
    route  => api/product/:id
    accses => only user have the account 
    desc   => to create product
*/
///not working
// app.delete("/:id", verifyUser, orderController.RemoveProductfromeOrder);

module.exports = app;
