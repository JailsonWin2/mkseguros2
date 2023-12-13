import express from "express";
import ComissaoController from "../controllers/comissaoController.js";
import paginar from "../middlewares/paginar.js";
import checkToken from "../middlewares/checkToken.js";

const router = express.Router();

router
  .get("/comissoes", checkToken, ComissaoController.listarComissoes, paginar)
  .get(
    "/comissoes/apolice",
    checkToken,
    ComissaoController.listarComissaoPorApolice
  )
  .get(
    "/comissoes/busca",
    checkToken,
    ComissaoController.listarComissaoPorFiltro,
    paginar
  )
  .get("/comissoes/:id", checkToken, ComissaoController.listarComissaoPorId)
  .post("/comissoes", checkToken, ComissaoController.cadastrarComissao)
  .put("/comissoes/:id", checkToken, ComissaoController.atualizarComissao)
  .delete("/comissoes/:id", checkToken, ComissaoController.excluirComissao);

export default router;
