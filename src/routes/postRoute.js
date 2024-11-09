const express = require("express");
const post = require("../models/post.model");
const router = express.Router();
const {getPost, createPost} = require('../controllers/postcontroller');


router.get("/", getPost);

router.post("/", createPost);

module.exports = router;