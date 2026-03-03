const express = require("express");
const router = express.Router();
const DemandController = require("../controllers/demandController");
const validationMiddleware = require("../middlewares/validationMiddleware");
const authMiddleware = require("../middlewares/authMiddleware");
const Validators = require("../utils/validators");

router.use(authMiddleware);

/**
 * @swagger
 * tags:
 *   name: Demandas
 *   description: Gerenciamento de demandas
 */

/**
 * @swagger
 * /api/demandas:
 *   post:
 *     summary: Criar nova demanda
 *     tags: [Demandas]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [descr, due_date]
 *             properties:
 *               descr:
 *                 type: string
 *                 minLength: 5
 *                 example: Desenvolver tela de login
 *               due_date:
 *                 type: string
 *                 format: date
 *                 example: 2025-12-31
 *     responses:
 *       201:
 *         description: Demanda criada com sucesso
 *       400:
 *         description: Dados inválidos
 *       401:
 *         description: Não autorizado
 */
// POST
router.post(
  "/",
  validationMiddleware(Validators.createDemandSchema),
  DemandController.criar,
);

/**
 * @swagger
 * /api/demandas:
 *   get:
 *     summary: Listar todas as demandas
 *     tags: [Demandas]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de demandas retornada com sucesso
 *       401:
 *         description: Não autorizado
 */
// GET
router.get("/", DemandController.listarTodos);

/**
 * @swagger
 * /api/demandas/usuario/{usuario_id}:
 *   get:
 *     summary: Listar demandas por usuário
 *     tags: [Demandas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: usuario_id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID do usuário
 *     responses:
 *       200:
 *         description: Lista de demandas do usuário retornada com sucesso
 *       404:
 *         description: Usuário não encontrado
 *       401:
 *         description: Não autorizado
 */
router.get("/usuario/:usuario_id", DemandController.listarPorUsuario);

/**
 * @swagger
 * /api/demandas/{id}:
 *   get:
 *     summary: Buscar demanda por ID
 *     tags: [Demandas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID da demanda
 *     responses:
 *       200:
 *         description: Demanda encontrada
 *       404:
 *         description: Demanda não encontrada
 *       401:
 *         description: Não autorizado
 */
router.get("/:id", DemandController.buscarPorId);

/**
 * @swagger
 * /api/demandas/{id}:
 *   put:
 *     summary: Atualizar demanda
 *     tags: [Demandas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID da demanda
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               descr:
 *                 type: string
 *                 minLength: 5
 *                 example: Atualizar tela de login
 *               due_date:
 *                 type: string
 *                 format: date
 *                 example: 2026-01-15
 *     responses:
 *       200:
 *         description: Demanda atualizada com sucesso
 *       404:
 *         description: Demanda não encontrada
 *       401:
 *         description: Não autorizado
 */
// PUT
router.put(
  "/:id",
  validationMiddleware(Validators.updateDemandSchema),
  DemandController.atualizar,
);

/**
 * @swagger
 * /api/demandas/{id}:
 *   delete:
 *     summary: Deletar demanda
 *     tags: [Demandas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID da demanda
 *     responses:
 *       200:
 *         description: Demanda deletada com sucesso
 *       404:
 *         description: Demanda não encontrada
 *       401:
 *         description: Não autorizado
 */
// DELETE
router.delete("/:id", DemandController.deletar);

module.exports = router;
