const Product = require("../../models/ProductModel");
const { successResponse } = require("../helpers/responsHelper");
exports.addProduct = async (data) => {
  return await Product.create(data);
};

exports.getProductById = async (_id) => {
  return await Product.findById(_id);
};
exports.getAllProduct = async () => {
  return await Product.find({});
};
exports.updateProductById = async (_id, data) => {
  return await Product.findByIdAndUpdate(_id, { $set: data }, { new: true });
};
exports.RemoveProductById = async (_id) => {
  return await Product.findByIdAndRemove(_id);
};
exports.RemoveProduct = async (_id, userId) => {
  return await Product.deleteOne({ _id: _id, userId: userId });
};

exports.isProductsInStoke = async (products) => {
  for (let i = 0; i < products.length; i++) {
    const itemQuantityInStoke = products[i].productId.quantity;
    console.log(itemQuantityInStoke);

    if (products[i].quantity > itemQuantityInStoke) return products[i];

    return;
  }
};

exports.updateProductsQuantityInStoke = async (products) => {
  for (let i = 0; i < products.length; i++) {
    const updateQuantity =
      products[i].productId.quantity - products[i].quantity;
    console.log(products[i].productId._id);
    await Product.findByIdAndUpdate(
      products[i].productId._id,
      {
        $set: {
          quantity: updateQuantity,
        },
      },
      { new: true }
    );
  }
};

// exports.isProductsInStoke = async (products, res) => {
//   for (let i = 0; i < products.length; i++) {
//     const itemInStoke = await Product.findById({
//       _id: products[i].productId,
//     });
//     if (products[i].quantity > itemInStoke.quantity)
//       return res.status(200).json(
//         successResponse(
//           {
//             name: itemInStoke.name,
//             desc: "the prodect is out of stock",
//           },
//           "order filler",
//           200
//         )
//       );
//   }
// };

// exports.updateProductsQuantityInStoke = async (products) => {
//   for (let i = 0; i < products.length; i++) {
//     const itemInStoke = await Product.findById({
//       _id: products[i].productId,
//     });
//     const updateQuantity = itemInStoke.quantity - cart.items[i].quantity;
//     await Product.findByIdAndUpdate(
//       products[i].productId,
//       {
//         $set: {
//           quantity: updateQuantity,
//         },
//       },
//       { new: true }
//     );
//   }
// };
