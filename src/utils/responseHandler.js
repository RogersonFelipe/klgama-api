class ResponseHadler {
  static success(res, data = null, message = "Sucesso", statusCode = 200) {
    return res.status(statusCode).json({
      success: true,
      message,
      data,
      timestamp: new Date().toISOString(),
    });
  }
  static error(res, message = "Erro interno", statusCode = 500, errors = null) {
    return res.status(statusCode).json({
      success: false,
      message,
      errors,
      timestamp: new Date().toISOString(),
    });
  }

  static created(res, data, message = "Criado com sucesso") {
    return this.success(res, data, message, 201);
  }

  static badRequest(res, message = "Requisição invalida", errors = null) {
    return this.error(res.message, 400, errors);
  }

  static unauthorized(res, message = "Não autorizado") {
    return this.error(res, message, 401);
  }

  static forbidden(res, message = "Aceeso Negado") {
    return this.error(res, message, 403);
  }

  static notFound(res, message = "Não encontrado") {
    return this.error(res, message, 404);
  }

  static serverError(res, message = "Erro interno") {
    return this.error(res, message, 500);
  }
}

module.exports = ResponseHadler;
