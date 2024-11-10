const express = require("express");
const User = require("../models/user.model");
const router = express.Router();
const {getUsers, getUser, createUser, updateUser, deleteUser, login} = require('../controllers/usercontroller');

router.get("/", getUser);

router.post("/signup", createUser);

router.post("/login",login);

router.delete("/",deleteUser)

module.exports = router;