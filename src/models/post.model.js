const mongoose = require('mongoose');
const User = require("./user.model")

const postSchema = mongoose.Schema(
    {
        title:{
            type:String,
            required:true,
            immutable:true,
        },
        content:{
            type:String,
            required:false,
            immutable:false,
            default:null
        },
        author:{
            type: mongoose.Schema.ObjectId,
            ref:"User",
            required:true,
            immutable:true,
        },
        replies:[
            {
            type:mongoose.Schema.ObjectId,
            ref:'Post'
            }
        ]
    },
    {
        timestamps:true,
    }
)

const Post = mongoose.model("Post",postSchema);

module.exports = Post;