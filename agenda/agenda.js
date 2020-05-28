const Agenda = require('agenda');

// Or override the default collection name:
const agenda = new Agenda({db: {address: mongoConnectionString, collection: 'agendaJobs'}});

/*
agenda.define('delete old users', async job => {
    await User.remove({lastLogIn: {$lt: twoDaysAgo}});
});

(async function() { // IIFE to give access to async/await
    await agenda.start();

    await agenda.every('3 minutes', 'delete old users');
*/