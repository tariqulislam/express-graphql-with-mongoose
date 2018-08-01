var {GraphQLNonNull, GraphQLString} = require('graphql')
var Post = require('../../models/Post');
var PostType = require('../queries/PostType');

const createPost = {
    type: PostType,
    args: {
        title: {
            name: "title",
            type: new GraphQLNonNull(GraphQLString)
        },
        author_id: {
            name: "author_id",
            type: new GraphQLNonNull(GraphQLString)
        },
        body: {
            name: "body",
            type: new GraphQLNonNull(GraphQLString)
        }
    },
    resolve: async function(root, param) {
        const postModel = new Post(param);
        const savePost = await postModel.save();
        if(!savePost) {
            throw new Error('Error')
        }
        return savePost;
    }
}

const updatePost = {
    type: PostType,
    args: {
        _id: {
            name: "_id",
            type: new GraphQLNonNull(GraphQLString)
        },
        author_id: {
            name: "author_id",
            type: GraphQLString
        },
        title: {
            name: "title",
            type: GraphQLString
        },
        body: {
            name: "body",
            type: GraphQLString
        }
    },
    resolve: async function (root, param) {
       let updatePost = {};
       if(param.author_id) {
           updatePost.author_id = param.author_id;
       }

       if(param.title) {
           updatePost.title = param.title
       }

       if(param.body) { 
           updatePost.body = param.body
        }

        const updatePostInfo = await Post.findByIdAndUpdate(param._id,updatePost,{new: true});

        if(!updatePostInfo) {
            throw new Error('Error');
        }
        return updatePostInfo;
    }
}

const deletePost = {
    type: PostType,
    args: {
        _id: {
            name: "_id",
            type: new GraphQLNonNull(GraphQLString)
        }
    },
    resolve: async function (root, param) {
        const deletePost = await Post.findByIdAndRemove(param._id);
        if(deletePost) {
            throw new Error('Error');
        }
        return deletePost;
    }
}

module.exports = {createPost, updatePost, deletePost}