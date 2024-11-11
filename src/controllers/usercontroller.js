const User = require('../models/user.model.js');

const getUser = async (req,res)=>{
  try {
    if (req.query){
    const users = await User.find(req.query);
    res.status(200).json(users);
    return
    }
    else{
      res.status(200).json(await User.find({}))
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createUser = async (req, res) => {
  console.log(req.body)
  try {
    const user = await User.create(req.body);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const login = async(req,res)=>{
  try{
    const user = await User.findOne({username:req.body.username,password:req.body.password});
    if (!user){
      res.status(403).json({message:"Incorrect login credentials"});
    }
    else{
      res.status(200).json({message:`Logged in as ${user.name} (@${user.username})`});
    }
  }
  catch(err){
    res.status(500).json({ message: error.message });
  }
}

const deleteUser = async(req,res)=>{  
  try{
    const user = await User.findOne({username:req.body.username,password:req.body.password});
    if (!user){
      res.status(403).json({message:"Incorrect login credentials"});
    }
    else{
      console.log(user.id)
      await User.findByIdAndDelete(user.id)
      res.status(200).json({message:`Deleted ${user.name} (@${user.username})`});
    }
  }
  catch(err){
    res.status(500).json({ message: err.message });
}
}

const editUser = async (req,res)=>{
  try{
    const user = await User.findOne({username:req.body.username,password:req.body.password});
    if (!user){
      res.status(403).json({message:"Incorrect login credentials"});
      return
    }
    await User.findByIdAndUpdate(user.id,{username:req.body.newusername,name:req.body.newname,password:req.body.newpassword});
    res.status(200).json({message:"Successfully updated credentials"});
  }
  catch (err){
    res.status(500).json({ message: err.message });
  }
}


module.exports={
  getUser,createUser,login,deleteUser,editUser
}