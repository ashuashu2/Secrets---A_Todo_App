const jwt = require("jsonwebtoken");

const SECREAT = "ASHUTOSH BIRTHARE TODO";

function verifyToken(token) {
  try {
    const decodeToken = jwt.verify(token, SECREAT);
    return decodeToken;
  } catch (error) {
    console.log("token not provided");
    return error;
  }
}

function extractUserIdFromToken(token) {
  try {
    const decode = verifyToken(token);
    if (decode && decode.userId) return decode.userId;
  } catch (error) {
    console.log("user id not available");
    return error;
  }
}

function authVerify(req, res, next) {
  const token = req.headers.authorization;
  try {
    const decodeId = extractUserIdFromToken(token);
    req.user = { decodeId };
    return next();
  } catch (error) {
    res.status(401).json({ error: "invalid access , please add the token" });
  }
}

module.exports = authVerify;
