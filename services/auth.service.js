import prisma from "../lib/prisma.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const crearUsuario = async (data) => {
  const { nombre, email, password } = data;

  const passwordHash = await bcrypt.hash(password, 12);

  return await prisma.usuario.create({
    data: {
      nombre,
      email: email.toLowerCase(),
      password: passwordHash
    },
    select: {
      id: true,
      nombre: true,
      email: true,
      createdAt: true
    }
  });
};

export const buscarUsuario = async (email) => {
  return await prisma.usuario.findUnique({
    where: {
      email: email.trim().toLowerCase()
    }
  });
};

export const verificarPassword = async (password, hash) => {
  return await bcrypt.compare(password, hash);
};

export const generarToken = (usuario) => {
  return jwt.sign(
    {
      id: usuario.id,
      email: usuario.email
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN || "7d"
    }
  );
};
