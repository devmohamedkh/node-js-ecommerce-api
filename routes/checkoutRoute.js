const app = require("express").Router();
const checkoutController = require("../controllers/checkoutController");
const { verifyUser } = require("../middleware/verifyToken");

app.get("/", verifyUser, checkoutController.getCheckout);

app.get("/success", verifyUser, checkoutController.getCheckoutSuccess);

app.get("/cancel", checkoutController.getCheckoutCancel);

module.exports = app;
