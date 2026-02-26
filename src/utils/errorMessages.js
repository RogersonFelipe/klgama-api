const ErrorMessages = {
  // Autenticação
  INVALID_CREDENTIALS: "Email ou senha inválidos",
  EMAIL_ALREADY_EXISTS: "Email já cadastrado",
  INVALID_TOKEN: "Token inválido ou expirado",
  MISSING_TOKEN: "Token não fornecido",
  UNAUTHORIZED: "Não autorizado para acessar este recurso",

  // Validação
  INVALID_EMAIL: "Email inválido",
  INVALID_PASSWORD: "Senha deve ter no mínimo 6 caracteres",
  REQUIRED_FIELD: "Campo obrigatório",
  INVALID_DATA: "Dados inválidos",

  // Recursos
  CLIENT_NOT_FOUND: "Cliente não encontrado",
  USER_NOT_FOUND: "Usuário não encontrado",
  DEMAND_NOT_FOUND: "Demanda não encontrada",

  // Negócio
  CROSS_TENANT_ACCESS: "Acesso cruzado entre clientes não é permitido",
  USER_INACTIVE: "Usuário inativo",
  CLIENT_INACTIVE: "Cliente inativo",

  // Geral
  INTERNAL_SERVER_ERROR: "Erro interno do servidor",
  INVALID_REQUEST: "Requisição inválida",
};

module.exports = ErrorMessages;
