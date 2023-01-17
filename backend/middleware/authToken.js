const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

module.exports = function (req, res, next) {
  // Get the token form the Header
  const token = req.header("x-auth-token");
  // If the token does not exist - 401 - Authorization Denied
  if (!token)
    return res
      .status(401)
      .json({ msg: "Authorization Denied, token is missing" });
  // verify token
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (error) {
    res.status(401).json({ msg: "Invalid Token" });
  }
};
