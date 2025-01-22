const express = require("express");
const userRoutes = require("./routes/users.routes");
const app = express();
const cors = require("cors");
const port = 3000;

const corsOptions = {
  origin: "*", // Orígenes permitidos
  methods: ["GET", "POST", "PATCH", "DELETE"], // Métodos permitidos
  allowedHeaders: ["Content-Type", "Authorization"], // Headers permitidos
  credentials: true, // Habilitar cookies/credenciales
};

app.use(cors(corsOptions));
app.use(express.json());
app.use("/", userRoutes);

app.listen(port, () => {
  console.log("Server is running on port" + port);
});
