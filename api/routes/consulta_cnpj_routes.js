'use strict';
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
// controllers
const consulta_cnpj = require('../controllers/consulta_cnpj');

// ROUTES -----------------------------------------------------

// POST
router.post('/:cnpj', jsonParser, consulta_cnpj.getCNPJ);

module.exports = router;