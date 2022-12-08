import express from "express";
const router = express.Router();
import {
  perfil,
  registrar,
  confirmar,
  autenticar,
  forgotPassword,
  comprobarToken,
  nuevoPassword,
  updateProfile,
} from "../controllers/veterinarioController.js";
import checkAuth from "../middleware/authMiddleware.js";

// Area publica
router.post("/", registrar);
router.get("/confirmar/:token", confirmar);
router.post("/login", autenticar);
router.post("/forgot-password", forgotPassword);
router.route("/forgot-password/:token").get(comprobarToken).post(nuevoPassword);

// Area privada
router.get("/perfil", checkAuth, perfil);
router.put("/perfil/:id", checkAuth, updateProfile);

export default router;
