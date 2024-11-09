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
            immutable:true
        },
        author:{
            type: mongoose.Schema.ObjectId,
            ref:User.name,
            required:true,
            immutable:true,
        },
        replies:[mongoose.Schema.ObjectId],
    },
    {
        timestamps:true,
    }
)

const Post = mongoose.model("Post",postSchema);

module.exports = Post;