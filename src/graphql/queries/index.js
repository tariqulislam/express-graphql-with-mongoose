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