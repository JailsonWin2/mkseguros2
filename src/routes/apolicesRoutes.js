import express from "express";
import ApoliceController from "../controllers/apolicesController.js";
import paginar from "../middlewares/paginar.js";

const router = express.Router();

router
  .get("/apolices/emissao", ApoliceController.listarApolicePorEmissao, paginar)
  .get("/apolices", ApoliceController.listarApolices, paginar)
  .get("/apolices/:id", ApoliceController.listarApolicePorId)
  .post("/apolices", ApoliceController.cadastrarApolice)
  .put("/apolices/:id", ApoliceController.atualizarApolice)
  .delete("/apolices/:id", ApoliceController.excluirApolice);

export default router;
