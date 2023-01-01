const mongoose = require("mongoose");

mongoose.Promise = Promise;

const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/news_spider';

mongoose.connect(mongoUri, {useNewUrlParser: true, useUnifiedTopology: false, connectWithNoPrimary: true});
mongoose.set('useCreateIndex', true)
const db = mongoose.connection;


db.on('open', ()=>{
    console.log('db connected!');
});

db.on('error', (e) => {
    console.error(e);
});

module.exports = db;
