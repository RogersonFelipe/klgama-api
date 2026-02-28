const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config/environment");
const ResponseHandler = require("../utils/responseHandler");
const ErrorMessages = require("../utils/errorMessages");

const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    console.log("headerAuthorization recebido:", authHeader);

    if (!authHeader) {
      return ResponseHandler.unauthorized(res, ErrorMessages.MISSING_TOKEN);
    }

    const parts = authHeader.split(" ");
    if (parts.length !== 2) {
      return ResponseHandler.unauthorized(res, ErrorMessages.INVALID_TOKEN);
    }

    const [scheme, token] = parts;
    if (scheme !== "Bearer") {
      return ResponseHandler.unauthorized(res, ErrorMessages.INVALID_TOKEN);
    }
    if (!token || token.trim() === "") {
      return ResponseHandler.unauthorized(res, ErrorMessages.MISSING_TOKEN);
    }
    const decoded = jwt.verify(token, jwtSecret);
    req.user = decoded;
    next();
  } catch (error) {
    console.error("Erro na autenticação:", error.message);
    return ResponseHandler.unauthorized(res, ErrorMessages.INVALID_TOKEN);
  }
};
module.exports = authMiddleware;
