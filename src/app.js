const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");
require("express-async-errors");
const authMiddleware = require("./middlewares/authMiddleware");
const tenantMiddleware = require("./middlewares/tenantMiddleware");
const errorHandler = require("./middlewares/errorHandler");
const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Rotas teste
app.get("/status", (req, res) => {
  res.json({
    status: "OK",
    message: "Servidor esta funcionando",
    timestamp: new Date().toISOString(),
  });
});
app.use("/api/auth", require("./routes/authRoutes"));

app.use(authMiddleware);
app.use(tenantMiddleware);

// Rotas Protegidas
app.use("/api/clientes", require("./routes/clientRoutes"));
app.use("/api/usuarios", require("./routes/userRoutes"));
app.use("/api/demandas", require("./routes/demandRoutes"));

// Tratamento de Erros
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Rota não encontrada",
  });
});

app.use(errorHandler);
module.exports = app;
