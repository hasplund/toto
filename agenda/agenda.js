const Agenda = require('agenda');
const axios = require('axios');

const Card = require('../model/card')

// Or override the default collection name:
const agenda = new Agenda({db: {address: "mongodb://localhost:27017/toto", collection: 'agenda'}});

function prepareCardData(card) {
    let keys = ['cardId', 'country', 'firstRaceStart', 'meetDate',
        'trackAbbreviation', 'trackName', 'raceType']
    let prepareData = {};
    for (let key of keys) {
        prepareData[key]=card[key];
    }
    return prepareData;
}

agenda.define('load cards', async job => {
    console.log("load cards");
    axios({
        method: 'get',
        url: 'https://www.veikkaus.fi//api/toto-info/v1/cards/active',
        responseType: 'json'
    })
        .then(function (response) {
            let coll = response['data']['collection']
            for (let card of coll) {
                let data = prepareCardData(card)
                let cardId=data['cardId']
                Card
                    .findOneAndUpdate({cardId: cardId},
                        {$set: data},
                        {new:true, upsert:true, useFindAndModify:true})
                    .exec(function (err, myCard) {
                        if (err) throw err;
                        console.log(myCard);
                    })
            }
        })
});

(async function () { // IIFE to give access to async/await
    await agenda.start();
    await agenda.purge();
    await agenda.every('10 minutes', 'load cards');
})();