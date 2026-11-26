import {
  obtenerAlbums,
  crearAlbum,
  actualizarAlbum,
  eliminarAlbum
} from "../services/album.service.js";

import { albumSchema } from "../validators/album.schema.js";

export const listarAlbums = async (req, res) => {
  try {
    const albums = await obtenerAlbums();
    res.json(albums);

  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "No se pudieron obtener los álbumes"
    });
  }
};

export const registrarAlbum = async (req, res) => {
  try {
    const resultado = albumSchema.safeParse(req.body);

    if (!resultado.success) {
      return res.status(400).json({
        error: "Datos inválidos",
        detalles: resultado.error.issues
      });
    }

    const album = await crearAlbum(resultado.data);
    res.status(201).json(album);

  } catch (error) {
    if (error.code === "P2003") {
      return res.status(400).json({
        error: "El artista indicado no existe"
      });
    }

    console.error(error);
    res.status(500).json({
      error: "No se pudo crear el álbum"
    });
  }
};

export const modificarAlbum = async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (!Number.isSafeInteger(id) || id < 1) {
      return res.status(400).json({
        error: "ID inválido"
      });
    }

    const resultado = albumSchema.partial().safeParse(req.body);

    if (!resultado.success) {
      return res.status(400).json({
        error: "Datos inválidos",
        detalles: resultado.error.issues
      });
    }

    const album = await actualizarAlbum(id, resultado.data);
    res.json(album);

  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({
        error: "Álbum no encontrado"
      });
    }

    if (error.code === "P2003") {
      return res.status(400).json({
        error: "El artista indicado no existe"
      });
    }

    console.error(error);
    res.status(500).json({
      error: "No se pudo actualizar el álbum"
    });
  }
};

export const borrarAlbum = async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (!Number.isSafeInteger(id) || id < 1) {
      return res.status(400).json({
        error: "ID inválido"
      });
    }

    await eliminarAlbum(id);
    res.status(204).send();

  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({
        error: "Álbum no encontrado"
      });
    }

    console.error(error);
    res.status(500).json({
      error: "No se pudo eliminar el álbum"
    });
  }
};
