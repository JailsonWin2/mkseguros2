import express from "express";
import UserController from "../controllers/userController.js";

const router = express.Router();

router
  .get("/users", UserController.listarUser)
  .get("/users/:id", UserController.listarUserPorId)
  .post("/users", UserController.cadastrarUser)
  .put("/users/:id", UserController.atualizarUser)
  .delete("/users/:id", UserController.excluirUser);

export default router;
