import express from "express";
import livros from "./livrosRoutes.js";
import autores from "./autoresRoutes.js";
import { apolices } from "../models/index.js";

const routes = (app) => {
  app.route("/").get((req, res) => {
    res.status(200).send({ titulo: "Curso de node" });
  });

  app.use(express.json(), livros, autores, apolices);
};

export default routes;
