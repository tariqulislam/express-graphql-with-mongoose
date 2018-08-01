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