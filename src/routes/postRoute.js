const express = require("express");
const post = require("../models/post.model");
const router = express.Router();
const {getPosts, createPost, deletePost, editPost, getPostsFromAuthor} = require('../controllers/postcontroller');


router.get("/", getPosts);

router.post("/", createPost);

router.delete("/",deletePost)

router.post("/:id",editPost)

router.get("/:id",getPostsFromAuthor)

module.exports = router;