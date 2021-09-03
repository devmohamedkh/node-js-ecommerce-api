const jwt = require("jsonwebtoken");

exports.creatJWT = (_id) => {
  return jwt.sign({ _id: _id }, process.env.JWT_KEY, { expiresIn: "30 days" });
};

exports.verifyJWT = (token) => {
  return jwt.verify(token, process.env.JWT_KEY);
};

exports.creatAdminJWT = (_id) => {
  return jwt.sign({ _id: _id }, process.env.JWT_KEY_ADMIN, {
    expiresIn: "30 days",
  });
};

exports.verifAdminJWT = (token) => {
  return jwt.verify(token, process.env.JWT_KEY_ADMIN);
};
