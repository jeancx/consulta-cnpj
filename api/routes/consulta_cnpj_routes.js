'use strict';
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
// controllers
const consulta_cnpj = require('../controllers/consulta_cnpj');

// ROUTES -----------------------------------------------------

// GET
router.get('/:cnpj', jsonParser, consulta_cnpj.getCNPJ);
router.get('/:cnpj/atualiza', jsonParser, consulta_cnpj.getUpdateCNPJ);

module.exports = router;