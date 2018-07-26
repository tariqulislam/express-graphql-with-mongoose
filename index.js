const express = require('express');
const { buildSchema } = require('graphql');
const grapHTTP = require('express-graphql');
const schema = require('./src/schema');
const mongoose = require('mongoose');
const database = require('./config/database');
const port = 3000;

mongoose.Promise = global.Promise;

mongoose.connect(database.mongoConnectionString,(err) => {
    if(err) {
        console.log(err);
    } else {
        console.log('db connection is okay');
    }

});
// let schema = buildSchema(`
//     type Query {
//         postTitle: String,
//         blogTitle: String
//     }
// `);

// let root = {
//     postTitle: () => {
//         return 'Build a Simple GraphQL Server';
//     },
//     blogTitle: () => {
//         return 'Tariqul';
//     }
// }


const app = express();

app.use('/', grapHTTP({
    schema: schema,
    graphiql: true
}));

app.listen(port);