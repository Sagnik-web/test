const express = require('express');
const { createPost, getPosts, getPost, likePost, unlikePost, deletePost, getUserPost } = require('../Controller/post.controller');
const { protectAuth } = require('../middleware/protect');
const postRouter = express.Router();





postRouter.post('/',protectAuth, createPost);
postRouter.get('/', getPosts);
postRouter.get('/user/all',protectAuth, getUserPost);
postRouter.get('/:id', getPost);
postRouter.patch('/:id/like', protectAuth,likePost);
postRouter.patch('/:id/unlike', protectAuth, unlikePost);
postRouter.delete('/:id',protectAuth ,deletePost);






module.exports = postRouter;
