'use strict';
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
// controllers
const captcha = require('../controllers/consulta_cnpj');

// ROUTES -----------------------------------------------------

// POST
router.post('/', jsonParser, captcha.solve);

module.exports = router;