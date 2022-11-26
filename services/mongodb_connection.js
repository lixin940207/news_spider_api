const mongoose = require("mongoose");

const replicaSetHosts = process.env.MONGO_HOST || 'localhost:27017';
const database = process.env.DATABASE || 'news_spider';

let uri = `mongodb://${replicaSetHosts}/${database}`;
if (process.env.ENV === 'PRODUCTION') {
    uri = `mongodb+srv://${replicaSetHosts}/${database}?ssl=false&replicaSet=rs0`;
}

mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: false, connectWithNoPrimary: true });
mongoose.set('useCreateIndex', true)
const db = mongoose.connection;


db.on('open', ()=>{
    console.log('db connected!');
});

db.on('error', (e) => {
    console.error(e);
});

module.exports = db;
