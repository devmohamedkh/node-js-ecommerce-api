const bcrypt = require("bcryptjs");

const userServise = require("../utils/service/userServise");
const {
  errorResponse,
  successResponse,
  loginSuccessResponse,
} = require("../utils/helpers/responsHelper");
const {
  registerValidation,
  loginValidation,
} = require("../middleware/validation");
const { creatJWT, creatAdminJWT } = require("../utils/helpers/jwt");

exports.signUp = async (req, res) => {
  try {
    const { error, value } = registerValidation(req.body);
    if (error)
      return res.status(400).json(errorResponse(error.details[0].message, 400));
    // to chack emaile if Email already exist or not
    const emailExist = await userServise.getUserByEmailWithPassword(
      req.body.email
    );

    if (emailExist)
      return res.status(400).json(errorResponse("Email already exist!", 400));

    // creat user if is not exist
    const saveUserToDB = await userServise.addUser(req);
    return res
      .status(201)
      .json(successResponse(saveUserToDB, "User created Successfully!", 201));
  } catch (error) {
    console.log(error);
    res.status(400).json(errorResponse("somting wos rong pless try agin", 400));
  }
};

exports.logIn = async (req, res) => {
  try {
    const { error, value } = loginValidation(req.body);
    console.log(error);
    if (error)
      return res.status(400).json(errorResponse(error.details[0].message, 400));
    // check if user is exist or not
    const foundUser = await userServise.getUserByEmailWithPassword(
      req.body.email
    );
    if (!foundUser)
      return res
        .status(400)
        .json(errorResponse("The email or password is incorrect", 400));
    // check is password correct or not
    const isMatch = bcrypt.compareSync(req.body.password, foundUser.password);
    if (!isMatch)
      return res
        .status(400)
        .json(errorResponse("The email or password is incorrect", 400));

    // create and assign jwt
    const token = creatJWT(foundUser._id);
    const userResponse = sendUserdata(foundUser);

    return res
      .status(200)
      .header("token", token)
      .json(loginSuccessResponse(userResponse, "login Successfully!", token));
  } catch (error) {
    console.log(error);
    res.status(400).json(errorResponse("somting wos rong pless try agin", 400));
  }
};

exports.logOut = async (req, res) => {
  return res
    .status(200)
    .header("auth-token", "")
    .json(successResponse("", "logOut Successfully!"));
};

// Admin
exports.signUpAdmin = async (req, res) => {
  try {
    const { error, value } = registerValidation(req.body);
    if (error)
      return res.status(400).json(errorResponse(error.details[0].message, 400));
    // to chack emaile if Email already exist or not
    const emailExist = await userServise.getUserByEmailWithPassword(
      req.body.email
    );

    if (emailExist)
      return res.status(400).json(errorResponse("Email already exist!", 400));

    // creat user if is not exist
    const saveUserToDB = await userServise.addUser(req);
    return res
      .status(201)
      .json(successResponse(saveUserToDB, "User created Successfully!", 201));
  } catch (error) {
    console.log(error);
    res.status(400).json(errorResponse("somting wos rong pless try agin", 400));
  }
};

exports.logInAdmin = async (req, res) => {
  try {
    const { error, value } = loginValidation(req.body);
    console.log(error);
    if (error)
      return res.status(400).json(errorResponse(error.details[0].message, 400));
    // check if user is exist or not
    const foundUser = await userServise.getUserByEmailWithPassword(
      req.body.email
    );
    if (!foundUser)
      return res
        .status(400)
        .json(errorResponse("The email or password is incorrect", 400));
    // check is password correct or not
    const isMatch = bcrypt.compareSync(req.body.password, foundUser.password);
    if (!isMatch)
      return res
        .status(400)
        .json(errorResponse("The email or password is incorrect", 400));

    // create and assign jwt
    const token = creatAdminJWT(foundUser._id);
    const userResponse = sendUserdata(foundUser);

    return res
      .status(200)
      .header("admin-token", token)
      .json(loginSuccessResponse(userResponse, "login Successfully!", token));
  } catch (error) {
    console.log(error);
    res.status(400).json(errorResponse("somting wos rong pless try agin", 400));
  }
};

exports.logOutAdmin = async (req, res) => {
  return res
    .status(200)
    .header("admin-token", "")
    .json(successResponse("", "logOut Successfully!"));
};

// to ignor password in response
const sendUserdata = (userdata) => {
  return {
    _id: userdata._id,
    firstName: userdata.firstName,
    lastName: userdata.lastName,
    email: userdata.email,
    phone: userdata.phone,
  };
};
