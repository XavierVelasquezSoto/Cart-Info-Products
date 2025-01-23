const express = require("express");
const productRoutes = express.Router();

const productsController = require("../controllers/products.controller");

// Get -> Obtener Datos
// Post -> Enviar Datos
// Patch -> Actualizar Datos
// Delete -> Borrar Datos

// req -> Request ->petición
// res -> Response -> respuesta

productRoutes.get("/", productsController.getAllProducts);

productRoutes.get("/:id", productsController.getProductById);

productRoutes.post("/", productsController.createProduct);

productRoutes.patch("/:id", productsController.updateProduct);

productRoutes.delete("/:id", productsController.deleteProduct);

module.exports = productRoutes;
