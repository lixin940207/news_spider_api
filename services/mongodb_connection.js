const mongoose = require("mongoose");
const fs = require('fs');
const path = require("path");

const data = fs.readFileSync(path.join(__dirname, '../config.json'), { encoding: 'utf-8' });
const config = JSON.parse(data);

const { replicaSetHosts, database, writeConcern, readPreference } = config.mongodb;
const uri = `mongodb://${replicaSetHosts}/${database}?w=${writeConcern}&readPreference=${readPreference}`;
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true });
mongoose.set('useCreateIndex', true)
const db = mongoose.connection;


db.on('open', ()=>{
    console.log('db connected!');
});

db.on('error', (e) => {
    console.error(e);
});

module.exports = db;
