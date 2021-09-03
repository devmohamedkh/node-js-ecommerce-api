const productServise = require("../utils/service/productServise");
const cartServise = require("../utils/service/cartServise");
const Cart = require("../models/cartModels");

const {
  errorResponse,
  successResponse,
} = require("../utils/helpers/responsHelper");

exports.addProductTocart = async (req, res) => {
  try {
    const productExist = await productServise.getProductById(
      req.body.productId
    );

    if (!productExist)
      return res.status(404).json(errorResponse("product not found", 404));

    const addProductToCart = await cartServise.addProductTocart(
      req.userId,
      req.body
    );

    if (!addProductToCart)
      return res.status(400).json(errorResponse("Could not add product", 404));

    return res
      .status(200)
      .json(
        successResponse(addProductToCart, "product updated Successfully!", 201)
      );
  } catch (error) {
    console.log(error);
    return res.status(400).json(errorResponse("Could not add product", 404));
  }
};

// don
exports.getCart = async (req, res) => {
  try {
    const cart = await cartServise.getCart(req.userId);
    return res
      .status(200)
      .json(successResponse(cart, "get cart Successfully!", 201));
  } catch (error) {
    return res.status(400).json(errorResponse("Could not get cart ", 400));
  }
};
// don
exports.emptyCart = async (req, res) => {
  try {
    const cartEmpty = await cartServise.emptyCart();

    if (!cartEmpty)
      return res
        .status(404)
        .json(errorResponse("cart empty unSuccessfully", 404));

    return res
      .status(200)
      .json(successResponse(cartEmpty, "cart empty Successfully!", 201));
  } catch (error) {
    console.log(error);

    return res
      .status(400)
      .json(errorResponse("Could not empty the cart ", 400));
  }
};

exports.RemoveProductfromeCart = async (req, res) => {
  try {
    const deletedproduct = await cartServise.RemoveProductfromeCart(
      req.userId,
      req.params.id
    );

    if (!deletedproduct)
      return res.status(404).json(errorResponse("product not deleted", 404));

    return res
      .status(200)
      .json(
        successResponse(deletedproduct, "delete product Successfully!", 201)
      );
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json(errorResponse("Could not delete products ", 400));
  }
};
