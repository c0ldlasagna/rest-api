const Post = require('../models/post.model.js');

const getPost = async (req,res)=>{
  try {
    const posts = await Post.find({});
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createPost = async (req, res) => {
  try {
    const post = await Post.create(req.body);
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports={
  getPost,createPost
}