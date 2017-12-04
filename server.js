// SET UP ======================================================================
const express = require('express');
const fs = require('fs');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config({path: './.env'});
const port = process.env.PORT || 3000;
const mongo_url = process.env.MONGO_URL || 'mongodb://localhost/consulta_cnpj';
const morgan = require('morgan');
const path = require('path');
const rfs = require('rotating-file-stream');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');


// CONFIGURATION ===============================================================
app.use(express.static('./public'));                            // set the static files location /public/img will be /img for users
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended': 'true'}));           // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({type: 'application/vnd.api+json'}));   // parse application/vnd.api+json as json
app.use(methodOverride('X-HTTP-Method-Override'));              // override with the X-HTTP-Method-Override header in the request

//logs
const logDirectory = path.join(__dirname, 'log');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);
const accessLogStream = rfs('access.log', {
    interval: '1d', // rotate daily
    path: logDirectory
});
// setup the logger
app.use(morgan('combined', {stream: accessLogStream}))


//CONNECTION ===================================================================
mongoose.connect(mongo_url, function (error, db) {
    if (error) {
        throw new Error('Database failed to connect!');
    } else {
        console.log('MongoDB successfully connected on port 27017.');
    }
    // export db connection so can be required in other files
    exports.db = db;
});


// ROUTES ======================================================================
require('./api/routes/index.js')(app);

// LISTEN (start app with node server.js) ======================================
app.listen(port);
console.log("App listening on port " + port);
