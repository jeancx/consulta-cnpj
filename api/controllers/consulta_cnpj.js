'use strict';

//utils
const anticaptcha_util = '../utils/anticaptcha_util';

// db connection
const db = require('../../server').db;

// model
const Empresa = require('../models/empresa');


// get all
exports.getCNPJ = function (req, res, next) {

    const query = {
        cnpj: req.params.cnpj
    };
    //encontra ou Cria
    Empresa.findOrCreate(query, function (err, model) {
        //se tiver data traz o resultado
        if (model.ultima_atualizacao !== null) {
            res.json(model);
        } else { //se não tiver data pega os dados atulizados com Crawler / Anticaptcha
            //pega os dados numa thread e atualiza no banco
            //retorna os dados do receitaws para rápida resposta
        }
    });


};
