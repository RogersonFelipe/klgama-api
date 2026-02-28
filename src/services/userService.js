const bcrypt = require("bcryptjs");
const supabase = require("../config/database");
const { v4: uuidv4 } = require("uuid");
const ErrorMessages = require("../utils/errorMessages");

class UserService {
  static async hashSenha(senha) {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(senha, salt);
  }

  static removerSenha(usuario) {
    if (usuario && usuario.senha) {
      const { senha: _, ...usuarioSemSenha } = usuario;
      return usuarioSemSenha;
    }
    return usuario;
  }

  static async criar({ nome, email, senha, cliente_id, is_adm = false }) {
    const { data: cliente, error: erroCliente } = await supabase
      .from("cliente")
      .select("id")
      .eq("id", cliente_id)
      .single();
    if (erroCliente || !cliente) {
      throw new Error(ErrorMessages.CLIENT_NOT_FOUND);
    }

    const { data: usuarioExistente } = await supabase
      .from("usuario")
      .select("id")
      .eq("email", email)
      .single();
    if (usuarioExistente) {
      throw new Error(ErrorMessages.EMAIL_ALREADY_EXISTS);
    }

    const senhaHash = await this.hashSenha(senha);
    const { data: novoUsuario, error } = await supabase
      .from("usuario")
      .insert([
        {
          id: uuidv4(),
          nome,
          email,
          senha: senhaHash,
          cliente_id,
          is_adm,
          ativo: true,
        },
      ])
      .select()
      .single();
    if (error) {
      console.error("Erro do SupaBase ao criar Usuario");
      throw new Error(ErrorMessages.INTERNAL_SERVER_ERROR);
    }

    return this.removerSenha(novoUsuario);
  }

  static async listarTodos() {
    try {
      const { data: usuarios, error } = await supabase
        .from("usuario")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) {
        throw new Error(ErrorMessages.INTERNAL_SERVER_ERROR);
      }

      return (usuarios || []).map((user) => this.removerSenha(user));
    } catch (erro) {
      throw erro;
    }
  }

  static async buscarPorId(id) {
    try {
      const { data: usuario, error } = await supabase
        .from("usuario")
        .select("*")
        .eq("id", id)
        .single();
      if (error || !usuario) {
        throw new Error(ErrorMessages.USER_NOT_FOUND);
      }

      return this.removerSenha(usuario);
    } catch (erro) {
      throw erro;
    }
  }

  static async buscarPorEmail(email) {
    try {
      const { data: usuario, error } = await supabase
        .from("usuario")
        .select("*")
        .eq("email", email)
        .single();
      if (error || !usuario) {
        throw new Error(ErrorMessages.CLIENT_NOT_FOUND);
      }

      return usuario;
    } catch (erro) {
      throw erro;
    }
  }

  static async atualizar(id, { nome, email, ativo, is_adm }) {
    try {
      await this.buscarPorId(id);
      if (email) {
        const { data: usuarioComEmail } = await supabase
          .from("usuario")
          .select("id")
          .eq("email", email)
          .neq("id", id)
          .single();
        if (usuarioComEmail) {
          throw new Error(ErrorMessages.EMAIL_ALREADY_EXISTS);
        }
      }

      const dataAtualizar = {};

      if (nome !== undefined) dataAtualizar.nome = nome;
      if (email !== undefined) dataAtualizar.email = email;
      if (ativo !== undefined) dataAtualizar.ativo = ativo;
      if (is_adm !== undefined) dataAtualizar.is_adm = is_adm;
      dataAtualizar.updated_at = new Date().toISOString();

      const { data: usuarioAtualizado, error } = await supabase
        .from("usuario")
        .update(dataAtualizar)
        .eq("id", id)
        .select()
        .single();
      if (error) {
        throw new Error(ErrorMessages.INTERNAL_SERVER_ERROR);
      }

      return this.removerSenha(usuarioAtualizado);
    } catch (erro) {
      throw erro;
    }
  }

  static async deletar(id) {
    try {
      await this.buscarPorId(id);

      const { data: demandas, error: erroDemandas } = await supabase
        .from("demanda")
        .select("id")
        .eq("usuario_id", id)
        .limit(1);
      if (erroDemandas) {
        throw new Error(ErrorMessages.INTERNAL_SERVER_ERROR);
      }

      if (demandas && demandas.length > 0) {
        throw new Error(
          "Não é possível deletar um usuário com demandas associadas",
        );
      }

      const { error } = await supabase.from("usuario").delete().eq("id", id);
      if (error) {
        throw new Error(ErrorMessages.INTERNAL_SERVER_ERROR);
      }

      return { message: "Usuário deletado com sucesso" };
    } catch (erro) {
      throw erro;
    }
  }
}

module.exports = UserService;
