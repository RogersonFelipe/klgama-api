const ResponseHadler = require("../utils/responseHandler");
const errorHandler = (err, req, res, next) => {
  console.error("Erro não tratado:", {
    message: err.message,
    stack: err.stack,
    path: req.path,
    method: req.method,
  });
  if (res.headersSent) {
    return next(err);
  }
  if (err.name === "ValidationError") {
    return ResponseHadler.unauthorized(res.err.message);
  }
  if (err.name === "JsonWebTokenError") {
    return ResponseHadler.unauthorized(res, "Token invalido");
  }
  if (err.name === "TokenExpiredError") {
    return ResponseHadler.unauthorized(res, "Token Expirado");
  }
  return ResponseHadler.serverError(
    res,
    process.env.NODE_ENV === "development"
      ? err.message
      : "Erro interno do Servidor",
  );
};
