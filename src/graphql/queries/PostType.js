const { GraphQLString, GraphQLObjectType, GraphQLNonNull } = require('graphql');
const Author = require('../../models/Author');
const AuthorType = require('./AuthorType');
const PostType = new GraphQLObjectType({
    name: 'PostType',
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

module.exports = PostType