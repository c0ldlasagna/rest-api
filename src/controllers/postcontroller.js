const Post = require('../models/post.model.js');
const User = require('../models/user.model.js');
const bcrypt = require('bcrypt');

const getPosts = async (req,res)=>{
  try {
    if (req.query){
    const posts = await Post.find(req.query).populate({path:'author',select:"name username"});
    res.status(200).json({success:true,data:posts});
    }
    else{
      const posts = await Post.find({}).populate({path:'author',select:"name username"});
      res.status(200).json({success:true,data:posts});
    }
  } catch (error) {
    res.status(500).json({ success:false,message: error.message });
  }
};
const createPost = async (req, res) => {
  try {
    const user = await User.findOne({username:req.body.username});
    if (!user){
      res.status(403).json({success:false,message:"Incorrect login credentials"});
      return
    }
    const password = await bcrypt.compare(req.body.password,user.password)
    if (!password){
      res.status(403).json({success:"false",success:false,message:"Incorrect login credentials"});
      return
    }
    if(req.params.parentID){
      const post = await Post.create({title:req.body.title,content:req.body.content,author:user.id});
      if (post){
      const parentPost = await Post.findById(req.params.parentID);
      parentPost.replies.push(post.id);
      await parentPost.save();
      res.status(200).json({sucess:true,data:post});
      return
      }
      else{
        res.status(404).json({success:false,success:false,message:'Post does not exist'});
        return
      }
    }
    const post = await Post.create({title:req.body.title,content:req.body.content,author:user.id});
    res.status(200).json({success:true,data:post});
   }
  catch (error) {
    res.status(500).json({ success:false,message: error.message });
  }
};

const deletePost = async (req,res)=>{
  try{
    const user = await User.findOne({username:req.body.username});
    if (!user){
      res.status(403).json({success:false,message:"Incorrect login credentials"});
      return
    }
    const password = await bcrypt.compare(req.body.password,user.password)
    if (!password){
      res.status(403).json({success:false,message:"Incorrect login credentials"});
      return
    }
    const post = await Post.findById(req.params.id);
    if (!post){
      res.status(404).json({success:false,message:"Post not found"})
      return
    }
    if (post.author == user.id){
        await Post.findByIdAndDelete(post.id)
        res.status(200).json({success:false,message:`Deleted ${post.title} by @${user.username}`});
    }
    else{
      res.status(403).json({success:false,message:"You do not have permission to delete this post."});
    }
  }
  catch(error){
    res.status(500).json({success:false,message:error.message});
  }
}

const editPost = async (req,res)=>{
  try{
    const user = await User.findOne({username:req.body.username});
    if (!user){
      res.status(403).json({success:false,message:"Incorrect login credentials"});
      return
    }
    const password = await bcrypt.compare(req.body.password,user.password)
    if (!password){
      res.status(403).json({success:false,message:"Incorrect login credentials"});
      return
    }
    const post = await Post.findById(req.params.id)
    if (!post){
      res.status(404).json({success:false,message:"Post not found"})
      return
    }
    if (post.author == user.id){
        await Post.findByIdAndUpdate(post.id,{content:req.body.content});
        res.status(200).json({success:false,message:`Edited ${post.title} by @${user.username}`});
    }
    else{
      res.status(403).json({success:false,message:"You do not have permission to edit this post."});
    }
  }
  catch(error){
    res.status(500).json({sucess:false,error:error.message})
  }
}


module.exports={
  getPosts,createPost,deletePost,editPost
}