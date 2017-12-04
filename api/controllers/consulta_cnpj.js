'use strict';

//utils
const anticaptcha_util = '../utils/anticaptcha_util';

// db connection
const db = require('../../server').db;

// model
const Empresa = require('../models/empresa');


// get all
exports.getCNPJ = function*(req, res, next) {

    const query = {
        cnpj: req.params.cnpj
    };

    Empresa.findOrCreate(query, function (err, model) {
        if (model.empresa[0].ultima_atualizacao !== null) {
            model.users.splice(0, 1);
        } else {
            model.users.splice(1, 1);
            anticaptcha_util.get
        }
        // created will be true here
        res.json(model);
    });


};
