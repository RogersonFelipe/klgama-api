const AuthService = require("../services/authService");
const ResponseHadler = require("../utils/responseHandler");
const ErrorMessages = require("../utils/errorMessages");

class AuthController {
  static async login(req, res) {
    try {
      const resultado = await AuthService.login(email, senha);
      return ResponseHadler.success(
        res,
        resultado,
        "Login realizado com Sucesso",
      );
    } catch (erro) {
      console.error("Erro no login", erro.message);
      if (erro.message === ErrorMessages.INVALID_CREDENTIALS) {
        return ResponseHadler.unauthorized(res, erro.message);
      }
      if (erro.message === ErrorMessages.USER_INACTIVE) {
        return ResponseHadler.unauthorized(res, erro.message);
      }
      return ResponseHadler.serverError(res, erro.message);
    }
  }

  static async registrar(req, res) {
    try {
      const { nome, email, senha, cliente_id } = req.body;
      const resultado = await AuthService.registrar({
        nome,
        email,
        senha,
        cliente_id,
      });
      return ResponseHadler.created(
        res,
        resultado,
        "Usuário criado com sucesso",
      );
    } catch (erro) {
      console.error("Erro no Registro:", erro.message);
      if (erro.message === ErrorMessages.EMAIL_ALREADY_EXISTS) {
        return ResponseHadler.badRequest(res, erro.message);
      }
      if (erro.message === ErrorMessages.CLIENT_NOT_FOUND) {
        return ResponseHadler.notFound(res, erro.message);
      }
      if (erro.message === ErrorMessages.CLIENT_INACTIVE) {
        return ResponseHadler.forbidden(res, erro.message);
      }
    }
  }

  static async validarToken(req, res) {
    try {
      return ResponseHadler.success(
        res,
        {
          usuario: req.user,
        },
        "Token valido",
      );
    } catch (erro) {
      console.error("Erro ao validar token:", erro.message);
      return ResponseHadler.serverError(res);
    }
  }
}

module.exports = AuthController;