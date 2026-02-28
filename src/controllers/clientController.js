const ClientService = require("../services/clientService");
const ResponseHadler = require("../utils/responseHandler");
const ErrorMessages = require("../utils/errorMessages");

class ClientController {
  static async criar(req, res) {
    try {
      const { nome, ativo } = req.body;
      const cliente = await ClientService.criar({ nome, ativo });

      return ResponseHadler.created(res, cliente, "Cliente criado com sucesso");
    } catch (erro) {
      console.error("Error ao criar cliente:", erro.message);
      return ResponseHadler.serverError(res, erro.message);
    }
  }

  static async listarTodos(req, res) {
    try {
      const clientes = await ClientService.listarTodos();

      return ResponseHadler.success(
        res,
        clientes,
        "Clientes listado com Sucesso",
      );
    } catch (erro) {
      console.error("Erro ao listar Clientes:", erro.message);
      return ResponseHadler.serverError(res, erro.message);
    }
  }

  static async buscarPorId(req, res) {
    try {
      const { id } = req.params;
      const cliente = await ClientService.buscarPorId(id);

      return ResponseHadler.success(res, cliente, "Cliente Encontrado");
    } catch (erro) {
      console.error("Erro ao Buscar Cliente:", erro.message);

      if (erro.message === ErrorMessages.CLIENT_NOT_FOUND) {
        return ResponseHadler.serverError(res, erro.message);
      }

      return ResponseHadler.serverError(res, erro.message);
    }
  }

  static async atualizar(req, res) {
    try {
      const { id } = req.params;
      const { nome, ativo } = req.body;
      const clienteAtualizado = await ClientService.atualizar(id, {
        nome,
        ativo,
      });

      return ResponseHadler.success(
        res,
        clienteAtualizado,
        "Cliente atualizado com sucesso",
      );
    } catch (erro) {
      console.error("Erro ao atualizar cliente:", erro.message);

      if (erro.message === ErrorMessages.CLIENT_NOT_FOUND) {
        return ResponseHadler.notFound(res, erro.message);
      }

      return ResponseHadler.serverError(res, erro.message);
    }
  }

  static async deletar(req, res) {
    try {
      const { id } = req.params;

      await ClientService.deletar(id);

      return ResponseHadler.success(res, null, "Cliente deletado com Sucesso");
    } catch (erro) {
      console.error("Erro ao deletar Cliente:", erro.message);

      if (erro.message === ErrorMessages.CLIENT_NOT_FOUND) {
        return ResponseHadler.notFound(res, erro.message);
      }

      return ResponseHadler.serverError(res, erro.message);
    }
  }
}

module.exports = ClientController;
