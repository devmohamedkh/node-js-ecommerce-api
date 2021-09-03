const productServise = require("../utils/service/productServise");
const cartServise = require("../utils/service/cartServise");
const Cart = require("../models/cartModels");
const Order = require("../models/orderModel");
const Product = require("../models/productModel");

const {
  errorResponse,
  successResponse,
} = require("../utils/helpers/responsHelper");

exports.createOrder = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.body.userId });

    for (let i = 0; i < cart.items.length; i++) {
      const itemInStoke = await Product.findById({
        _id: cart.items[i].productId,
      });
      if (cart.items[i].quantity > itemInStoke.quantity)
        return res.status(200).json(
          successResponse(
            {
              name: itemInStoke.name,
              desc: "the prodect is out of stock",
            },
            "order filler",
            200
          )
        );
    }

    const order = await Order.create({
      products: cart.items,
      userId: req.body.userId,
    });
    for (let i = 0; i < cart.items.length; i++) {
      const itemInStoke = await Product.findById({
        _id: cart.items[i].productId,
      });

      const updateQuentity = itemInStoke.quantity - cart.items[i].quantity;
      await Product.findByIdAndUpdate(
        cart.items[i].productId,
        {
          $set: {
            quantity: updateQuentity,
          },
        },
        { new: true }
      );
    }
    await cartServise.emptyCart();
    return res
      .status(200)
      .send({ message: "Order created successfully!", order });
  } catch (error) {
    return res.status(400).send({ message: "unable to create order", error });
  }
};

// don
exports.getOrder = async (req, res) => {
  try {
    const cart = await cartServise.getCart(req.userId);
    return res
      .status(200)
      .json(successResponse(cart, "get cart Successfully!", 201));
  } catch (error) {
    return res.status(400).json(errorResponse("Could not get cart", 400));
  }
};
// don
exports.canselOrder = async (req, res) => {
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

exports.RemoveProductfromeOrder = async (req, res) => {
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
