import express from "express";
import ComissaoController from "../controllers/comissaoController.js";
import paginar from "../middlewares/paginar.js";

const router = express.Router();

router
  .get("/comissoes", ComissaoController.listarComissoes, paginar)
  .get("/comissoes/busca", ComissaoController.listarComissaoPorFiltro, paginar)
  .get("/comissoes/:id", ComissaoController.listarComissaoPorId)
  .post("/comissoes", ComissaoController.cadastrarComissao)
  .put("/comissoes/:id", ComissaoController.atualizarComissao)
  .delete("/comissoes/:id", ComissaoController.excluirComissao);

export default router;
