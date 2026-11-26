import { buscarArtistas } from "../services/musicbrainz.service.js";

export const consultarArtistas = async (req, res) => {
  const nombre = req.query.nombre;

  if (typeof nombre !== "string" || !nombre.trim()) {
    return res.status(400).json({
      error: "Debes ingresar un nombre"
    });
  }

  try {
    const resultado = await buscarArtistas(nombre.trim());

    res.json(resultado);

  } catch (error) {
    console.error(error.message);

    res.status(502).json({
      error: "No se pudo consultar MusicBrainz"
    });
  }
};
