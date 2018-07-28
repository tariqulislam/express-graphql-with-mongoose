const Authors = require('./data/authors');
const Posts = require('./data/posts');
const { GraphQLList, GraphQLObjectType,GraphQLSchema } = require('graphql');
const _ = require('lodash')
const Author = require('./models/Author')
const Post = require('./models/Post')
const mutation = require('./graphql/mutations/index')
const PostType = require('./graphql/queries/PostType');
const AuthorType = require('./graphql/queries/AuthorType')




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
               var posts = await  Post.find({}, (err, post) => {})
               return posts;
            }
        }
    })
});

const BlogAppSchema = new GraphQLSchema({
   query: BlogQueryRootType,
   mutation: new GraphQLObjectType({
       name: 'Mutation',
       fields: mutation
   })
});

module.exports = BlogAppSchema;