const mongoose = require("mongoose");

const clientesSchema = new mongoose.Schema({
    idCliente: String,
    nombre: String,
    telefono: Number,
    servicio: String,
    fecha: String,
    hora: String,
    seña: Number,
    descripcion: String
});

const adminSchema = new mongoose.Schema({
    nombre: String,
    password: String,
    admin: Boolean
});

const clientes = mongoose.model("clientes", clientesSchema);
const admin = mongoose.model("admin", adminSchema);

module.exports = { clientes, admin };
