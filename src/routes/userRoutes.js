const express = require("express");
const router = express.Router();
const UserController = require("../controllers/userController");
const validationMiddleware = require("../middlewares/validationMiddleware");
const authMiddleware = require("../middlewares/authMiddleware");
const Validators = require("../utils/validators");

router.use(authMiddleware);

//POST
router.post(
  "/",
  validationMiddleware(Validators.createUserSchema),
  UserController.criar,
);

// GET
router.get("/", UserController.listarTodos);
router.get("/:id", UserController.buscarPorId);

// PUT
router.put(
  "/:id",
  validationMiddleware(Validators.updateUserSchema),
  UserController.atualizar,
);

// DELETE
router.delete("/:id", UserController.deletar);

module.exports = router;
