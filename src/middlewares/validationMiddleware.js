const { schema } = require("../config/database");
const ResponseHandler = require("../utils/responseHandler");
const validationMiddleware = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });
    if (error) {
      const errors = error.details.map((detail) => ({
        field: detail.path.join("."),
        message: detail.message,
      }));
      return ResponseHandler.badRequest(
        res,
        "Dados de entrada inválidos",
        errors,
      );
    }
    req.body = value;
    next();
  };
};
module.exports = validationMiddleware;