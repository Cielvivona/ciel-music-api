export const buscarArtistas = async (nombre) => {
  const url = new URL(
    "https://musicbrainz.org/ws/2/artist/"
  );

  url.searchParams.set("query", `artist:"${nombre}"`);
  url.searchParams.set("fmt", "json");
  url.searchParams.set("limit", "10");

  const respuesta = await fetch(url, {
    headers: {
      "User-Agent": "CielMusicAPI/1.0"
    }
  });

  if (!respuesta.ok) {
    throw new Error(`MusicBrainz: ${respuesta.status}`);
  }

  const datos = await respuesta.json();

  return {
    busqueda: nombre,
    total: datos.count,
    artistas: datos.artists.map(artista => ({
      id: artista.id,
      nombre: artista.name,
      pais: artista.country || "Desconocido",
      tipo: artista.type || "Desconocido"
    }))
  };
};
