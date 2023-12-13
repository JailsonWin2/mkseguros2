import express from "express";
import UserController from "../controllers/userController.js";
import checkToken from "../middlewares/checkToken.js";

const router = express.Router();

router
  .get("/users", checkToken, UserController.listarUser)
  .get("/users/:id", checkToken, UserController.listarUserPorId)
  .post("/users", checkToken, UserController.cadastrarUser)
  .put("/users/:id", checkToken, UserController.atualizarUser)
  .delete("/users/:id", checkToken, UserController.excluirUser);

export default router;
