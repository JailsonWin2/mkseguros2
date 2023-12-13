import express from "express";
import ApoliceController from "../controllers/apolicesController.js";
import paginar from "../middlewares/paginar.js";
import checkToken from "../middlewares/checkToken.js";

const router = express.Router();

router
  .get("/apolices", checkToken, ApoliceController.listarApolices, paginar)
  .get(
    "/apolices/emissao",
    checkToken,
    ApoliceController.listarApolicePorEmissao,
    paginar
  )
  .get("/apolices/:id", checkToken, ApoliceController.listarApolicePorId)
  .post("/apolices", checkToken, ApoliceController.cadastrarApolice)
  .put("/apolices/:id", checkToken, ApoliceController.atualizarApolice)
  .delete("/apolices/:id", checkToken, ApoliceController.excluirApolice);

export default router;
