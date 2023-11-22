import NaoEncontrado from "../erros/NaoEncontrado.js";
import { apolices } from "../models/index.js";

class ApoliceController {
  static listarApolices = async (req, res, next) => {
    try {
      const apolicesResultado = apolices.find();

      req.resultado = apolicesResultado;

      next();
    } catch (erro) {
      res.status(500).json({ message: "Erro interno no servidor" });
    }
  };

  static listarApolicePorId = async (req, res, next) => {
    try {
      const id = req.params.id;

      const apoliceResultado = await apolices.findById(id);

      if (apoliceResultado !== null) {
        res.status(200).send(apoliceResultado);
      } else {
        next(new NaoEncontrado("Id da Apolice não localizado."));
      }
    } catch (erro) {
      next(erro);
    }
  };

  static cadastrarApolice = async (req, res, next) => {
    try {
      console.log("cria o objeto apolice");
      let apolice = new apolices(req.body);
      console.log("salva o objeto apolice");
      const apoliceResultado = await apolice.save();
      console.log("envia o objeto apolice");
      res.status(201).send(apoliceResultado);
    } catch (erro) {
      console.log("erro ao salvar apolice");
      console.log(erro);
    }
  };

  static atualizarApolice = async (req, res, next) => {
    try {
      const id = req.params.id;

      const apoliceResultado = await apolices.findByIdAndUpdate(id, {
        $set: req.body,
      });

      if (apoliceResultado !== null) {
        res.status(200).send({ message: "Apolice atualizada com sucesso" });
      } else {
        next(new NaoEncontrado("Id de Apolice não localizado."));
      }
    } catch (erro) {
      next(erro);
    }
  };

  static excluirApolice = async (req, res, next) => {
    try {
      const id = req.params.id;

      const apoliceResultado = await apolices.findByIdAndDelete(id);

      if (apoliceResultado !== null) {
        res.status(200).send({ message: "Apolice removido com sucesso" });
      } else {
        next(new NaoEncontrado("Id da Apolice não localizado."));
      }
    } catch (erro) {
      next(erro);
    }
  };
}

export default ApoliceController;
