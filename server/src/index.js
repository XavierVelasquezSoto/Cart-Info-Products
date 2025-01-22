const express = require("express");
const productRoutes = require("./routes/productRoutes");
const app = express();
const cors = require("cors");
const port = 4000;

const corsOptions = {
  origin: "*", // Orígenes permitidos
  methods: ["GET", "POST", "PATCH", "DELETE"], // Métodos permitidos
  allowedHeaders: ["Content-Type", "Authorization"], // Headers permitidos
  credentials: true, // Habilitar cookies/credenciales
};

app.use(cors(corsOptions));
app.use(express.json());
app.use("/", productRoutes);

app.listen(port, () => {
  console.log("Server is running on port" + port);
});
