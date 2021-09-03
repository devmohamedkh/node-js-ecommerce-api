const userServise = require("../utils/service/userServise");
const {
  errorResponse,
  successResponse,
} = require("../utils/helpers/responsHelper");

exports.updateUser = async (req, res) => {
  try {
    const userExist = await userServise.getUserById(req.params.id);

    if (!userExist)
      return res.status(404).json(errorResponse("user not found", 404));

    if (userExist._id != req.params.id && !req.admin)
      return res
        .status(401)
        .json(errorResponse("you dont have promithon to update the user", 401));
    const updatedUser = await userServise.updateUserById(
      req.params.id,
      req.body
    );

    if (!updatedUser)
      return res.status(400).json(errorResponse("Could not update user", 404));

    return res
      .status(200)
      .json(successResponse(updatedUser, "User updated Successfully!", 201));
  } catch (error) {
    return res.status(400).json(errorResponse("Could not update user", 404));
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await userServise.getAllUsers();
    return res
      .status(200)
      .json(successResponse(users, "get User Successfully!", 201));
  } catch (error) {
    return res.status(400).json(errorResponse("Could not get users ", 400));
  }
};

exports.getUserById = async (req, res) => {
  try {
    const userExist = await userServise.getUserById(req.params.id);

    if (!userExist)
      return res.status(404).json(errorResponse("user not found", 404));

    return res
      .status(200)
      .json(successResponse(userExist, "get User Successfully!", 201));
  } catch (error) {
    console.log(error);
    return res.status(400).json(errorResponse("Could not get users ", 400));
  }
};

exports.deleteUserById = async (req, res) => {
  try {
    const userExist = await userServise.getUserById(req.params.id);

    if (!userExist)
      return res.status(404).json(errorResponse("user not found", 404));

    if (userExist._id != req.params.id && !req.admin)
      return res
        .status(401)
        .json(errorResponse("you dont have promithon to delete the user", 401));

    const deletedUser = await userServise.RemoveUserById(req.params.id);

    if (!deletedUser)
      return res.status(404).json(errorResponse("user not deleted", 404));

    return res
      .status(200)
      .json(successResponse(userExist, "delete User Successfully!", 201));
  } catch (error) {
    return res.status(400).json(errorResponse("Could not delete users ", 400));
  }
};
