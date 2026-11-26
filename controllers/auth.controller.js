import {
  crearUsuario,
  buscarUsuario,
  verificarPassword,
  generarToken
} from "../services/auth.service.js";

import { usuarioSchema } from "../validators/usuario.schema.js";

export const registrarUsuario = async (req, res) => {
  try {
    const resultado = usuarioSchema.safeParse(req.body);

    if (!resultado.success) {
      return res.status(400).json({
        error: "Datos inválidos",
        detalles: resultado.error.issues
      });
    }

    const usuario = await crearUsuario(resultado.data);

    res.status(201).json({
      mensaje: "Usuario registrado correctamente",
      usuario
    });

  } catch (error) {
    if (error.code === "P2002") {
      return res.status(409).json({
        error: "El correo electrónico ya está registrado"
      });
    }

    console.error(error);

    res.status(500).json({
      error: "No se pudo registrar el usuario"
    });
  }
};

export const iniciarSesion = async (req, res) => {
  try {
    const { email, password } = req.body ?? {};

    if (
      typeof email !== "string" ||
      typeof password !== "string" ||
      !email.trim() ||
      !password
    ) {
      return res.status(400).json({
        error: "El email y la contraseña son obligatorios"
      });
    }

    const usuario = await buscarUsuario(email);

    if (!usuario) {
      return res.status(401).json({
        error: "Credenciales incorrectas"
      });
    }

    const passwordValida = await verificarPassword(
      password,
      usuario.password
    );

    if (!passwordValida) {
      return res.status(401).json({
        error: "Credenciales incorrectas"
      });
    }

    const token = generarToken(usuario);

    res.json({
      mensaje: "Inicio de sesión exitoso",
      token,
      usuario: {
        id: usuario.id,
        nombre: usuario.nombre,
        email: usuario.email
      }
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "No se pudo iniciar sesión"
    });
  }
};
