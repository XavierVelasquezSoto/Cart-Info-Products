const productRoutes = require("../routes/product.routes");
const fs = require("fs");
const path = require("path");
const productFile = path.resolve(__dirname, "../../data/cartProducts.json");

const productsController = {};

productsController.getAllProducts = (req, res) => {
  fs.readFile(productFile, (error, data) => {
    if (error) {
      return res.send("Error al leer el producto");
    }
    const dataJson = JSON.parse(data);
    return res.json(dataJson);
  });
};

productsController.getProductById = (req, res) => {
  const id = req.params.id;
  fs.readFile(productFile, (error, data) => {
    if (error) {
      return res.send("Error al leer el producto");
    }
    const dataJson = JSON.parse(data);
    const productFound = dataJson.find((product) => product.productId === id);
    if (!productFound) {
      return res.send("Producto no encontrado");
    }
    return res.json(productFound);
  });
};

productsController.createProduct = (req, res) => {
  const newProduct = req.body;
  fs.readFile(productFile, (error, data) => {
    if (error) {
      return res.send("Error al leer el archivo");
    }
    const dataJson = [...JSON.parse(data), newProduct];
    fs.writeFile(productFile, JSON.stringify(dataJson), (error) => {
      if (error) {
        return res.send("Error al escribir el archivo");
      }
      return res.json(dataJson);
    });
  });
};

productsController.updateProduct = (req, res) => {
  const id = req.params.id;
  const newProductInfo = req.body;
  fs.readFile(productFile, (error, data) => {
    if (error) {
      return res.send("Error al leer el archivo");
    }
    const dataJson = JSON.parse(data);
    let productToUpdated = dataJson.find((product) => product.productId === id);
    if (!productToUpdated) {
      return res.send("Usuario no encontrado");
    }
    productToUpdated = { ...productToUpdated, ...newProductInfo };
    const productsUpdated = dataJson.map((product) => {
      if (product.productId === id) {
        product = productToUpdated;
      }
      return product;
    });
    fs.writeFile(productFile, JSON.stringify(productsUpdated), (error) => {
      if (error) {
        return res.send("Error al escribir el archivo");
      }
      return res.json(productToUpdated);
    });
  });
};

productsController.deleteProduct = (req, res) => {
  const id = req.params.id;
  fs.readFile(productFile, (error, data) => {
    if (error) {
      return res.send("Error al leer el archivo");
    }
    const dataJson = JSON.parse(data);
    const productUpdated = dataJson.filter(
      (product) => product.productId != id
    );
    fs.writeFile(productFile, JSON.stringify(productUpdated), (error) => {
      if (error) {
        return res.send("Error al escribir el archivo");
      }
      return res.json(productUpdated);
    });
  });
};
module.exports = productsController;
