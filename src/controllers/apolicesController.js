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
      let apolice = new apolices(req.body);
      const apoliceResultado = await apolice.save();
      res.status(201).send(apoliceResultado);
    } catch (erro) {
      console.log("erro ao salvar apolice");
      console.log(erro);
      next(erro);
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
  //A função abaixo, lista as apolices por emissão, e também por cliente, caso o cliente seja informado na query
  static listarApolicePorEmissao = async (req, res, next) => {
    const query = req.query.emissao;
    const cliente = req.query.cliente;

    let objeto = {
      emissao: "",
      cliente: "",
    };

    if (query == "true") {
      objeto.emissao = "Emitida";
    } else if (query == "false") {
      objeto.emissao = "Nao Emitida";
    } else {
      objeto = {
        cliente: "",
      };
    }

    if (cliente !== undefined) {
      (objeto.cliente = new RegExp(cliente, "i")), // 'i' é para tornar a busca case-insensitive
        console.log(objeto);
    }
    try {
      console.log(objeto);
      const apoliceResultado = apolices.find(objeto);
      req.resultado = apoliceResultado;

      if (apoliceResultado !== null) {
        next();
      } else {
        res.status(200).send([]);
        next(new NaoEncontrado("Nao foram encontradas apolices"));
      }
    } catch (erro) {
      next(erro);
    }
  };
}

export default ApoliceController;
