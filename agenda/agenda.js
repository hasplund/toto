const Agenda = require('agenda');

const agenda = new Agenda();

agenda
    .database('localhost:27017/toto', 'agenda', { useUnifiedTopology: true})
    .processEvery('5 seconds');

