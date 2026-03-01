const DemandService = require("../services/demandService");
const ResponseHandler = require("../utils/responseHandler");
const ErrorMessages = require("../utils/errorMessages");

class DemandController {
  static async criar(req, res) {
    try {
      const { descr, due_date, usuario_id } = req.body;
      const cliente_id = req.clienteId; // Vem do tenantMiddleware

      const demanda = await DemandService.criar({
        descr,
        due_date,
        usuario_id,
        cliente_id,
      });

      return ResponseHandler.created(
        res,
        demanda,
        "Demanda criada com sucesso",
      );
    } catch (erro) {
      if (erro.message === ErrorMessages.USER_NOT_FOUND) {
        return ResponseHandler.notFound(res, erro.message);
      }

      if (erro.message === ErrorMessages.CROSS_TENANT_ACCESS) {
        return ResponseHandler.forbidden(res, erro.message);
      }

      return ResponseHandler.serverError(res, erro.message);
    }
  }

  static async listarTodos(req, res) {
    try {
      const demandas = await DemandService.listarTodos();

      return ResponseHandler.success(
        res,
        demandas,
        "Demandas listadas com sucesso",
      );
    } catch (erro) {
      return ResponseHandler.serverError(res, erro.message);
    }
  }

  static async buscarPorId(req, res) {
    try {
      const { id } = req.params;

      const demanda = await DemandService.buscarPorId(id);
      if (demanda.cliente_id !== req.clienteId) {
        return ResponseHandler.forbidden(
          res,
          ErrorMessages.CROSS_TENANT_ACCESS,
        );
      }

      return ResponseHandler.success(res, demanda, "Demanda encontrada");
    } catch (erro) {
      if (erro.message === ErrorMessages.DEMAND_NOT_FOUND) {
        return ResponseHandler.notFound(res, erro.message);
      }

      return ResponseHandler.serverError(res, erro.message);
    }
  }

  static async listarPorUsuario(req, res) {
    try {
      const { usuario_id } = req.params;

      const demandas = await DemandService.listarPorUsuario(usuario_id);

      return ResponseHandler.success(
        res,
        demandas,
        "Demandas do usuário listadas com sucesso",
      );
    } catch (erro) {
      return ResponseHandler.serverError(res, erro.message);
    }
  }

  static async atualizar(req, res) {
    try {
      const { id } = req.params;
      const { descr, due_date } = req.body;
      const demanda = await DemandService.buscarPorId(id);

      if (demanda.cliente_id !== req.clienteId) {
        return ResponseHandler.forbidden(
          res,
          ErrorMessages.CROSS_TENANT_ACCESS,
        );
      }

      const demandaAtualizada = await DemandService.atualizar(id, {
        descr,
        due_date,
      });

      return ResponseHandler.success(
        res,
        demandaAtualizada,
        "Demanda atualizada com sucesso",
      );
    } catch (erro) {
      if (erro.message === ErrorMessages.DEMAND_NOT_FOUND) {
        return ResponseHandler.notFound(res, erro.message);
      }

      return ResponseHandler.serverError(res, erro.message);
    }
  }

  static async deletar(req, res) {
    try {
      const { id } = req.params;
      const demanda = await DemandService.buscarPorId(id);

      if (demanda.cliente_id !== req.clienteId) {
        return ResponseHandler.forbidden(
          res,
          ErrorMessages.CROSS_TENANT_ACCESS,
        );
      }

      await DemandService.deletar(id);

      return ResponseHandler.success(res, null, "Demanda deletada com sucesso");
    } catch (erro) {
      if (erro.message === ErrorMessages.DEMAND_NOT_FOUND) {
        return ResponseHandler.notFound(res, erro.message);
      }

      return ResponseHandler.serverError(res, erro.message);
    }
  }
}

module.exports = DemandController;
