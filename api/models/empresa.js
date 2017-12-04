const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const empresaSchema = new mongoose.Schema({
    cnpj: {
        type: String,
        required: true,
        unique: true
    },
    ultima_atualizacao: String,
    atividade_principal: [
        {
            text: String,
            code: String
        }
    ],
    data_situacao: Date,
    nome: String,
    uf: String,
    telefone: String,
    email: String,
    atividades_secundarias: [
        {
            text: String,
            code: String
        }
    ],
    qsa: [
        {
            qual: String,
            nome: String
        },
        {
            qual: String,
            nome: String
        }
    ],
    situacao: String,
    bairro: String,
    logradouro: String,
    numero: String,
    cep: String,
    municipio: String,
    abertura: String,
    natureza_juridica: String,
    fantasia: String,
    status: String,
    tipo: String,
    complemento: String,
    efr: String,
    motivo_situacao: String,
    situacao_especial: String,
    data_situacao_especial: String,
    capital_social: Number,
    extra: {}
});

// set up a mongoose model and pass it using module.exports
module.exports = mongoose.model('Empresa', empresaSchema);