const jwt = require("jsonwebtoken");
const User = require("../model/login");

exports.isAuth = async (req, res, next) => {
  const token = req.header("token");

  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, "1234567");

    // Check if the decoded payload has the necessary user information
    if (!decoded.user) {
      return res.status(401).json({ msg: "Invalid token, user not found" });
    }
console.log(decoded)
    const user = await User.findById(decoded.user);

    if (!user) {
      return res.status(401).json({ msg: "Invalid token, user not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};
