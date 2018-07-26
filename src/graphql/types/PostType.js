const { GraphQLString, GraphQLObjectType, GraphQLNonNull } = require('graphql');


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
