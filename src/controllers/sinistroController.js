import NaoEncontrado from "../erros/NaoEncontrado.js";
import { apolices, sinistros } from "../models/index.js";

class SinistroController {
  static listarSinistros = async (req, res, next) => {
    try {
      const buscaSinistros = sinistros.find();

      req.resultado = buscaSinistros;

      next();
    } catch (erro) {
      next(erro);
    }
  };

  static listarSinistroPorId = async (req, res, next) => {
    try {
      const id = req.params.id;

      const sinistroResultado = await sinistros.findById(id);
      //.populate("autor", "nome")
      //.exec();

      if (sinistroResultado !== null) {
        res.status(200).send(sinistroResultado);
      } else {
        next(new NaoEncontrado("Id da sinistro não localizado."));
      }
    } catch (erro) {
      next(erro);
    }
  };

  static cadastrarSinistro = async (req, res, next) => {
    try {
      const apoliceResultado = await apolices.findById(req.body.apolice);
      let sinistro = new sinistros(req.body);
      sinistro.apolice = apoliceResultado;
      const sinistroResultado = await sinistro.save();

      res.status(201).send(sinistroResultado.toJSON());
    } catch (erro) {
      next(erro);
    }
  };

  static atualizarSinistro = async (req, res, next) => {
    try {
      const id = req.params.id;

      const sinistroResultado = await sinistros.findByIdAndUpdate(id, {
        $set: req.body,
      });

      if (sinistroResultado !== null) {
        res.status(200).send({ message: "Sinistro atualizada com sucesso" });
      } else {
        next(new NaoEncontrado("Id da sinistro não localizado."));
      }
    } catch (erro) {
      next(erro);
    }
  };

  static excluirSinistro = async (req, res, next) => {
    try {
      const id = req.params.id;

      const sinistroResultado = await sinistros.findByIdAndDelete(id);

      if (sinistroResultado !== null) {
        res.status(200).send({ message: "Sinistro removida com sucesso" });
      } else {
        next(new NaoEncontrado("Id da sinistro não localizada."));
      }
    } catch (erro) {
      next(erro);
    }
  };

  static listarSinistroPorApolice = async (req, res, next) => {
    try {
      let apoliceId = req.query.apolice;
      apoliceId = apoliceId.trim(); // Remover espaços em branco, incluindo quebras de linha

      const apoliceEncontrada = await apolices.findOne({
        _id: apoliceId,
      });

      if (apoliceEncontrada !== null) {
        const sinistrosPorApolice = await sinistros.find({
          "apolice._id": apoliceId,
        });

        res.status(200).json(sinistrosPorApolice);
      } else {
        next(new NaoEncontrado("Id da apolice não localizado."));
      }
    } catch (erro) {
      console.log("Erro", erro);
      next(erro);
    }
  };

  static listarSinistroPorFiltro = async (req, res, next) => {
    try {
      const busca = await processaBusca(req.query);

      if (busca !== null) {
        const sinistrosResultado = apolices.find(busca.apolice);

        req.resultado = sinistrosResultado;

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

export default SinistroController;
