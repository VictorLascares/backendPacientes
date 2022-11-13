import express from "express";
const router = express.Router();
import { perfil, registrar } from "../controllers/veterinarioController.js";

router.get("/", registrar);

router.get("/perfil", perfil);

export default router;