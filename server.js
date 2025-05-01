const express = require('express');
const cors = require('cors');
const mongodb = require('./db/connect')
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use (cors());
app.use(express.json());
app.use((req,res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next()
});
app.use('/rolls', require('./routes/rolls'));

mongodb.initDb((err) => {
    if(err) {
        console.log('Database init failed', err);
        return;
    } else {
        app.listen(PORT);
        console.log(`Connected To Db And Listening on ${PORT}`)
    }
})