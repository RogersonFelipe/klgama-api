const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
require("express-async-errors");
const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rotas teste
app.get("/status", (req, res) => {
  res.json({
    status: "OK",
    message: "Servidor esta funcionando",
    timestamp: new Date().toISOString(),
  });
});

// Tratamento de Erros
app.use((err, req, res, next) => {
  console.error("Erro:", err);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Erro Interno do servidor",
    error: process.env.NODE_ENV === "development" ? err : {},
  });

  app.use((req, res) => {
    res.status(404).json({
      success: false,
      message: "Rota não encontrada",
    });
  });
});

module.exports = app;
