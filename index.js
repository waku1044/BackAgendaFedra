const express = require("express");
const server = express();
const cors = require("cors");
const mongoose = require("mongoose");
const routes = require("./controlers/rutas.js"); // Rutas de la API
require('dotenv').config(); // Cargar variables de entorno

const port = process.env.PORT || 5000; // El puerto puede ser proporcionado por la variable de entorno o 5000

// Conexión a la base de datos
const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);  // Usa la URI desde el .env
        console.log("Conectado a la base de datos");
    } catch (err) {
        console.error("Error al conectar a la base de datos", err);
        process.exit(1);  // Finaliza el proceso si la conexión falla
    }
};

connectDb();

server.use(cors());  // Habilitar CORS
server.use(express.json());  // Habilitar el parseo de JSON

server.use("/api", routes);  // Rutas de la API

server.listen(port, () => {
    console.log(`Servidor corriendo en el puerto: ${port}`);
});
