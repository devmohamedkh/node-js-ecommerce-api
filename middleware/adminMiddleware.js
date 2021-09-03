function adminMid(req, res, next) {
  const token = req.header("auth-token");
  if (!token) return next();
  try {
    const verifiedAdmin = verifAdminJWT(token);
    req.admin = verifiedAdmin;
    next();
  } catch (err) {
    return next();
  }
}

module.exports = adminMid;
