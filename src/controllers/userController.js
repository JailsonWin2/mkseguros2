import NaoEncontrado from "../erros/NaoEncontrado.js";
import { user } from "../models/index.js";

class UserController {
  static listarUser = async (req, res, next) => {
    try {
      const userResultado = user.find();

      req.resultado = userResultado;

      next();
    } catch (erro) {
      res.status(500).json({ message: "Erro interno no servidor" });
    }
  };

  static listarUserPorId = async (req, res, next) => {
    try {
      const id = req.params.id;

      const userResultado = await user.findById(id);

      if (userResultado !== null) {
        res.status(200).send(userResultado);
      } else {
        next(new NaoEncontrado("Id da User não localizado."));
      }
    } catch (erro) {
      next(erro);
    }
  };

  static cadastrarUser = async (req, res, next) => {
    try {
      let usuario = new user(req.body);
      const userResultado = await usuario.save();
      res.status(201).send(userResultado);
    } catch (erro) {
      console.log("erro ao salvar user");
      console.log(erro);
      next(erro);
    }
  };

  static atualizarUser = async (req, res, next) => {
    try {
      const id = req.params.id;

      const userResultado = await user.findByIdAndUpdate(id, {
        $set: req.body,
      });

      if (userResultado !== null) {
        res.status(200).send({ message: "User atualizada com sucesso" });
      } else {
        next(new NaoEncontrado("Id de User não localizado."));
      }
    } catch (erro) {
      next(erro);
    }
  };

  static excluirUser = async (req, res, next) => {
    try {
      const id = req.params.id;

      const userResultado = await user.findByIdAndDelete(id);

      if (userResultado !== null) {
        res.status(200).send({ message: "User removido com sucesso" });
      } else {
        next(new NaoEncontrado("Id da User não localizado."));
      }
    } catch (erro) {
      next(erro);
    }
  };
}

export default UserController;
