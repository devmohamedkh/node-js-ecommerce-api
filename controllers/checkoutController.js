const checkoutServise = require("../utils/service/checkoutServise");
const cartServise = require("../utils/service/cartServise");
const orderController = require("./orderController");
const {
  errorResponse,
  successResponse,
} = require("../utils/helpers/responsHelper");

exports.getCheckout = async (req, res) => {
  try {
    const cart = await cartServise.getCart(req.userId);
    if (!cart)
      return res.status(404).json(errorResponse("cart not found", 404));
    const session = await checkoutServise.checkoutSessionsCreate(
      cart.items,
      req
    );
    return res.status(200).json(
      successResponse(
        {
          sessionId: session.id,
          products: cart.items,
        },
        "get checkout Successfully!",
        201
      )
    );
  } catch (error) {
    return res
      .status(404)
      .json(errorResponse("somting was rong please try agin", 404));
  }
};
exports.getCheckoutSuccess = async (req, res) => {
  orderController.createOrder(req, res);
};
exports.getCheckoutCancel = async (req, res) => {
  return res.status(200).json(errorResponse("the checkOut is cansel", 400));
};
