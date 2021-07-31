const jwt = require("jsonwebtoken");
const secret = process.env.SECRET;

const authVerify = (req, res, next) => {
  const token = req.headers.authorization;
  try {
    const decoded = jwt.verify(token, secret);
    console.log({ decoded })
    req.user = { userId: decoded.userId };
    return next();
  } catch (error) {
    res.status(401).json({ success: false, message: "Unauthorized access, please add the token", errorMessage: error.message })
  }
}

module.exports = { authVerify };