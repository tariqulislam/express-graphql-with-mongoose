const Authors = require('./data/authors');
const Posts = require('./data/posts');
const { GraphQLString, GraphQLList, GraphQLObjectType, GraphQLNonNull, GraphQLSchema } = require('graphql');
const _ = require('lodash')

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    description: "This represent an author",
    fields: () => ({
        id: {type: new GraphQLNonNull(GraphQLString)},
        name: {type: new GraphQLNonNull(GraphQLString)},
        email: {type: GraphQLString}
    })
});

const PostType = new GraphQLObjectType({
    name: 'Post',
    description: "This is resent post",
    fields: () => ({
        id: {type: new GraphQLNonNull(GraphQLString)},
        title: {type: new GraphQLNonNull(GraphQLString)},
        body: {type: GraphQLString},
        author: {
            type: AuthorType,
            resolve: function (post) {
                return _.find(Authors, a => a.id == post.author_id);
            }
        }
    })
});

const BlogQueryRootType = new GraphQLObjectType ({
    name: 'BlogAppSchema',
    description: "Blog Application Schema Query Root",
    fields: () => ({
        authors: {
            type: new GraphQLList(AuthorType),
            description: "List of all Authors",
            resolve: function () {
                return Authors
            }
        },
        posts: {
            type: new GraphQLList(PostType),
            description: "List of all posts",
            resolve: function () {
                return Posts
            }
        }
    })
});

const BlogAppSchema = new GraphQLSchema({
   query: BlogQueryRootType
});

module.exports = BlogAppSchema;