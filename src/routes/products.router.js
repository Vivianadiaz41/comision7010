const express = require("express");
const ProductManager = require("../managers/product-manager.js");
const router = express.Router();
module.exports = router;

router.get("/", async (req, res) => {
  const manager = new ProductManager("./src/data/productos.json"); // Crear nueva instancia aquí
  const limit = req.query.limit;
  try {
    const arrayProductos = await manager.getProducts();
    if (limit) {
      res.send(arrayProductos.slice(0, limit));
    } else {
      res.send(arrayProductos);
    }
  } catch (error) {
    res.status(500).send("error interno del servidor");
  }
});

router.get("/:pid", async (req, res) => {
  const manager = new ProductManager("./src/data/productos.json"); // Crear nueva instancia aquí
  let id = req.params.pid;
  try {
    const producto = await manager.getProductsById(parseInt(id));
    if (!producto) {
      res.status(404).send("Producto no encontrado");
    } else {
      res.status(200).send(producto);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al buscar ese ID en productos");
  }
});
module.exports = router;
