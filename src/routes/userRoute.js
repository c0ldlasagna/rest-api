const express = require("express");
const User = require("../models/user.model");
const router = express.Router();
const {getUsers, getUser, createUser, updateUser, deleteUser, login, editUser} = require('../controllers/usercontroller');
const { editPost } = require("../controllers/postcontroller");

router.get("/", getUser);

router.post("/signup", createUser);

router.post("/login",login);

router.delete("/",deleteUser);

router.put("/",editUser);

module.exports = router;