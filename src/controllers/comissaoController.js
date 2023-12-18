import { ObjectId } from "mongodb";
import NaoEncontrado from "../erros/NaoEncontrado.js";
import { apolices, comissoes } from "../models/index.js";

class ComissaoController {
  static listarComissoes = async (req, res, next) => {
    try {
      const buscaComissoes = comissoes.find();

      req.resultado = buscaComissoes;

      next();
    } catch (erro) {
      next(erro);
    }
  };

  static listarComissaoPorId = async (req, res, next) => {
    try {
      const id = req.params.id;

      const comissaoResultado = await comissoes.findById(id);

      if (comissaoResultado !== null) {
        res.status(200).send(comissaoResultado);
      } else {
        next(new NaoEncontrado("Id da comissao não localizado."));
      }
    } catch (erro) {
      next(erro);
    }
  };

  static cadastrarComissao = async (req, res, next) => {
    try {
      const apoliceResultado = await apolices.findById(req.body.apolice);
      console.log("ApoliceResultado", apoliceResultado);
      let comissao = new comissoes(req.body);

      comissao.apolice = apoliceResultado;

      const comissaoResultado = await comissao.save();

      res.status(201).send(comissaoResultado.toJSON());
    } catch (erro) {
      next(erro);
    }
  };

  static atualizarComissao = async (req, res, next) => {
    try {
      const id = req.params.id;

      const comissaoResultado = await comissoes.findByIdAndUpdate(id, {
        $set: req.body,
      });

      if (comissaoResultado !== null) {
        res.status(200).send({ message: "Comissao atualizada com sucesso" });
      } else {
        next(new NaoEncontrado("Id da comissao não localizado."));
      }
    } catch (erro) {
      next(erro);
    }
  };

  static excluirComissao = async (req, res, next) => {
    try {
      const id = req.params.id;

      const comissaoResultado = await comissoes.findByIdAndDelete(id);

      if (comissaoResultado !== null) {
        res.status(200).send({ message: "Comissao removida com sucesso" });
      } else {
        next(new NaoEncontrado("Id da comissao não localizada."));
      }
    } catch (erro) {
      next(erro);
    }
  };

  static listarComissaoPorApolice = async (req, res, next) => {
    try {
      let apoliceId = req.query.apolice;
      apoliceId = apoliceId.trim(); // Remover espaços em branco, incluindo quebras de linha

      const apoliceEncontrada = await apolices.findOne({
        _id: apoliceId,
      });

      if (apoliceEncontrada !== null) {
        const comissoesPorApolice = await comissoes.find({
          "apolice._id": apoliceId,
        });

        res.status(200).json(comissoesPorApolice);
      } else {
        next(new NaoEncontrado("Id da apolice não localizado."));
      }
    } catch (erro) {
      console.log("Erro", erro);
      next(erro);
    }
  };

  static listarComissaoPorFiltro = async (req, res, next) => {
    try {
      const busca = await processaBusca(req.query);

      if (busca !== null) {
        const comissoesResultado = apolices.find(busca.apolice);

        req.resultado = comissoesResultado._id;

        next();
      } else {
        res.status(200).send([]);
      }
    } catch (erro) {
      console.log("Erro", erro);
      next(erro);
    }
  };
}

async function processaBusca(parametros) {
  const { apolice } = parametros;

  let busca = {};

  if (apolice) busca.apolice = apolice;
  //if (titulo) busca.titulo = { $regex: titulo, $options: "i" };
  //
  //if (minPaginas || maxPaginas) busca.numeroPaginas = {};
  //
  //// gte = Greater Than or Equal = Maior ou igual que
  //if (minPaginas) busca.numeroPaginas.$gte = minPaginas;
  //// lte = Less Than or Equal = Menor ou igual que
  //if (maxPaginas) busca.numeroPaginas.$lte = maxPaginas;
  //
  //if (nomeAutor) {
  //  const autor = await apolices.findOne({ nome: nomeAutor });
  //
  //  if (autor !== null) {
  //    busca.autor = autor._id;
  //  } else {
  //    busca = null;
  //  }
  //}
  return busca;
}

export default ComissaoController;
