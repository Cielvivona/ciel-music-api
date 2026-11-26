import { Router } from "express";

import {
  listarAlbums,
  registrarAlbum,
  modificarAlbum,
  borrarAlbum
} from "../controllers/album.controller.js";

import { verificarToken } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/", listarAlbums);
router.post("/", verificarToken, registrarAlbum);
router.put("/:id", verificarToken, modificarAlbum);
router.delete("/:id", verificarToken, borrarAlbum);

export default router;
