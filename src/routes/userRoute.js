const express = require("express");
const User = require("../models/user.model");
const router = express.Router();
const {getUsers, getUser, createUser, updateUser, deleteUser} = require('../controllers/usercontroller');

router.get("/", getUser);

router.post("/", createUser);

module.exports = router;