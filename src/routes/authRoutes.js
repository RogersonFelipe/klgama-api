const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/authController");
const validationMiddleware = require("../middlewares/validationMiddleware");
const authMiddleware = require("../middlewares/authMiddleware");
const Validators = require("../utils/validators");

router.post(
  "/login",
  validationMiddleware(Validators.loginSchema),
  AuthController.login,
);

router.post(
  "/registrar",
  validationMiddleware(Validators.registerSchema),
  AuthController.registrar,
);

router.get("/validar", authMiddleware, AuthController.validarToken);

module.exports = router;
