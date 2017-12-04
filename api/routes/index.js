'use strict';

// const cors = require('cors');

// cors setup
// var corsOptions = {
//   origin: 'www.anotherdomain.com'
// };

const express = require('express');

module.exports = function (app) {

    // API ROUTES -------------------
    const apiRoutes = express.Router();

    // ADMINISTRATOR ROUTES
    const administratorRoutes = require('./captcha_routes');
    apiRoutes.use('/captcha', administratorRoutes);

    // apply the routes to our application with the prefix /api
    app.use('/api', apiRoutes);

    // application -------------------------------------------------------------
    app.get('*', function (req, res) {
        res.sendFile(__dirname + '/public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });

};
