const express = require("express");
const productRoutes = express.Router();
const fs = require("fs");
const path = require("path");

const productFile = path.resolve(__dirname, "../../data/cartProducts.json");

// Get -> Obtener Datos
// Post -> Enviar Datos
// Patch -> Actualizar Datos
// Delete -> Borrar Datos

// req -> Request ->petición
// res -> Response -> respuesta

productRoutes.get("/", (req, res) => {
  fs.readFile(productFile, (error, data) => {
    if (error) {
      return res.send("Error al leer el producto");
    }
    const dataJson = JSON.parse(data);
    console.log(dataJson);
    return res.json(dataJson);
  });
});

productRoutes.get("/:id", (req, res) => {
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
});

productRoutes.post("/", (req, res) => {
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
});

productRoutes.patch("/:id", (req, res) => {
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
});

productRoutes.delete("/:id", (req, res) => {
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
});

module.exports = productRoutes;
