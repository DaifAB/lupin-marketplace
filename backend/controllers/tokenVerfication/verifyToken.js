const jwt = require("jsonwebtoken");
exports.verifySellerToken =  (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) return res.status(401).send("Access denied");

  try {
    const verified = jwt.verify(token, process.env.SELLER_TOKEN);
    req.seller = verified;
    next();
  } catch (error) {
    res.status(400).send("Invalid Token");
  }
};

exports.verifyAdminToken = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) return res.status(401).send("Access denied");

  try {
    const verified = jwt.verify(token, process.env.ADMIN_TOKEN);
    req.admin = verified;
    next();
  } catch (error) {
    res.status(400).send("Invalid Token");
  }
};