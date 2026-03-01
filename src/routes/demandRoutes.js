const express = require("express");
const router = express.Router();
const DemandController = require("../controllers/demandController");
const validationMiddleware = require("../middlewares/validationMiddleware");
const authMiddleware = require("../middlewares/authMiddleware");
const Validators = require("../utils/validators");

router.use(authMiddleware);

// POST
router.post(
  "/",
  validationMiddleware(Validators.createDemandSchema),
  DemandController.criar,
);

// GET
router.get("/", DemandController.listarTodos);
router.get("/usuario/:usuario_id", DemandController.listarPorUsuario);
router.get("/:id", DemandController.buscarPorId);

// PUT
router.put(
  "/:id",
  validationMiddleware(Validators.updateDemandSchema),
  DemandController.atualizar,
);

// DELETE
router.delete("/:id", DemandController.deletar);

module.exports = router;
