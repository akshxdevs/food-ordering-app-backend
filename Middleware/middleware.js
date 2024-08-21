const jwt = require("jsonwebtoken");
require("dotenv").config(); 
const SECRET = process.env.SECRET;

function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: "Access denied!" });
  }

  const token = authHeader.split(" ")[1]; 
  
  try {
    const decoded = jwt.verify(token, SECRET);
    req.token = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid token!" });
  }
}

module.exports = { verifyToken, SECRET };
