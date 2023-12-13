import express from "express";
import SinistroController from "../controllers/sinistroController.js";
import paginar from "../middlewares/paginar.js";
import checkToken from "../middlewares/checkToken.js";
const router = express.Router();

router
  .get("/sinistros", checkToken, SinistroController.listarSinistros, paginar)
  .get(
    "/sinistros/apolice",
    checkToken,
    SinistroController.listarSinistroPorApolice
  )
  .get(
    "/sinistros/busca",
    checkToken,
    SinistroController.listarSinistroPorFiltro,
    paginar
  )
  .get("/sinistros/:id", checkToken, SinistroController.listarSinistroPorId)
  .post("/sinistros", checkToken, SinistroController.cadastrarSinistro)
  .put("/sinistros/:id", checkToken, SinistroController.atualizarSinistro)
  .delete("/sinistros/:id", checkToken, SinistroController.excluirSinistro);

export default router;
