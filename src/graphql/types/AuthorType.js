
const { GraphQLString, GraphQLList, GraphQLObjectType, GraphQLNonNull, GraphQLSchema } = require('graphql');

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    description: "This represent an author",
    fields: () => ({
        id: {type: new GraphQLNonNull(GraphQLString)},
        name: {type: new GraphQLNonNull(GraphQLString)},
        email: {type: GraphQLString}
    })
});

module.exports = AuthorType;