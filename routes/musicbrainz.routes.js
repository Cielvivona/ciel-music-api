import { Router } from "express";

import {
  consultarArtistas
} from "../controllers/musicbrainz.controller.js";

const router = Router();

router.get("/", consultarArtistas);

export default router;
