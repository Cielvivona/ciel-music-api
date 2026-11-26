import express from "express";

import authRoutes from "./routes/auth.routes.js";
import artistaRoutes from "./routes/artista.routes.js";
import albumRoutes from "./routes/album.routes.js";
import musicbrainzRoutes from "./routes/musicbrainz.routes.js";

const app = express();
const PORT = 3000;

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/db/artistas", artistaRoutes);
app.use("/api/db/albums", albumRoutes);
app.use("/api/artistas", musicbrainzRoutes);

app.get("/", (req, res) => {
  res.json({
    mensaje: "Bienvenido a Ciel Music API",
    estado: "Funcionando"
  });
});

app.listen(PORT, "127.0.0.1", () => {
  console.log(`Servidor funcionando en http://127.0.0.1:${PORT}`);
});
