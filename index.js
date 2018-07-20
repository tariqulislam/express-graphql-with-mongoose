const express = require('express');
const { buildSchema } = require('graphql');
const grapHTTP = require('express-graphql');
const schema = require('./src/schema');
let port = 3000;

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