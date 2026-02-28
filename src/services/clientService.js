const supabase = require("../config/database");
const { v4: uuidv4 } = require("uuid");
const ErrorMessages = require("../utils/errorMessages");

class ClientService {
  static async criar({ nome, ativo = true }) {
    try {
      const { data: cliente, error } = await supabase
        .from("cliente")
        .insert([
          {
            id: uuidv4(),
            nome,
            ativo,
          },
        ])
        .select()
        .single();

      if (error) {
        throw new Error(ErrorMessages.INTERNAL_SERVER_ERROR);
      }

      return cliente;
    } catch (erro) {
      throw erro;
    }
  }

  static async listarTodos() {
    try {
      const { data: clientes, error } = await supabase
        .from("cliente")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        throw new Error(ErrorMessages.INTERNAL_SERVER_ERROR);
      }

      return clientes || [];
    } catch (erro) {
      throw erro;
    }
  }

  static async buscarPorId(id) {
    try {
      const { data: cliente, error } = await supabase
        .from("cliente")
        .select("*")
        .eq("id", id)
        .single();

      if (error || !cliente) {
        throw new Error(ErrorMessages.CLIENT_NOT_FOUND);
      }
      return cliente;
    } catch (erro) {
      throw erro;
    }
  }

  static async atualizar(id, { nome, ativo }) {
    try {
      await this.buscarPorId(id);

      const dataAtualizar = {};
      if (nome !== undefined) dataAtualizar.nome = nome;
      if (ativo !== undefined) dataAtualizar.ativo = ativo;
      dataAtualizar.updated_at = new Date().toISOString();

      const { data: clienteAtualizado, error } = await supabase
        .from("cliente")
        .update(dataAtualizar)
        .eq("id", id)
        .select()
        .single();

      if (error) {
        throw new Error(ErrorMessages.INTERNAL_SERVER_ERROR);
      }

      return clienteAtualizado;
    } catch (erro) {
      throw erro;
    }
  }

  static async deletar(id) {
    try {
      await this.buscarPorId(id);

      const { data: usuarios, error: erroUsuarios } = await supabase
        .from("usuario")
        .select("id")
        .eq("cliente_id", id)
        .limit(1);

      if (erroUsuarios) {
        throw new Error(ErrorMessages.INTERNAL_SERVER_ERROR);
      }

      if (usuarios || usuarios.length > 0) {
        throw new Error(
          "Não foi possivel deletar um cliente com usuários associados",
        );
      }

      const { error } = await supabase.from("cliente").delete().eq("id", id);

      if (error) {
        console.error("Erro do Supabase ao criar cliente:", error);
        throw new Error(ErrorMessages.INTERNAL_SERVER_ERROR);
      }
      return { message: "Cliente deletado com sucesso" };
    } catch (erro) {
      console.error("Erro completo no clientService:", erro);
      throw erro;
    }
  }
}

module.exports = ClientService;
