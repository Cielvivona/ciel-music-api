import prisma from "../lib/prisma.js";

export const obtenerAlbums = async () => {
  return await prisma.album.findMany({
    include: {
      artista: true
    }
  });
};

export const crearAlbum = async (data) => {
  return await prisma.album.create({
    data
  });
};

export const actualizarAlbum = async (id, data) => {
  return await prisma.album.update({
    where: { id },
    data
  });
};

export const eliminarAlbum = async (id) => {
  return await prisma.album.delete({
    where: { id }
  });
};
