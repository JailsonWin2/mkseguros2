import mongoose from "mongoose";
import { apoliceSchema } from "./index.js";

const sinistroSchema = new mongoose.Schema({
  data_sinistro: {
    type: Date,
    required: [true, "O campo DATA SINISTRO é obrigatório!"],
  },
  descricao: {
    type: String,
    required: [true, "O campo DESCRICAO é obrigatório!"],
  },
  apolice: apoliceSchema,
});

const sinistros = mongoose.model("sinistros", sinistroSchema);

export default sinistros;
