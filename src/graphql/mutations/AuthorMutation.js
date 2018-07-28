var {GraphQLNonNull, GraphQLString} = require('graphql');
var AuthorType = require('../queries/AuthorType');
var Author = require('../../models/Author')


const addAuthor = {
    type: AuthorType,
    args: {
        name: {
            name: 'name',
            type: new GraphQLNonNull(GraphQLString)
        },
        email: {
            name: 'email',
            type: new GraphQLNonNull(GraphQLString)
        }
    },
    resolve: async function (root, params) {
        const uModel = new Author(params);
        const newAuthor = await uModel.save();
        if(!newAuthor) {
            throw new Error('Error')
        }
        return newAuthor
    }
}

const updateAuthor = {
    type: AuthorType,
    args: {
        id: {
            name: 'id',
            type: new GraphQLNonNull(GraphQLString)
        },
        name: {
            name: 'name',
            type: new GraphQLString()
        },
        email: {
            name: 'email',
            type: new GraphQLString()
        }
    },
    resolve: async function(root, param) {


    }
}

const deleteAuthor = {
    type: AuthorType,
    args: {
        id: {
            name: 'id',
            type: new GraphQLNonNull(GraphQLString)
        }
    },
    resolve: async function (root, param) {

    }
}
module.exports = {addAuthor, updateAuthor, deleteAuthor}