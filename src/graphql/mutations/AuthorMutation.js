var {GraphQLNonNull, GraphQLString} = require('graphql');
var AuthorType = require('../queries/AuthorType');
var Author = require('../../models/Author')
var mongoose = require('mongoose')

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
       let updateAuthor = {};
       if(!param.name) {
           updateAuthor.name = param.name
       }
       if(!param.email) {
           updateAuthor.email = param.email
       }

       const uAuthor = await Author.update({id: mongoose.Types.ObjectId(param.id)}, {$set: updateAuthor})
       if(!uAuthor) {
           return {output: 'error', message: 'unable to update author information', author: null};
       }

       return {output: 'success', message: 'Author Information Update Successfully.', author: uAuthor};

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
      let delAuthor = await Author.findByIdAndRemove(mongoose.Types.ObjectId(param.id));
      if(!delAuthor) {
        return {output: 'error', message: 'unable to delete author information', author: null};
    }

    return {output: 'success', message: 'Author Information delete Successfully.', author: delAuthor};

    }
}
module.exports = {addAuthor, updateAuthor, deleteAuthor}