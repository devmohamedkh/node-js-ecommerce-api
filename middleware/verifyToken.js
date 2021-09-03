const { verifyJWT, verifAdminyJWT } = require("../utils/helpers/jwt");
const { errorResponse } = require("../utils/helpers/responsHelper");

const isAuth = (req, res, next) => {
  try {
    const token = req.header("auth-token");
    if (!token)
      return res.status(400).json(errorResponse("user not authenticated", 400));
    const verifiedUser = verifyJWT(token);
    req.user = verifiedUser;
    next();
  } catch (err) {
    return res.status(400).json(errorResponse("user not authenticated", 400));
  }
};

const verifyUser = (req, res, next) => {
  try {
    const token = req.header("auth-token");
    if (!token)
      return res.status(400).json(errorResponse("access denied", 400));
    const verifiedUser = verifyJWT(token);
    req.userId = verifiedUser;
    next();
  } catch (err) {
    return res.status(400).json(errorResponse("invalid token", 400));
  }
};

const verifyAdmin = (req, res, next) => {
  const token = req.header("admin-token");
  if (!token) return res.status(400).send("access denied");

  try {
    const verifiedAdmin = verifAdminJWT(token);
    req.admin = verifiedAdmin;
    next();
  } catch (err) {
    res.status(400).send("invalid token");
  }
};

module.exports = { verifyUser, verifyAdmin, isAuth };
