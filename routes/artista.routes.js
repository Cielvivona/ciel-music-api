import { Router } from "express";

import {
  listarArtistas,
  registrarArtista,
  modificarArtista,
  borrarArtista
} from "../controllers/artista.controller.js";

import { verificarToken } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/", listarArtistas);
router.post("/", verificarToken, registrarArtista);
router.put("/:id", verificarToken, modificarArtista);
router.delete("/:id", verificarToken, borrarArtista);

export default router;
