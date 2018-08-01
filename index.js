const express = require('express');
const graphQLHttp = require('express-graphql');
const schema = require('./src/schema');
const mongoose = require('mongoose');
const database = require('./config/database');
const port = 3000;

mongoose.Promise = global.Promise;
mongoose.connect(database.mongoConnectionString,{ useNewUrlParser: true },(err) => {
    if(err) {
        console.log(err);
    } else {
        console.log('db connection is okay');
    }
});

const app = express();

app.use('/', graphQLHttp({
    schema: schema,
    graphiql: true
}));

app.listen(port, () => {
    console.log('server running at port', port)
});