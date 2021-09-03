const Cart = require("../../models/cartModels");
const Product = require("../../models/productModel");
const Order = require("../../models/orderModel");
const cartServise = require("./cartServise");
const {
  errorResponse,
  successResponse,
  loginSuccessResponse,
} = require("../utils/helpers/responsHelper");
exports.getOrders = async (userId) => {
  return await Order.findOne({ userId });
};
// exports.getOrderById = async (userId) => {
//   return await Order.findOne({ userId });
// };

exports.updeteOrders = async (userId) => {
  return await Cart.findOneAndUpdate({ userId });
};

// don
exports.deleteOrders = async (orderId) => {
  return await Order.findOneAndDelete({ _id: orderId });
};

// don
exports.createOrderForSingelProduct = async (userId) => {
  const stock = await Product.findById(data.productId);

  if (data.quantity > stock.quantity)
    return res.status(200).send({ message: "Product is out of stock" });

  const order = await Order.create(data);
  await cartServise.RemoveProductfromeCart(data.userId, data.productId);

  const update = { quantity: stock.quantity - data.quantity };

  await Product.findByIdAndUpdate(stock.id, update, { new: true });

  return order;
};

// exports.createOrders = async (data) => {
//   try {
//     const stock = await Product.findById(data.productId);
//     const cart = Cart.findOne(data.userId);

//     cart.items.map((product) => {
//       return {};
//     });

//     if (data.quantity > stock.quantity)
//       return res.status(200).send({ message: "Product is out of stock" });

//     const order = await Order.create(data);

//     const update = { quantity: stock.quantity - data.quantity };

//     await Product.findByIdAndUpdate(stock.id, update, { new: true });

//     return res
//       .status(200)
//       .send({ message: "Order created successfully!", order });
//   } catch (error) {
//     return res.status(400).send({ message: "unable to create order", error });
//   }
// };
