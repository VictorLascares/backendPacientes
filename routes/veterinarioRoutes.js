import express from "express";
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Desde api/veterinarios");
});

router.get("/login", (req, res) => {
  res.send("Desde api/veterinarios/login");
});

export default router;