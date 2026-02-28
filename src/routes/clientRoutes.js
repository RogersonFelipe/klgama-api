const express = require("express");
const router = express.Router();
const ClientController = require("../controllers/clientController");
const validationMiddleware = require("../middlewares/validationMiddleware");
const authMiddleware = require("../middlewares/authMiddleware");
const Validators = require("../utils/validators");

router.use(authMiddleware);

router.post(
  "/",
  validationMiddleware(Validators.createClientSchema),
  ClientController.criar,
);

router.get("/", ClientController.listarTodos);
router.get("/:id", ClientController.buscarPorId);

router.put(
  "/:id",
  validationMiddleware(Validators.updateClientSchema),
  ClientController.atualizar,
);

router.delete("/:id", ClientController.deletar);

module.exports = router;
