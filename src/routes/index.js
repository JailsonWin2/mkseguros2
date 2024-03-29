import express from "express";
import cors from "cors";
import apolices from "./apolicesRoutes.js";
import comissoes from "./comissoesRoutes.js";
import users from "./userRoutes.js";
import login from "./login.js";
import sinistros from "./sinistrosRoutes.js";

const routes = (app) => {
  app.use(cors()); // Adicione esta linha para habilitar o CORS

  app.route("/").get((req, res) => {
    res.status(200).send({ titulo: "Curso de node" });
  });

  app.use(express.json(), apolices, comissoes, sinistros, users, login);
};

export default routes;
