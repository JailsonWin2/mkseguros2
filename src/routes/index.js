import express from "express";
import livros from "./livrosRoutes.js";
import autores from "./autoresRoutes.js";
import apolices from "./apolicesRoutes.js";
import comissoes from "./comissoesRoutes.js";

const routes = (app) => {
  app.route("/").get((req, res) => {
    res.status(200).send({ titulo: "Curso de node" });
  });

  app.use(express.json(), livros, autores, apolices, comissoes);
};

export default routes;
