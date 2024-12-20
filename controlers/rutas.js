const express = require("express");
const routes = express.Router();
const admin = require("../models/models.js");






routes.post("/login", async (req, res) => {
const { username, password } = req.body;

  try {
    const user = await admin.admin.find({ nombre: username, password: password });

    if (user.length === 0) {
      return res.status(401).json({ message: "Credenciales incorrectas" });
    }

    console.log('Este es el user', user);

    // Si el usuario es encontrado, realiza alguna acción
    res.status(200).json({
      message: "Inicio de sesión exitoso",
      user: user[0], // O cualquier propiedad que necesites enviar
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al iniciar sesión" });
  }
});

routes.post("/agregarcontacto", async (req, res) => {
  
  try {
    const contacto = await admin.clientes.create(req.body);
    res.json(contacto);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al agregar el contacto" });
  }
})


// route.put("/actualizarproducto/:id", (req, res) => {
//   const { id } = req.params;
//   const { img, nombre, precio, descripcion, categoria } = req.body;
//   modeloProducto
//     .findByIdAndUpdate(id, { img, nombre, precio, descripcion, categoria })
//     .then(() => {
//       res.send("Producto actualizado correctamente");
//     })
//     .catch((error) => {
//       res.status(500).send("Error al actualizar el producto");
//     });
// });


routes.put("/editarcontacto/:id", async (req, res) => {
  const id = req.params.id;
  const { nombre, telefono, descripcion, fecha } = req.body;

  try {
    const contacto = await admin.clientes.findOneAndUpdate({_id: id}, {
      nombre,
      telefono,
      descripcion,
      fecha
    });

    if (!contacto) {
      return res.status(404).json({ error: "Contacto no encontrado" });
    }

    res.json(contacto);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al editar el contacto" });
  }
});

routes.get("/clientes", async (req, res) => {
    try {
      const clientess = await admin.clientes.find();
      res.json(clientess);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error al obtener los clientes" });
    }
  });

  routes.delete("/eliminarcontacto/:id", async (req, res) => {  
    const id = req.params.id;

    try {
      const contacto = await admin.clientes.findOneAndDelete({ _id: id });

      if (!contacto) {
        return res.status(404).json({ error: "Contacto no encontrado" });
      }

      res.json(contacto);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error al eliminar el contacto" });
    }
  });
    


  module.exports = routes;