const express = require("express");
const post = require("../models/post.model");
const router = express.Router();
const {getPosts, createPost, deletePost, editPost, getPostsFromAuthor} = require('../controllers/postcontroller');


router.get("/", getPosts);

router.post("/:parentID?", createPost);

router.delete("/:id",deletePost)

router.put("/:id",editPost);

module.exports = router;