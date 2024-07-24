const express = require("express");
const productRouter = require("./routes/products.router.js");
const app = express();
const PUERTO = 8080;
app.use(express.json());
app.use("/api/products", productRouter);

app.listen(PUERTO, () => {
  console.log(`Servidor corriendo en http://localhost:${PUERTO}`);
});
