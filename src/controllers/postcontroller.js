const Post = require('../models/post.model.js');

const getPosts = async (req,res)=>{
  try {
    const posts = await Post.find({});
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getPostsFromAuthor = async (req,res)=>{
  try{
    const posts = await Post.find({author:req.params.author})
    res.status(200).json(posts)
  }
  catch (err){
    res.status(500).json({message:err.message})
  }
}
const createPost = async (req, res) => {
  try {
    const post = await Post.create(req.body);
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deletePost = async (req,res)=>{
  try{
    const post = await Post.findByIdAndDelete(req.params);
    if (!post){
      res.status(404).json({message:"Post not found"})
    }
    else{
      res.status(200).json({message:"Post deleted"});
    }
  }
  catch(error){
    res.status(500).json({message:error.message});
  }
}

const editPost = async (req,res)=>{
  try{
    const post = await Post.find({title:req.params})
    if (!post){
      res.status(404).json({message:"Post not found."})
    }
    else{
      post.content = req.body
      res.status(200).json({message:"Successfully edited post.",post})
    }
  }
  catch(error){
    res.status(500).json({error:error.message})
  }
}


module.exports={
  getPosts,createPost,deletePost,editPost, getPostsFromAuthor
}