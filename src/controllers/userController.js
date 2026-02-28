const UserService = require("../services/userService");
const ResponseHandler = require("../utils/responseHandler");
const ErrorMessages = require("../utils/errorMessages");

class UserController {
  static async criar(req, res) {
    try {
      const { nome, email, senha, cliente_id, is_adm } = req.body;
      const usuario = await UserService.criar({
        nome,
        email,
        senha,
        cliente_id,
        is_Adm,
      });

      return ResponseHandler.created(
        res,
        usuario,
        "Usuário criado com Sucesso",
      );
    } catch (erro) {
      console.error("Erro ao criar usuário", erro.message);

      if (erro.message === ErrorMessages.EMAIL_ALREADY_EXISTS) {
        return ResponseHandler.badRequest(res, erro.message);
      }

      if (erro.message === ErrorMessages.CLIENT_NOT_FOUND) {
        return ResponseHandler.notFound(res, erro.message);
      }

      return ResponseHandler.serverError(res, erro.message);
    }
  }

  static async listarTodos(req, res) {
    try {
      const usuarios = await UserService.listarTodos();

      return ResponseHandler.success(
        res,
        usuarios,
        "Usuarios listados com Sucesso",
      );
    } catch (erro) {
      console.error("Erro ao listar usuários:", erro.message);
      return ResponseHandler.serverError(res, erro.message);
    }
  }

  static async buscarPorId(req, res) {
    try {
      const { id } = req.params;

      const usuario = await UserService.buscarPorId(id);

      return ResponseHandler.success(res, usuario, "Usuário encontrado");
    } catch (erro) {
      console.error("Erro ao buscar usuário:", erro.message);

      if (erro.message === ErrorMessages.USER_NOT_FOUND) {
        return ResponseHandler.notFound(res, erro.message);
      }

      return ResponseHandler.serverError(res, erro.message);
    }
  }

  static async atualizar(req, res) {
    try {
      const { id } = req.params;
      const { nome, email, ativo, is_adm } = req.body;

      const usuarioAtualizado = await UserService.atualizar(id, {
        nome,
        email,
        ativo,
        is_adm,
      });

      return ResponseHandler.success(
        res,
        usuarioAtualizado,
        "Usuário atualizado com sucesso",
      );
    } catch (erro) {
      console.error("Erro ao atualizar usuário:", erro.message);

      if (erro.message === ErrorMessages.USER_NOT_FOUND) {
        return ResponseHandler.notFound(res, erro.message);
      }

      if (erro.message === ErrorMessages.EMAIL_ALREADY_EXISTS) {
        return ResponseHandler.badRequest(res, erro.message);
      }

      return ResponseHandler.serverError(res, erro.message);
    }
  }

  static async deletar(req, res) {
    try {
      const { id } = req.params;

      await UserService.deletar(id);

      return ResponseHandler.success(res, null, "Usuário deletado com sucesso");
    } catch (erro) {
      console.error("Erro ao deletar usuário:", erro.message);

      if (erro.message === ErrorMessages.USER_NOT_FOUND) {
        return ResponseHandler.notFound(res, erro.message);
      }

      return ResponseHandler.serverError(res, erro.message);
    }
  }
}

module.exports = UserController;