'use strict';

const mongo_url = process.env.MONGO_URL || 'mongodb://localhost/consulta_cnpj';

//https://github.com/agenda/agenda
var agenda = new Agenda({db: {address: mongo_url}});

agenda.define('delete old users', function (job, done) {
    User.remove({lastLogIn: {$lt: twoDaysAgo}}, done);
});

agenda.on('ready', function () {
    agenda.every('3 minutes', 'delete old users');

    // Alternatively, you could also do:
    agenda.every('*/3 * * * *', 'delete old users');

    agenda.start();
});