const fs = require("fs").promises;

class ProductManager {
  static ultId = 0;
  constructor(path) {
    this.products = [];
    this.path = path;
  }

  async addProduct(title, description, price, img, code, stock) {
    if (!title || !description || !price || !img || !code || !stock) {
      console.log("Todos los campos son obligatorios");
      return;
    }

    if (this.products.some((item) => item.code === code)) {
      console.log("El codigo debe ser unico.. o todos moriremos");
      return;
    }

    const nuevoProducto = {
      id: ++ProductManager.ultId,
      title,
      description,
      price,
      img,
      code,
      stock,
    };

    this.products.push(nuevoProducto);
    await this.guardarArchivo(this.products);
  }

  async getProducts() {
    try {
      const arrayProductos = await this.leerArchivo();
      return arrayProductos;
    } catch (error) {
      console.log("Error al leer el archivo");
    }
  }

  async getProductById(id) {
    try {
      const arrayProductos = await this.leerArchivo();
      const buscado = arrayProductos.find(item.id === id);
      if (!buscado) {
        console.log("Producto no encontrado");
        return null;
      } else {
        console.log("Producto encontrado");
        return buscado;
      }
    } catch (error) {
      console.log("Buscar  por ID");
    }
  }

  async guardarArchivo(productos) {
    try {
      await fs.writeFile(this.path, JSON.stringify(productos), "utf-8");
      console.log("Archivo guardado exitosamente");
    } catch (error) {
      console.error("Error al guardar el archivo:", error.message);
    }
  }
}

module.exports = ProductManager;
