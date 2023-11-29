import express from "express";
import apolices from "./apolicesRoutes.js";
import comissoes from "./comissoesRoutes.js";

const routes = (app) => {
  app.route("/").get((req, res) => {
    res.status(200).send({ titulo: "Curso de node" });
  });

  app.use(express.json(), apolices, comissoes);
};

export default routes;
