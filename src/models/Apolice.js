import mongoose from "mongoose";

const apoliceSchema = new mongoose.Schema(
  {
    id: { type: String },
    data_venda: {
      type: String,
      required: [true, "O campo DATA VENDA é obrigatório!"],
    },
    vigencia_inicio: {
      type: String,
      required: [true, "O campo VIGÊNCIA INÍCIO é obrigatório!"],
    },
    vigencia_final: {
      type: String,
      required: [true, "O campo VIGÊNCIA FINAL é obrigatório!"],
    },
    cpf: {
      type: String,
      required: [true, "O campo CPF é obrigatório!"],
    },
    cliente: {
      type: String,
      required: [true, "O campo CLIENTE é obrigatório!"],
    },
    produto: {
      type: String,
      required: [true, "O campo PRODUTO é obrigatório!"],
    },
    seguradora: {
      type: String,
      required: [true, "O campo SEGURADORA é obrigatório!"],
    },
    numero_proposta: {
      type: String,
      required: [true, "O campo NÚMERO PROPOSTA é obrigatório!"],
    },
    premio_bruto: {
      type: Number,
      required: [true, "O campo PRÊMIO BRUTO é obrigatório!"],
    },
    premio_liquido: {
      type: Number,
      required: [true, "O campo PRÊMIO LÍQUIDO é obrigatório!"],
    },
    comissao: {
      type: Number,
      required: [true, "O campo COMISSÃO é obrigatório!"],
    },
    resultado: {
      type: Number,
      required: [true, "O campo RESULTADO é obrigatório!"],
    },
    emissao: {
      type: String,
      required: [true, "O campo EMISSÃO é obrigatório!"],
    },
    forma_pagamento: {
      type: String,
      required: [true, "O campo FORMA PAGAMENTO é obrigatório!"],
    },
  },
  {
    versionKey: false,
  }
);

const apolices = mongoose.model("apolices", apoliceSchema);

export default apolices;
