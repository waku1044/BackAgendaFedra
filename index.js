const express = require("express");  // Importas express
const server = express();  // Inicializas express
const cors = require("cors");  // Importas cors
const mongoose = require("mongoose");  // Importas mongoose
const routes = require("./controlers/rutas.js");  // Importas las rutas
require('dotenv').config();  // Importas dotenv

// Conexión a la base de datos
mongoose.connect(process.env.HOST)
  .then(() => console.log("Conectado a la base de datos"))
  .catch((err) => console.error("Error al conectar a la base de datos", err));

const puerto =  process.env.PORT || 5000;

const archivodb = mongoose.connection;
// Configuraciones
server.use(cors());  // Habilitas cors
server.use(express.json());  // Habilitas express.json


// Rutas
server.use("/api", routes);  // Haces que el servidor escuche en el puerto 3000

archivodb.once("open", () => {
    console.log("Conectado a la base de datos");
});

archivodb.on("error", (error) => {
    console.log("Error al conectar a la base de datos: " + error);
});


// Haces que el servidor escuche en el puerto 3000
server.listen(puerto, () => {
    console.log("Servidor corriendo en el puerto: "+ puerto);
});
