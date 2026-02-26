const Joi = require("joi");
const Validators = {
  // Autenticação login
  loginSchema: Joi.object({
    email: Joi.string().email().required().message({
      "string.email": "Email invalido",
      "any.required": "Email é obrigatório",
    }),
    senha: Joi.string().min(6).required().messages({
      "string.min": "Senha deve ter no minimo 6 caracteres",
      "any.required": "Senha é obrigatória",
    }),
  }),
  // Autenticação Registro
  registerSchema: Joi.object({
    nome: Joi.string().min(3).required().message({
      "string.min": "Nome deve ter no minimo 3 Caracters",
      "any.required": "Nome é obrigatório",
    }),
    email: Joi.string().email().required().messages({
      "string.email": "Email invalido",
      "any.required": "Email é obrigatório",
    }),
    senha: Joi.string().min(6).required().message({
      "string.min": "Senha precisa ter no minimo 6 caracteres",
      "any.required": "Senha é obrigatória",
    }),
    cliente_id: Joi.string().uuid().required().message({
      "string.grid": "ID do cliente é invalido",
      "any.required": "ID do cliente é obrigatório",
    }),
  }),
  // Cliente
  createClientSchema: Joi.object({
    nome: Joi.string().min(3).required().messages({
      "string.min": "Nome deve ter no minimo 3 caracteres",
      "any.required": "Nome é obrigatório",
    }),
    ativo: Joi.boolean().optional(),
  }),
  updateClientSchema: Joi.object({
    nome: Joi.string().min(3).optional(),
    ativo: Joi.boolean().optional,
  }),
  // Usuarios
  createUserSchema: Joi.object({
    nome: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    senha: Joi.string().min(6).required(),
    cliente_id: Joi.string().uuid().required(),
    is_Adm: Joi.boolean().optional(),
  }),
  updateUserSchema: Joi.object({
    nome: Joi.string().min(3).optional(),
    email: Joi.string().optional(),
    ativo: Joi.boolean().optional(),
    is_Adm: Joi.boolean().optional(),
  }),
  // Demanda
  createDemandSchema: Joi.object({
    descr: Joi.string().min(5).required().messages({
      "string.min": "Descrição deve ter no mínimo 5 caracteres",
      "any.required": "Descrição é obrigatória",
    }),
    due_date: Joi.date().required().messages({
      "date.base": "Data de vencimento inválida",
      "any.required": "Data de vencimento é obrigatória",
    }),
    usuario_id: Joi.string().uuid().required(),
  }),
  updateDemandsSchema: Joi.object({
    descr: Joi.string().min(5).optional(),
    due_date: Joi.date().optional(),
  }),
};

module.exports = Validators;