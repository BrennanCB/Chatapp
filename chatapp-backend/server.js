const mongoose = require('mongoose');
const express = require('express');
const dbConfig = require('./config/secret');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const auth = require('./routes/auth-routes');

const app = express();

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({extended: true, limit: '50mb'}));
app.use(cookieParser());
app.use(logger('dev'));

mongoose.Promise = global.Promise;
mongoose.connect(
    dbConfig.url,
    {useNewUrlParser: true}
);


app.use('/api/chatapp', auth);

app.listen(3000, () => {
    console.log('Running on port 3000');
});
