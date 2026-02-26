const ResponseHandler = require("../utils/responseHandler");
const ErrorMessages = require("../utils/errorMessages");

const tenantMiddleware = (req, res, next) => {
  try {
    if (!req.user || !req.user.cliente_id) {
      return ResponseHandler.forbidden(res, ErrorMessages.UNAUTHORIZED);
    }
    const clienteIdParam = req.params.cliente_id || req.query.cliente_id;
    if (clienteIdParam && clienteIdParam !== req.user.cliente_id) {
      return ResponseHandler.forbidden(res, ErrorMessages.CROSS_TENANT_ACCESS);
    }
    req.clienteId = req.user.cliente_id;
    next();
  } catch (error) {
    console.error("Erro no tenant:", error);
    return ResponseHandler.serverError(res);
  }
};
module.exports = tenantMiddleware;