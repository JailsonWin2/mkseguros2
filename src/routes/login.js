import express from "express";
import jwt from "jsonwebtoken";
import { user } from "../models/index.js";

const router = express.Router();

router.post("/login", async (req, res) => {
  // Verifique as credenciais do usuário aqui
  const usuario = await user.findOne({
    username: req.body.username,
    password: req.body.password,
  });

  // Se as credenciais estiverem corretas
  if (usuario) {
    // Crie um token JWT
    const token = jwt.sign({ id: usuario.id }, process.env.SECRET_KEY, {
      expiresIn: 3600, // 1 hora
    });

    // Envie o token como resposta
    res.json({ token });
  } else {
    res.status(401).json({ error: "Invalid credentials" });
  }
});

export default router;
