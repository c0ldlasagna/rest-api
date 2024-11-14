const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
    name:{
        type:String,
        required:true,
        minlength:[3,`Name too short.`],
        maxlength:[32,`Name too long.`]
    },
    username:{
        type:String,
        required: true,
        unique: true,
        minlength:[3,`Userame too short.`],
        maxlength:[32,`Username too long.`]
    },
    password:{
        type:String,
        required:true
    }
    }
)

const User = mongoose.model("User",userSchema);

module.exports = User;