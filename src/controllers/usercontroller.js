const User = require('../models/user.model.js');
const bcrypt = require('bcrypt');
const saltRounds = 10

const getUser = async (req,res)=>{
  try {
    if (req.query){
    const users = await User.find(req.query,"username name");
    res.status(200).json(users);
    return
    }
    else{
      res.status(200).json(await User.find({},"username name"))
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createUser = async (req, res) => {
  try {
    const passwordHash = await bcrypt.hash(req.body.password,saltRounds);
    var user = await User.create({name:req.body.name,username:req.body.username,password:passwordHash});
    user = await User.findById(user.id,"-password");
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const login = async(req,res)=>{
  try{
    const user = await User.findOne({username:req.body.username});
    if (!user){
      res.status(403).json({message:"Incorrect login credentials"});
      return
    }
    const password = await bcrypt.compare(req.body.password,user.password)
    if (!password){
      res.status(403).json({message:"Incorrect login credentials"});
      return
    }
    res.status(200).json({success:true,message:`Successfully logged in as @${user.username}`});

  }
  catch(err){
    res.status(500).json({ message: error.message });
  }
}

const deleteUser = async(req,res)=>{  
  try{
    const user = await User.findOne({username:req.body.username});
    if (!user){
      res.status(403).json({message:"Incorrect login credentials"});
      return
    }
    const password = await bcrypt.compare(req.body.password,user.password)
    if (!password){
      res.status(403).json({message:"Incorrect login credentials"});
      return
    }
    await User.findByIdAndDelete(user.id)
    res.status(200).json({message:`Deleted ${user.name} (@${user.username})`});  
  }
  catch(err){
    res.status(500).json({ message: err.message });
}
}

const editUser = async (req,res)=>{
  try{
    const user = await User.findOne({username:req.body.username});
    if (!user){
      res.status(403).json({message:"Incorrect login credentials"});
      return
    }
    const password = await bcrypt.compare(req.body.password,user.password)
    if (!password){
      res.status(403).json({message:"Incorrect login credentials"});
      return
    }
    let newData = {};
    if(req.body.newpassword){newData.password = bcrypt.hash(req.body.newpassword,saltRounds);}
    if (req.body.newname){newData.name = req.body.newname}
    if (req.body.newusername){newData.username = req.body.newusername}
    await User.findByIdAndUpdate(user.id,newData);
    res.status(200).json({message:"Successfully updated credentials"});
  }
  catch (err){
    res.status(500).json({ message: err.message });
  }
}


module.exports={
  getUser,createUser,login,deleteUser,editUser
}