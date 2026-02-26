require("dotenv").config();
require("express-async-errors");

const app = require("./src/app");
const { port } = require("./src/config/environment");

const PORT = port;

app.listen(PORT, () => {
  console.log(
    `porta: ${PORT} e ambiente ${process.env.NODE_ENV || "development"}`,
  );
});
