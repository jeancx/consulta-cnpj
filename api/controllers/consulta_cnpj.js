'use strict';

//utils
const receitaUtil = require('../utils/receita_util');

// db connection
const db = require('../../server').db;

// model
const Empresa = require('../models/empresa');

//others
const https = require('https');

// getCNPJ
exports.getCNPJ = function (req, res, next) {

    const query = {
        cnpj: req.params.cnpj
    };
    //encontra ou Cria
    Empresa.findOrCreate(query, function (err, doc) {

        //se tiver data traz o resultado
        if (doc.ultima_atualizacao) {
            res.json(doc);
        } else { //se não tiver data pega os dados atulizados com Crawler / Anticaptcha
            //pega os dados numa thread e atualiza no banco
            //retorna os dados do receitaws para rápida resposta
        }

        https.get('https://www.receitaws.com.br/v1/cnpj/' + req.params.cnpj, function (resp) {
            var data = '';

            // A chunk of data has been recieved.
            resp.on('data', function (chunk) {
                data += chunk;
            });

            // The whole response has been received. Print out the result.
            resp.on('end', function () {

                var json = JSON.parse(data);

                if(json.status === 'OK'){

                    //update all fields
                    for (var field in Empresa.schema.paths) {
                        if ((field !== '_id') && (field !== '__v') && (field !== 'cnpj')) {
                            if (json[field] !== undefined) {
                                doc[field] = json[field];
                            }
                        }
                    }
                    doc.save();

                    res.json(json);
                }
            });

        }).on("error", function (err) {
            console.log("Error: " + err.message);
        });
    });

};

// getCNPJ
exports.getUpdateCNPJ = function (req, res, next) {

    const query = {
        cnpj: req.params.cnpj
    };
    //encontra ou Cria
    Empresa.findOrCreate(query, function (err, doc) {

        var json = receitaUtil.getReceitaJSON(req.params.cnpj);

        res.json(json);

    });

};
