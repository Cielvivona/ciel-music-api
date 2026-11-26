import prisma from "../lib/prisma.js";

export const obtenerArtistas = async (page, limit, filtros) => {
  const artistas = await prisma.artista.findMany({
    where: filtros,
    skip: (page - 1) * limit,
    take: limit,
    orderBy: { id: "asc" }
  });

  const total = await prisma.artista.count({
    where: filtros
  });

  return {
    page,
    limit,
    total,
    totalPages: Math.ceil(total / limit),
    artistas
  };
};

export const crearArtista = async (data) => {
  return await prisma.artista.create({
    data
  });
};

export const actualizarArtista = async (id, data) => {
  return await prisma.artista.update({
    where: { id },
    data
  });
};

export const eliminarArtista = async (id) => {
  return await prisma.artista.delete({
    where: { id }
  });
};
