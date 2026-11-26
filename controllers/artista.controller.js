import { obtenerArtistas, crearArtista, actualizarArtista, eliminarArtista } from "../services/artista.service.js";
import { artistaSchema } from "../validators/artista.schema.js";

export const listarArtistas = async (req, res) => {
  try {
    const page = Number(req.query.page ?? 1);
    const limit = Number(req.query.limit ?? 10);
    const { nombre, pais, genero } = req.query;

    if (
      !Number.isSafeInteger(page) || page < 1 ||
      !Number.isInteger(limit) || limit < 1 || limit > 100 ||
      !Number.isSafeInteger((page - 1) * limit)
    ) {
      return res.status(400).json({
        error: "Parámetros de paginación inválidos"
      });
    }

    const filtros = {};

    if (nombre) {
      filtros.nombre = {
        contains: String(nombre),
        mode: "insensitive"
      };
    }

    if (pais) {
      filtros.pais = {
        equals: String(pais),
        mode: "insensitive"
      };
    }

    if (genero) {
      filtros.genero = {
        contains: String(genero),
        mode: "insensitive"
      };
    }

    const resultado = await obtenerArtistas(page, limit, filtros);

    res.json(resultado);

  } catch (error) {
    console.error("Error al obtener artistas:", error);

    res.status(500).json({
      error: "No se pudieron obtener los artistas"
    });
  }
};

export const registrarArtista = async (req, res) => {
  try {
    const resultado = artistaSchema.safeParse(req.body);

    if (!resultado.success) {
      return res.status(400).json({
        error: "Datos inválidos",
        detalles: resultado.error.issues
      });
    }

    const artista = await crearArtista(resultado.data);

    res.status(201).json(artista);

  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "No se pudo crear el artista"
    });
  }
};

export const modificarArtista = async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (!Number.isSafeInteger(id) || id < 1) {
      return res.status(400).json({
        error: "ID inválido"
      });
    }

    const resultado = artistaSchema.partial().safeParse(req.body);

    if (!resultado.success) {
      return res.status(400).json({
        error: "Datos inválidos",
        detalles: resultado.error.issues
      });
    }

    const artista = await actualizarArtista(id, resultado.data);

    res.json(artista);

  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({
        error: "Artista no encontrado"
      });
    }

    console.error(error);
    res.status(500).json({
      error: "No se pudo actualizar el artista"
    });
  }
};

export const borrarArtista = async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (!Number.isSafeInteger(id) || id < 1) {
      return res.status(400).json({
        error: "ID inválido"
      });
    }

    await eliminarArtista(id);

    res.status(204).send();

  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({
        error: "Artista no encontrado"
      });
    }

    if (error.code === "P2003") {
      return res.status(409).json({
        error: "El artista tiene álbumes asociados"
      });
    }

    console.error(error);
    res.status(500).json({
      error: "No se pudo eliminar el artista"
    });
  }
};
