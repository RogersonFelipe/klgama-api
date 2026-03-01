const supabase = require("../config/database");
const { v4: uuidv4 } = require("uuid");
const ErrorMessages = require("../utils/errorMessages");

class DemandService {
  static async criar({ descr, due_date, usuario_id, cliente_id }) {
    try {
      const { data: usuario, error: erroUsuario } = await supabase
        .from("usuario")
        .select("cliente_id")
        .eq("id", usuario_id)
        .single();

      if (erroUsuario || !usuario) {
        throw new Error(ErrorMessages.USER_NOT_FOUND);
      }

      if (usuario.cliente_id !== cliente_id) {
        throw new Error(ErrorMessages.CROSS_TENANT_ACCESS);
      }

      const { data: novaDemanda, error } = await supabase
        .from("demanda")
        .insert([
          {
            id: uuidv4(),
            descr,
            due_date,
            usuario_id,
            cliente_id,
          },
        ])
        .select()
        .single();

      if (error) {
        throw new Error(ErrorMessages.INTERNAL_SERVER_ERROR);
      }

      return novaDemanda;
    } catch (erro) {
      throw erro;
    }
  }

  static async buscarPorId(id) {
    try {
      const { data: demanda, error } = await supabase
        .from("demanda")
        .select("*")
        .eq("id", id)
        .single();

      if (error || !demanda) {
        throw new Error(ErrorMessages.DEMAND_NOT_FOUND);
      }

      return demanda;
    } catch (erro) {
      throw erro;
    }
  }

  static async listarPorUsuario(usuario_id) {
    try {
      const { data: demandas, error } = await supabase
        .from("demanda")
        .select("*")
        .eq("usuario_id", usuario_id)
        .order("due_date", { ascending: true });

      if (error) {
        throw new Error(ErrorMessages.INTERNAL_SERVER_ERROR);
      }

      return demandas || [];
    } catch (erro) {
      throw erro;
    }
  }

  static async atualizar(id, { descr, due_date }) {
    try {
      await this.buscarPorId(id);

      const dataAtualizar = {};
      if (descr !== undefined) dataAtualizar.descr = descr;
      if (due_date !== undefined) dataAtualizar.due_date = due_date;
      dataAtualizar.updated_at = new Date().toISOString();

      const { data: demandaAtualizada, error } = await supabase
        .from("demanda")
        .update(dataAtualizar)
        .eq("id", id)
        .select()
        .single();

      if (error) {
        throw new Error(ErrorMessages.INTERNAL_SERVER_ERROR);
      }

      return demandaAtualizada;
    } catch (erro) {
      throw erro;
    }
  }

  static async deletar(id) {
    try {
      await this.buscarPorId(id);

      const { error } = await supabase.from("demanda").delete().eq("id", id);

      if (error) {
        throw new Error(ErrorMessages.INTERNAL_SERVER_ERROR);
      }

      return { message: "Demanda deletada com sucesso" };
    } catch (erro) {
      throw erro;
    }
  }
}

module.exports = DemandService;
