const Category = require("../../models/categoryModel");

exports.addCategory = async (name) => {
  return await Category.create({ name });
};
exports.getCategoryByName = async (name) => {
  return await Category.findOne({ name });
};

exports.getCategoryById = async (_id) => {
  return await Category.findById(_id);
};
exports.getAllCategorys = async () => {
  return await Category.find({});
};
exports.updateCategoryById = async (_id, data) => {
  return await Category.findByIdAndUpdate(_id, { $set: data }, { new: true });
};
exports.RemoveCategoryById = async (_id) => {
  return await Category.findByIdAndRemove(_id);
};
