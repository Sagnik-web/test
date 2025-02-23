const mongoose = require('mongoose')


const postSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    desc:{
        type:String,
        required:true
    },
    user:{
        type:mongoose.Types.ObjectId,
        ref:'users'
    },
    likes:[{
        type:mongoose.Types.ObjectId,
        ref:'users'
    }]
},{timestamps:true})



const Post = mongoose.model('posts',postSchema)


module.exports = Post
