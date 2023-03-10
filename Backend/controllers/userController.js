const jwt = require('jsonwebtoken')
const { validationResult } = require("express-validator");
const bcrypt = require ('bcryptjs')
const asyncHandler = require('express-async-handler')
const myUser = require('../model/userModel')

//@desc GetAllusers
//@route GET /api/users
//@access Public
const getAllusers = asyncHandler(async(req,res)=>{
  const users= await myUser.find();
  
  if (!users) {
    res.status(400)
    throw new Error('No users found')
  }
  res.status(200).json({users})
})
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
    const token = generateToken(user._id);
    res.status(201).json({user,token})
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
// @desc    Authenticate a user
// @route   POST /api/users/signin
// @access  Public
const signin = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  // Check for user email
  const user = await myUser.findOne({ email })
   if (!user){
    res.status(404)
  throw new Error('User does not exists')
   }
  if (user && (await bcrypt.compare(password, user.password))) {
    const token = generateToken(user._id)
    res.json({user,token})
  } else {
    res.status(400)
    throw new Error('Invalid credentials')
  }
})
// @desc    Get user data
// @route   GET /api/users/me
// @access  Private
const getme = asyncHandler(async (req, res) => {
  res.status(200).json(req.user)
})

// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: '30d',})
  }
  
module.exports={signup,signin,getme,getAllusers}