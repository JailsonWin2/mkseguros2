import mongoose from "mongoose";
import { apoliceSchema } from "./Apolice.js";

const comissaoSchema = new mongoose.Schema({
  data_recebimento: {
    type: Date,
    required: [true, "O campo DATA RECEBIMENTO é obrigatório!"],
  },
  valor_recebido: {
    type: Number,
    required: [true, "O campo VALOR RECEBIDO é obrigatório!"],
  },
  apolice: apoliceSchema,
});

const comissoes = mongoose.model("comissoes", comissaoSchema);

export default comissoes;
