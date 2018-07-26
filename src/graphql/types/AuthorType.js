
const { GraphQLString, GraphQLObjectType, GraphQLNonNull } = require('graphql');

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    description: "This represent an author",
    fields: () => ({
        _id: {type: new GraphQLNonNull(GraphQLString)},
        name: {type: new GraphQLNonNull(GraphQLString)},
        email: {type: GraphQLString}
    })
});

module.exports = AuthorType;