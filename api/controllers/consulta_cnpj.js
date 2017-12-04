'use strict';

//utils
const anticaptcha_util = '../utils/anticaptcha_util';

// db connection
const db = require('../../server').db;

// model
const Empresa = require('../models/empresa');


// get all
exports.getCNPJ = function(req, res, next) {

    const query = {
        cnpj: req.params.cnpj
    };

    Empresa.findOrCreate(query, function (err, model) {
        if (model.ultima_atualizacao !== null) {
            res.json(model);
        } else {
            //anticaptcha_util.get
        }
    });


};
