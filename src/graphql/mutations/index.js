var { addAuthor, updateAuthor, deleteAuthor } = require('./AuthorMutation');
var { createPost, updatePost, deletePost} = require('./PostMutation')

module.exports = {
    addAuthor,
    updateAuthor,
    deleteAuthor,
    createPost,
    updatePost,
    deletePost
}