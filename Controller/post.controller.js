const Post = require('../Model/Post');
const User = require('../Model/User');



// Create a post
exports.createPost = async (req, res) => {
    try {
        const { title, desc } = req.body;
        const newPost = new Post({
            title,
            desc,
            user:req.user
        });

        const savedPost = await newPost.save();
        res.status(201).json({
            success:true,
            post:savedPost
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ 
            success:false,
            msg: 'Error creating post' 
        });
    }
};

// Get all posts
exports.getPosts = async (req, res) => {
    try {
        const posts = await Post.find().populate('user', 'name'); // Populate user field
        res.status(200).json({
            success:true,
            posts
        });
    } catch (error) {
        // console.error(error);
        res.status(500).json({ 
            success:false,
            msg: 'Error fetching posts' 
        });
    }
};

// Get a single post
exports.getPost = async (req, res) => {
    try {
        const postId = req.params.id;
        const post = await Post.findById(postId).populate('user', 'name');
        
        if (!post) {
            return res.status(404).json({ 
                success:false,
                msg: 'Post not found' 
            });
        }

        res.status(200).json({
            success:true,
            post
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ 
            success:false,
            msg: 'Error fetching post' 
        });
    }
};

// Like a post
exports.likePost = async (req, res) => {
    try {
        const postId = req.params.id;
        const userId = req.user;

        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ 
                success:false,
                msg: 'Post not found' 
            });
        }

        if (post.likes.includes(userId)) {
            return res.status(400).json({
                success:false,
                msg: 'User has already liked this post' 
            });
        }

        post.likes.push(userId);
        const updatedPost = await post.save();
        res.status(200).json({
            success:true,
            post:updatedPost

        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success:false,
             msg: 'Error liking post' 
        });
    }
};

// Unlike a post
exports.unlikePost = async (req, res) => {
    try {
        const postId = req.params.id;
        const userId = req.user;


        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({
                success:false,
                msg: 'Post not found' 
            });
        }

        if (!post.likes.includes(userId)) {
            return res.status(400).json({
                success:false,
                msg: 'User has not liked this post' 
            });
        }

        post.likes.pull(userId);
        const updatedPost = await post.save();



        res.status(200).json({
            success:true,
            post:updatedPost

        });
    } catch (error) {
        // console.error(error);
        res.status(500).json({
            success:false,
            msg: 'Error unliking post' 
        });
    }
};

// Delete a post
exports.deletePost = async (req, res) => {
    try {
        const postId = req.params.id;
        const post = await Post.findById(postId);

        if (!post) {
            return res.status(404).json({
                success:false,
                msg: 'Post not found' 
            });
        }

        if(post.user != req.user){
            return res.status(400).json({
                success:false,
                msg: 'user has no access to delete.' 
            });
        }

        await post.deleteOne();
        res.status(200).json({
            success:true,
            msg: 'Post deleted successfully' 
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success:false,
            msg: 'Error deleting post'
         });
    }
};



exports.getUserPost = async(req,res)=>{
    const userID = req.user

    try{
        const post = await Post.find({user:userID})
        if(!post){
            return res.status(404).json({ 
                success:false,
                msg: 'Post not found' 
            });
        }

        res.status(200).json({
            success:true,
            post
        });

    }catch(error){
        res.status(500).json({
            success:false,
            msg: 'Error Get post'
         });
    }
}



