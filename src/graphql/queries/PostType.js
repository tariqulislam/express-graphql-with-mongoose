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
            return authors
        }}
    })
});

module.exports = PostType