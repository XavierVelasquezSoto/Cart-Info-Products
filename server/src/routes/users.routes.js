const express = require("express");
const userRoutes = express.Router();
const fs = require("fs");
const path = require("path");

const usersFile = path.resolve(__dirname, "..//../data/users.json");

// Get -> Obtener Datos
// Post -> Enviar Datos
// Patch -> Actualizar Datos
// Delete -> Borrar Datos

// req -> Request ->petición
// res -> Response -> respuesta

userRoutes.get("/", (req, res) => {
  fs.readFile(usersFile, (error, data) => {
    if (error) {
      return res.send("Error al leer el archivo");
    }
    const dataJson = JSON.parse(data);
    return res.json(dataJson);
  });
});

userRoutes.get("/:id", (req, res) => {
  const id = req.params.id;
  fs.readFile(usersFile, (error, data) => {
    if (error) {
      return res.send("Error al leer el archivo");
    }
    const dataJson = JSON.parse(data);
    const userFound = dataJson.find((user) => user.userId === id);
    if (!userFound) {
      return res.send("Usuario no encontrado");
    }

    return res.json(userFound);
  });
});

userRoutes.post("/", (req, res) => {
  const newUser = req.body;

  fs.readFile(usersFile, (error, data) => {
    if (error) {
      return res.send("Error al leer el archivo");
    }
    const dataJson = [...JSON.parse(data), newUser];

    fs.writeFile(usersFile, JSON.stringify(dataJson), (error) => {
      if (error) {
        return res.send("Error al escribir el archivo");
      }

      return res.json(dataJson);
    });
  });
});

userRoutes.patch("/:id", (req, res) => {
  const id = req.params.id;
  const newUserInfo = req.body;

  fs.readFile(usersFile, (error, data) => {
    if (error) {
      return res.send("Error al leer el archivo");
    }

    const dataJson = JSON.parse(data);

    let userToUpdated = dataJson.find((user) => user.userId === id);
    if (!userToUpdated) {
      return res.send("Usuario no encontrado");
    }

    userToUpdated = { ...userToUpdated, ...newUserInfo };

    const usersUpdated = dataJson.map((user) => {
      if (user.userId === id) {
        user = userToUpdated;
      }

      return user;
    });

    fs.writeFile(usersFile, JSON.stringify(usersUpdated), (error) => {
      if (error) {
        return res.send("Error al escribir el archivo");
      }

      return res.json(userToUpdated);
    });
  });
});

userRoutes.delete("/:id", (req, res) => {
  const id = req.params.id;

  fs.readFile(usersFile, (error, data) => {
    if (error) {
      return res.send("Error al leer el archivo");
    }

    const dataJson = JSON.parse(data);
    const usersUpdated = dataJson.filter((user) => user.userId != id);

    fs.writeFile(usersFile, JSON.stringify(usersUpdated), (error) => {
      if (error) {
        return res.send("Error al escribir el archivo");
      }

      return res.json(usersUpdated);
    });
  });
});

module.exports = userRoutes;
