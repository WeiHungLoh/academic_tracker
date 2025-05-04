const jwt = require("jsonwebtoken");
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;

const verifyToken = (req, res, next) => {
  // Split the current "Bearer <token>" under headers authorisation section to get token
  const token = req.headers.authorization?.split(" ")[1]; 

  if (!token) {
    return res.status(401).send("Please login");
  }

  try {
    const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET);
    // Store existing id, email, new iat and expiry
    req.user = decoded; 
    next();
  } catch (err) {
    return res.status(401).send("Access token invalid or expired. Please login again");
  }
}

module.exports = verifyToken;
