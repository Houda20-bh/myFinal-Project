const jwt = require('jsonwebtoken')
const { validationResult } = require("express-validator");
const bcrypt = require ('bcryptjs');
const myUser = require('../model/userModel')

//@desc GetAllusers
//@route GET /api/users
//@access Public
const getAllusers = async(req,res)=>{
  try {
    // validation from the req
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(402).json({ errors: errors.mapped() });
    }
  const users= await myUser.find();
  if (!users) {
    return res.status(402).json({ message: "No users found" });
  }
  res.status(200).json(users)
}
catch (error) {
  res.status(500).json({ message: error });
}
};
//@desc Signup a new user
//@route POST /api/users
//@access Public
const signup = async(req,res)=>{
  try {
    // validation from the req
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(402).json({ errors: errors.mapped() });
    }
    // Verify the existance of the account
    const { firstName, lastName,email, password } = req.body;

    const existUser= await myUser.findOne({ email });
    if (existUser) {
      return res.status(401).json({ message: "You have already registred" });
    }
    // Create new user 
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await myUser.create({
      name: `${firstName} ${lastName}`,
      email,
      password: hashedPassword,
    });
    if (user) {
      res.status(201).json({
        _id: user.id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      })} 
     } catch (error) {
    res.status(500).json(error);
  }
};
// @desc    Authenticate a user
// @route   POST /api/users/signin
// @access  Public
const signin = async (req, res) => {
  try {
    // validation from the req
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(402).json({ errors: errors.mapped() });
    }
  // Check for user email (user exist or no)
  const {email,password}= req.body;
  const user = await myUser.findOne({ email })
  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    })}
    else {
      return res.status(402).json({ message: "You have to register" });
     }
// // check password
// const isCorrectPassword = await bcrypt.compare(password,user.password)
//    if(!isCorrectPassword)
//    {return res.status(403).json({ message: "Invalid credentials" });}
// //Generate token for user
// const token = generateToken(user._id)
//    res.status(200).json(user,token)
// }
    }
    catch (error) {
      res.status(500).json(error);
    }
  };
// })
// @desc    Get user data
// @route   GET /api/users/me
// @access  Private
const getme = async (req, res) => {
  try {
    // validation from the req
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(402).json({ errors: errors.mapped() });
    }
  res.status(200).json(req.user)
}
catch (error) {
  res.status(500).json({ message: error });
}
};

// Generate JWT
const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
      expiresIn: '30d',})
  }
  
module.exports={signup,signin,getme,getAllusers}