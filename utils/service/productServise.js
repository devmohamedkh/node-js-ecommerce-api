const Product = require("../../models/ProductModel");

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
