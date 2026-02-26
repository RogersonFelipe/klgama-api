const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const supabase = require("../config/database");
const { jwtSecret, jwtExpiration } = require("../config/environment");
const ErrorMessages = require("../utils/errorMessages");

class AuthService {
  static gerarToken(usuario) {
    const payload = {
      id: usuario.id,
      email: usuario.email,
      nome: usuario.nome,
      cliente_id: usuario.cliente_id,
      is_adm: usuario.is_adm,
    };
    return jwt.sign(payload, jwtSecret, {
      expiresIn: jwtExpiration,
    });
  }
  static async hashSenha(senha) {
    const salt = await bcrypt.getSalt(10);
    return bcrypt.hash(senha, salt);
  }
  static async verificarSenha(senhaDigitada, senhaHash) {
    return bcrypt.compare(senhaDigitada, senhaHash);
  }
  static async login(email, senha) {
    try {
      // Busca Usuario
      const { data: usuario, error } = await supabase
        .from("usuario")
        .select("*")
        .eq("email", email)
        .single();
      if (error || !usuario) {
        throw new Error(ErrorMessages.INVALID_CREDENTIALS);
      }

      //Verifica se esta ativo
      if (!usuario.ativo) {
        throw new Error(ErrorMessages.USER_INACTIVE);
      }

      //Verifica senha
      const SenhaValida = await this.verificarSenha(senha, usuario.senha);
      if (!SenhaValida) {
        throw new Error(ErrorMessages.INVALID_CREDENTIALS);
      }

      //Gera Token
      const token = this.gerarToken(usuario);
      const { senha: _, ...usuarioSemSenha } = usuario;
      return {
        usuario: usuarioSemSenha,
        token,
      };
    } catch (erro) {
      throw erro;
    }
  }
  static async registrar({ nome, email, senha, cliente_id }) {
    try {
        //Busca o Cliente Ativo
      const { data: client, error: erroCliente } = await supabase
        .from("cliente")
        .select("*")
        .eq("id", cliente_id)
        .single();

      if (erroCliente || !cliente) {
        throw new Error(ErrorMessages.CLIENT_NOT_FOUND);
      }

      if (!cliente.ativo) {
        throw new Error(ErrorMessages.CLIENT_INACTIVE);
      }

      const { data: usuarioExistente } = await supabase
        .from("usuario")
        .select("*")
        .eq("email", email)
        .single();
      if (usuarioExistente) {
        throw new Error(ErrorMessages.EMAIL_ALREADY_EXISTS);
      }
      const senhaHash = await this.hashSenha(senha);
      const { data: novoUsuario, error: erroInsercao } = await supabase
        .from("usuario")
        .insert([
          {
            nome,
            email,
            senha: senhaHash,
            cliente_id,
            ativo: true,
            is_adm: false,
          },
        ])
        .select()
        .single();

      if (erroInsercao) {
        throw new Error(ErrorMessages.INTERNAL_SERVER_ERROR);
      }
      const token = this.gerarToken(novoUsuario);
      const { senha: _, ...usuarioSemSenha } = novoUsuario;
      return {
        usuario: usuarioSemSenha,
        token,
      };
    } catch (erro) {
      throw erro;
    }
  }
}

module.exports = AuthService;