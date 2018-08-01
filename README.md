# express-graphql-basic-server
I have build this server to work with graphql for large scale application. Provide the better structure to use graphql with express js. Using the mongodb for database and mongoose for database ODM for express js.

# Installation instructions

1. clone the repository `git clone https://github.com/tariqulislam/express-graphql-basic-server.git`
2. For Yarn run command `yarn install`
3. Or for npm run command `npm install`

# Prerequsite and configurations
1. Install the `mongodb` and `Studio 3T` non commercial version.
2. Create Database to mongodb named `graphqltest`
3. Add username and password to mongodb and provide all permission to database.
4. Grant all permission to user.
5. Import `json` file from `db` folder to `graphqltest` database.
6. Change the `.env` file for database configuration

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

### Express JS

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
GraphQL has its own type language that’s used the write GraphQL schemas: The Schema Definition Language (SDL). Schema contains the some attributes named.[!GraphQL Documentation](https://graphql.org/learn/queries/#mutations)

1. Query
2. Mutation
3. Subscription

## What is Type in graphql?
The most basic components of a GraphQL schema are object types, which just represent a kind of object you can fetch from your service, and what fields it has. In the GraphQL schema language, we might represent it like this[!GraphQL Documentation](https://graphql.org/learn/queries/#mutations):
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

## What is Root Type in GraphQL?

At the top level of every GraphQL server is a type that represents all of the possible entry points into the GraphQL API, it's often called the Root type or the Query type.[!GraphQL Documentation](https://graphql.org/learn/queries/#mutations)

## How to Create  Root Type for Schema by express-graphql?
In this project I have create the root type at file `src/graphql/queries/index.js`
```javascript
// src/graphql/queries/index.js

const { GraphQLList, GraphQLObjectType } = require('graphql');
const Author = require('../../models/Author')
const Post = require('../../models/Post')
const PostType = require('./PostType');
const AuthorType = require('./AuthorType')

const BlogQueryRootType = new GraphQLObjectType ({
    name: 'BlogAppSchema',
    description: "Blog Application Schema Query Root",
    fields: () => ({
        authors: {
            type: new GraphQLList(AuthorType),
            description: "List of all Authors",
            resolve: async function () {
              return await  Author.find({}, (err, auth) => {
              });
            }
        },
        posts: {
            type: new GraphQLList(PostType),
            description: "List of all posts",
            resolve: async function () {
               var posts = await  Post.find({})
               return posts;
            }
        }
    })
});

module.exports = BlogQueryRootType
```
1. `BlogQueryRootType` is a root type and also a `GraphQLObjectType` which contains all the attribute and functions like other `GraphQLObjectType`.
2. In `fileds` is functions which contains all the `Query` of the Schema. For Every GraphQL `field` has its own `resolve` options.
3. `authors` and `posts` fields `resolve` list of a those `GraphQLObjectType`.

## What is Mutations in GraphQL?

In REST, any request might end up causing some side-effects on the server, but by convention it's suggested that one doesn't use GET requests to modify data. GraphQL is similar - technically any query could be implemented to cause a data write. However, it's useful to establish a convention that any operations that cause writes should be sent explicitly via a mutation.

Just like in queries, if the mutation field returns an object type, you can ask for nested fields. This can be useful for fetching the new state of an object after an update.[!GraphQL Documentation](https://graphql.org/learn/queries/#mutations)

## How to Create Mutation by express-graphql?
1. In this project I have create the directory `src/graphql/mutations`.
2. Then I have create the file named `AuthorMutation.js` and `PostMutation.js` file `import` the graphql express functions and library
and `import` `mongoose` models for mutation operations.
```javascript
// src/graphql/mutations/AuthorMutation.js
var {GraphQLNonNull, GraphQLString} = require('graphql');
var AuthorType = require('../queries/AuthorType');
var Author = require('../../models/Author')
```
3. At `AuthorMutations.js` file have added the three functions for mutations.
```javascript
// src/graphql/mutations/AuthorMutation.js
const addAuthor = {
    type: AuthorType,
    args: {
        name: {
            name: 'name',
            type: new GraphQLNonNull(GraphQLString)
        },
        email: {
            name: 'email',
            type: new GraphQLNonNull(GraphQLString)
        }
    },
    resolve: async function (root, params) {
        const uModel = new Author(params);
        const newAuthor = await uModel.save();
        if(!newAuthor) {
            throw new Error('Error')
        }
        return newAuthor
    }
}
```
4. for `addAuthor` mutation type contains two attributes and one `resolve` function
5. `type` attribute value will be any type of `GraphQLObjectType`. I have added `AuthorType` graphql Object type for `addAuthor` mutation.
6. `args` attribute contains the paramter for this mutation. we can defind the each argument which contains:
```javascript
<argument_name>: {
    name: <argument_name> // Optional,
    type: <GraphQL_type> // `GraphQLNonNull` for checking the null value
}
```
8. `resolve` function using for resolve the mutations. which contains the all the functionality to change or effect the `models` or `data`. I have use `mongoose` `save` function to save the new author to mongodb database. also use `async` function to handle the mongodb operations.

9. Mutation for update the author information, i write the code to `AuthorMutation.js` file. the function is `updateAuthor`. which contains similar attribute like `addAuthor`:
```javascript
// src/graphql/mutations/AuthorMutation.js
const updateAuthor = {
    type: AuthorType,
    args: {
        _id: {
            name: '_id',
            type: new GraphQLNonNull(GraphQLString)
        },
        name: {
            name: 'name',
            type: GraphQLString
        },
        email: {
            name: 'email',
            type: GraphQLString
        }
    },
    resolve: async function(root, param) {
       let updateAuthor = {};
       if(param.name) {
           updateAuthor.name = param.name
       }
       if(param.email) {
           updateAuthor.email = param.email
       }
       const uAuthor = await Author.findByIdAndUpdate(param._id, updateAuthor, {new: true})
       console.log(uAuthor)
       if(!uAuthor) {
           throw new Error('Error')
       }
       return uAuthor
    }
}
```
10. For Delete author has similar attribute like `addAuthor`. the code snippet are shows below:
```javascript
// src/graphql/mutations/AuthorMutation.js
const deleteAuthor = {
    type: AuthorType,
    args: {
        _id: {
            name: '_id',
            type: new GraphQLNonNull(GraphQLString)
        }
    },
    resolve: async function (root, param) {
      const deleteAuthor =  await Author.findByIdAndRemove(param._id)
      if(!deleteAuthor) {
         throw new Error('Error');
      }
      return deleteAuthor
    }
}
```
11. then `export` those functions at end of `AuthorMutation.js` file:
```javascript
// src/graphql/mutations/AuthorMutation.js
module.exports = {addAuthor, updateAuthor, deleteAuthor}
```
12. Similar way i also create the `PostMutation.js` file to add the `mutation` functionality:
```javascript
// src/graphql/mutations/PostMutation.js

var {GraphQLNonNull, GraphQLString} = require('graphql')
var Post = require('../../models/Post');
var PostType = require('../queries/PostType');

const createPost = {
    type: PostType,
    args: {
        title: {
            name: "title",
            type: new GraphQLNonNull(GraphQLString)
        },
        author_id: {
            name: "author_id",
            type: new GraphQLNonNull(GraphQLString)
        },
        body: {
            name: "body",
            type: new GraphQLNonNull(GraphQLString)
        }
    },
    resolve: async function(root, param) {
        const postModel = new Post(param);
        const savePost = await postModel.save();
        if(!savePost) {
            throw new Error('Error')
        }
        return savePost;
    }
}

const updatePost = {
    type: PostType,
    args: {
        _id: {
            name: "_id",
            type: new GraphQLNonNull(GraphQLString)
        },
        author_id: {
            name: "author_id",
            type: GraphQLString
        },
        title: {
            name: "title",
            type: GraphQLString
        },
        body: {
            name: "body",
            type: GraphQLString
        }
    },
    resolve: async function (root, param) {
       let updatePost = {};
       if(param.author_id) {
           updatePost.author_id = param.author_id;
       }

       if(param.title) {
           updatePost.author_id = param.title
       }

       if(param.body) { 
           updatePost.body = param.body
        }

        const updatePostInfo = await Post.findByIdAndUpdate(param._id,updatePost,{new: true});

        if(!updatePostInfo) {
            throw new Error('Error');
        }
        return updatePostInfo;
    }
}

const deletePost = {
    type: PostType,
    args: {
        _id: {
            name: "_id",
            type: new GraphQLNonNull(GraphQLString)
        }
    },
    resolve: async function (root, param) {
        const deletePost = await Post.findByIdAndRemove(param._id);
        if(deletePost) {
            throw new Error('Error');
        }
        return deletePost;
    }
}

module.exports = {createPost, updatePost, deletePost}
```
13. then Create `index.js` file which will export all the `mutations` functions and objects

```javascript
// src/graphql/mutations/index.js

var { addAuthor, updateAuthor, deleteAuthor } = require('./AuthorMutation');
var { createPost, updatePost, deletePost} = require('./PostMutation')

module.exports = {
    addAuthor,
    updateAuthor,
    deleteAuthor,
    createPost,
    updatePost,
    deletePost
}
```
## How to Create Schema in express-graphql?
Then I have create the `schema` js file to `src/graphql/schema.js` which contains all the `graphql` `Query` and `Mutation`.
```javascript
// src/graphql/schema.js

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
1. `GraphQLSchema` contains the `query` and `mutation` attribute or object.
2. `query` attribute contains `root type` for graphql which i created at `src/graphql/queries/index.js` file.
3. `mutation` attribute is also a `GraphQLObjectType`, which contains two attribute. 
```javascript
{
    name: <name of the mutation>
    fields: <Main mutations Object>
}
```
5. I have added the main `mutation` objects which are exported at `src/graphql/mutations/index.js`

## Call the Graphql Schema to http endpoint of express js:
1. `graphql-express` which is a middleware of express and graphql.
2. check endpoint using `schema.js` schema at `index.js` root of the project directory.
```javascript
// index.js
...
const schema = require('./src/schema');
...
...
app.use('/', graphQLHttp({
    schema: schema,
    graphiql: true
}));
```
4. Run the Application by `npm start` or if you are using `yarn` command will be `yarn start`




