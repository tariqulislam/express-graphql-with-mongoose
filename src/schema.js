const Authors = require('./data/authors');
const Posts = require('./data/posts');
const { GraphQLString, GraphQLList, GraphQLObjectType, GraphQLNonNull, GraphQLSchema, Grap } = require('graphql');
const _ = require('lodash')
const Author = require('./models/Author')
const Post = require('./models/Post')

const mongoose = require('mongoose');

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    description: "This represent an author",
    fields: () => ({
        _id: {type: new GraphQLNonNull(GraphQLString)},
        name: {type: new GraphQLNonNull(GraphQLString)},
        email: {type: GraphQLString}
    })
});

const PostType = new GraphQLObjectType({
    name: 'Post',
    description: "This is resent post",
    fields: () => ({
        _id: {type: new GraphQLNonNull(GraphQLString)},
        title: {type: new GraphQLNonNull(GraphQLString)},
        body: {type: GraphQLString},
        author: {type: AuthorType, resolve: async function (post) {
            var authors =  await  Author.findOne({_id: post.author_id}, function (err, auth) {});
            return authors
        }}
    })
});

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
   query: BlogQueryRootType
});

module.exports = BlogAppSchema;