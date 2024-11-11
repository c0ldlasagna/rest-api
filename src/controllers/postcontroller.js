const Post = require('../models/post.model.js');
const User = require('../models/user.model.js');

const getPosts = async (req,res)=>{
  try {
    console.log(req.query)
    if (req.query){
    const posts = await Post.find(req.query).populate({path:'author',select:"name username"});
    res.status(200).json(posts);
    }
    else{
      const posts = await Post.find({}).populate({path:'author',select:"name username"});
      res.status(200).json(posts);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const createPost = async (req, res) => {
  try {
    const user = await User.findOne({username:req.body.username,password:req.body.password});
    if (!user){
      res.status(403).json({message:"Incorrect Login Credentials"})
      return
    }
    if(req.params.parentID){
      const post = await Post.create({title:req.body.title,content:req.body.content,author:user.id});
      if (post){
      const parentPost = await Post.findById(req.params.parentID);
      parentPost.replies.push(post.id);
      await parentPost.save();
      res.status(200).json(post);
      return
      }
      else{
        res.status(404).json({message:'Post does not exist'});
        return
      }
    }
    const post = await Post.create({title:req.body.title,content:req.body.content,author:user.id});
    res.status(200).json(post);
   }
  catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deletePost = async (req,res)=>{
  try{
    const user = await User.findOne({username:req.body.username,password:req.body.password});
    if (!user){
      res.status(403).json({message:"Incorrect Login Credentials"});
      return
    }
    const post = await Post.findById(req.params.id);
    if (!post){
      res.status(404).json({message:"Post not found"})
      return
    }
    if (post.author == user.id){
        await Post.findByIdAndDelete(post.id)
        res.status(200).json({message:`Deleted ${post.title} by @${user.username}`});
    }
    else{
      res.status(403).json({message:"You do not have permission to delete this post."});
    }
  }
  catch(error){
    res.status(500).json({message:error.message});
  }
}

const editPost = async (req,res)=>{
  try{
    const user = await User.findOne({username:req.body.username,password:req.body.password});
    if (!user){
      res.status(403).json({message:"Incorrect Login Credentials"});
      return
    }
    const post = await Post.findById(req.params.id)
    if (!post){
      res.status(404).json({message:"Post not found"})
      return
    }
    if (post.author == user.id){
        await Post.findByIdAndUpdate(post.id,{content:req.body.content});
        res.status(200).json({message:`Edited ${post.title} by @${user.username}`});
    }
    else{
      res.status(403).json({message:"You do not have permission to edit this post."});
    }
  }
  catch(error){
    res.status(500).json({error:error.message})
  }
}


module.exports={
  getPosts,createPost,deletePost,editPost
}