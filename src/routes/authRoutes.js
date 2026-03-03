const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/authController");
const validationMiddleware = require("../middlewares/validationMiddleware");
const authMiddleware = require("../middlewares/authMiddleware");
const Validators = require("../utils/validators");

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Autenticação de usuários
 */

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login do usuário
 *     tags: [Auth]
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, senha]
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: usuario@email.com
 *               senha:
 *                 type: string
 *                 minLength: 6
 *                 example: senha123
 *     responses:
 *       200:
 *         description: Token JWT retornado com sucesso
 *       401:
 *         description: Credenciais inválidas
 */
router.post(
  "/login",
  validationMiddleware(Validators.loginSchema),
  AuthController.login,
);

/**
 * @swagger
 * /api/auth/registrar:
 *   post:
 *     summary: Registrar novo usuário
 *     tags: [Auth]
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [nome, email, senha, cliente_id]
 *             properties:
 *               nome:
 *                 type: string
 *                 minLength: 3
 *                 example: João Silva
 *               email:
 *                 type: string
 *                 format: email
 *                 example: joao@email.com
 *               senha:
 *                 type: string
 *                 minLength: 6
 *                 example: senha123
 *               cliente_id:
 *                 type: string
 *                 format: uuid
 *                 example: 550e8400-e29b-41d4-a716-446655440000
 *     responses:
 *       201:
 *         description: Usuário registrado com sucesso
 *       400:
 *         description: Dados inválidos
 */
router.post(
  "/registrar",
  validationMiddleware(Validators.registerSchema),
  AuthController.registrar,
);

/**
 * @swagger
 * /api/auth/validar:
 *   get:
 *     summary: Valida o token JWT do usuário logado
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Token válido
 *       401:
 *         description: Token inválido ou expirado
 */
router.get("/validar", authMiddleware, AuthController.validarToken);

module.exports = router;
