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
2. Create file `Author.js` and `Post.js`
```javascript
// src/models/Author.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const authorSchema = new Schema({
    name: { type: String },
    email: {type: String, required: true, unique: true}
});
const Author = mongoose.model('Author', authorSchema);
module.exports = Author;
```
```javascript
// src/models/Post.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const postSchema = new Schema({
    author_id: Schema.Types.ObjectId,
    title: String,
    category: String,
    body: String
});
const Post = mongoose.model('Post', postSchema);
module.exports = Post;
```

this code snappit contains the `model` defination for `mongodb` using `mongoose` ODM.
1. first we add `mongoose` by adding ```javascript const mongoose = require('mongoose');```
2. then add the ```javascript const Schema = mongoose.Schema;``` schema for support different datatype and constraint of ```mongoose```
3. Schema defination for `authorSchema` and `postSchema` contains the `mongodb` `collection` information

## What is Schema in Graphql?
GraphQL has its own type language that’s used the write GraphQL schemas: The Schema Definition Language (SDL). Schema contains the some attributes named

1. Query
2. Mutation
3. Subscription

## What is Type in graphql?
The most basic components of a GraphQL schema are object types, which just represent a kind of object you can fetch from your service, and what fields it has. In the GraphQL schema language, we might represent it like this:
```
type PostType {
    id: ID!
    title: String!
    body: String!
    author: [AuthorType]!
}
```
1. `AuthorType`: is a Graphql Object Type
2. `id`, `title` and `body`, `AuthorType` is field name of Object Type
3. `String` and `ID` is `DataType` of the `field`. this type is called as `ScalarType` and 
4. After `DataType`  `!` symbol means `non-nullable`
5. `[AuthorType]!` means  `array` of `AuthorType` object which is embedded with `AuthorType` Object Type

## What is Query in graphql?

## How to Create Type of ObjectType in Graphql?

```javascript
const { GraphQLString, GraphQLObjectType, GraphQLNonNull } = require('graphql');
const AuthorType = new GraphQLObjectType({
    name: 'AuthorType',
    description: "This represent an author",
    fields: () => ({
        _id: {type: new GraphQLNonNull(GraphQLString)},
        name: {type: new GraphQLNonNull(GraphQLString)},
        email: {type: GraphQLString}
    })
});

module.exports = AuthorType;
```
1. `express-graphql` provide the `GraphQlObjectType` which is provide all functionality of graphql `Type` and `Query`
2. I define `AuthorType` as a `GraphQLObjectType` at `src/graphql/queries/AuthorType.js`

```javascript
const { GraphQLString, GraphQLObjectType, GraphQLNonNull } = require('graphql');
const Author = require('../../models/Author');
const AuthorType = require('./AuthorType');
const mongoose = require('mongoose');
const PostType = new GraphQLObjectType({
    name: 'PostType', 
    description: "This is resent post",
    fields: () => ({
        _id: {type: new GraphQLNonNull(GraphQLString)},
        title: {type: GraphQLString},
        body: {type: GraphQLString},
        author_id: {type: GraphQLString},
        author: {type: AuthorType, resolve: async function (post) {
            var authors =  await  Author.findById(mongoose.Types.ObjectId(post.author_id))
            if(!authors) {
                throw new Error('Error')
            }
            return authors
        }}
    })
});

module.exports = PostType
```
3. define `PostType` variable at `src/graphql/queries/PostType.js` file, which contains the `GraphQLObjectType`.
4. `GraphQLObjectType` has argument `Object` which contains:
```javascript
{
  name: `<Name of the GrapQLObjectType or Graphql Type>`,
  description: `<Description of the GraphQLObjectType`>,
  fields: () => `(function which contains return the fields of the GraphQLObjectType)`{
      type: `<Datatype of the Fields>`
      resolve: `(function for resolve the field from api or database or from ORM or ODM)`
  }
} 
```
5. at `PostType` graphql object type, I have added the `author` field and `resolve` function to resolve the field information from mongodb database using `mongoose` model named `Author` model
6. I have use `async` function to resolve the `author` field
7. ```var authors =  await  Author.findById(mongoose.Types.ObjectId(post.author_id))``` return `author` information related to specific `post`
8. to handle the error i have to throw the `Error` object, which object has no `author` information by ```throw new Error('Error')```
9. or `return authors` which contains `AuthorType` graphql Object Type Information.

## How to Create Root Query for Schema by express-graphql?


## How to Create Mutation by express-graphql?

## How to Create Schema in express-graphql?

```javascript
const { GraphQLObjectType,GraphQLSchema } = require('graphql');
const mutation = require('./graphql/mutations/index')
const BlogQueryRootType = require('./graphql/queries/index')

const BlogAppSchema = new GraphQLSchema({
   query: BlogQueryRootType,
   mutation: new GraphQLObjectType({
       name: 'Mutation',
       fields: mutation
   })
});

module.exports = BlogAppSchema;
```





