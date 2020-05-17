const jwt = require("jsonwebtoken");
const config = require("../../config");

const requireAuth = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token)
      return res.status(401).send({ message: "You must be logged in" });
    const decoded = jwt.verify(token, config.JWT_KEY);
    req.userData = decoded;
    next();
  } catch (err) {
    res.status(401).send({ message: "Auth failed" });
  }
};

module.exports = requireAuth;
