# express-graphql-basic-server
I have build this server to work with graphql for large scale application. Provide the better structure to use graphql with express js. Using the mongodb for database and mongoose for database ODM for express js.

# Installation instructions

1. clone the repository `git clone https://github.com/tariqulislam/express-graphql-basic-server.git`
2. For Yarn run command `yarn install`
3. Or for npm run command `npm install`

# Prerequsite and configurations
1. Install the mongodb
2. Create Database to mongodb named `graphqltest`
3. Add username and password to mongodb and provide all permission to database
4. Import `json` file from `db` folder to mongodb database.
4. Change the `.env` file for database configuration

```
DATABASE_HOST=localhost
DATABASE_PORT=27017
DATABASE_USER=<username>
DATABASE_PASS=<password>
DATABASE_NAME=graphqltest
```

# Introductions and knowladgebase

1. GraphQL
2. express JS
3. dotenv
4. mongoose
6. Graphqli
7. nodemon

### What is graphql

GraphQL is a query language for APIs and a runtime for fulfilling those queries with your existing data. GraphQL provides a complete and understandable description of the data in your API, gives clients the power to ask for exactly what they need and nothing more, makes it easier to evolve APIs over time, and enables powerful developer tools[!alt text](https://graphql.org/).

### What is graphql-express

GraphQL HTTP server with any HTTP web framework that supports connect styled middleware, including Connect itself, Express and Restify.

### What is Mongoose

Mongoose is an object data modeling (ODM) library that provides a rigorous modeling environment for your data, enforcing structure as needed while still maintaining the flexibility that makes MongoDB powerful.

### express JS

Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.

## Sample coding for create graphql api for client

### Create the mongoose schema for database interactions

1. Go to `src/models` folder
2. Create file `Author.js`
```javascript
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const authorSchema = new Schema({
    name: { type: String },
    email: {type: String, required: true, unique: true}
});

const Author = mongoose.model('Author', authorSchema);

module.exports = Author;
```
this code snappit contains the `model` defination for `mongodb` using `mongoose` ODM.
1. first we add `mongoose` by adding ```javascript const mongoose = require('mongoose');```
2. then add the ```javascript const Schema = mongoose.Schema;``` schema for support different datatype and constraint of ```mongoose```
3. create the schema defination for `Author` table which contains the `mongodb` `collection` information



