const Cart = require("../../models/cartModels");

exports.getCart = async (userId) => {
  return await Cart.findOne({ userId }).populate("items.productId");
};

exports.updateCartProductItem = async (userId, data) => {
  const userCart = await Cart.find({ userId });

  if (userCart) {
    const cartProductIndex = userCart.items.findIndex((item) => {
      return item.productId.toString() === data.productId.toString();
    });

    if (cartProductIndex >= 0) {
      userCart.items[cartProductIndex].quantity = Number.parseInt(
        data.quantity
      );
    } else {
      userCart.items.push({
        productId: data.productId,
        quantity: Number.parseInt(data.quantity),
      });
    }
    return userCart.save();
  } else {
    const add = Cart.create({
      userId,
      items: data,
    });
    return add;
  }
};

exports.RemoveProductfromeCart = async (userId, productId) => {
  const Usercart = await Cart.findOne({ userId });

  const updatedCartItems = Usercart.items.filter((item) => {
    return item.productId.toString() !== productId.toString();
  });

  Usercart.items = updatedCartItems;
  return await Usercart.save();
};

exports.emptyCart = async (userId) => {
  const Usercart = await Cart.findOneAndDelete(userId);
  return Usercart;
};

exports.addProductTocart = async (userId, data) => {
  const userCart = await Cart.findOne({ userId });

  if (userCart) {
    const cartProductIndex = userCart.items.findIndex((item) => {
      return item.productId.toString() === data.productId.toString();
    });

    if (cartProductIndex >= 0) {
      userCart.items[cartProductIndex].quantity = Number.parseInt(
        data.quantity
      );
    } else {
      userCart.items.push({
        productId: data.productId,
        quantity: Number.parseInt(data.quantity),
      });
    }
    return userCart.save();
  } else {
    const add = Cart.create({
      userId,
      items: data,
    });
    return add;
  }
};
