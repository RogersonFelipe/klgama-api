const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config/environment");
const ResponseHandler = require("../utils/responseHandler");
const ErrorMessages = require("../utils/errorMessages");

const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return ResponseHandler.unauthorized(res, ErrorMessages.MISSING_TOKEN);
    }
    const token = authHeader.split("")[1];
    if (!token) {
      return ResponseHandler.unauthorized(res, ErrorMessages.MISSING_TOKEN);
    }
    const decoded = jwt.verify(token, jwtSecret);
    req.user = decoded;
    next();
  } catch (error) {
    console.error("Erro na autenticação:", error);
    return ResponseHandler.unauthorized(res, ErrorMessages.INVALID_TOKEN);
  }
};
module.exports = authMiddleware;