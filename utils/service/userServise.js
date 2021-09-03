const User = require("../../models/userModel");
const bcrypt = require("bcryptjs");

exports.addUser = async (data) => {
  const newUser = await createUserObj(data);
  return await User.create(newUser);
};
exports.getUserByEmail = async (email) => {
  return await User.findOne({ email });
};
exports.getUserByEmailWithPassword = async (email) => {
  return await User.findOne({ email }).select("+password");
};
exports.getUserById = async (_id) => {
  return await User.findById(_id);
};
exports.getAllUsers = async () => {
  return await User.find({});
};
exports.updateUserById = async (_id, data) => {
  return await User.findByIdAndUpdate(_id, { $set: data }, { new: true });
};
exports.RemoveUserById = async (_id) => {
  return await User.findByIdAndRemove(_id);
};

const createUserObj = async (req) => {
  return {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 10),
    phone: req.body.phone,
  };
};
