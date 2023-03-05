const jwt = require('jsonwebtoken')
const bcrypt = require ('bcryptjs')
const asyncHandler = require('express-async-handler')
const myUser = require('../model/userModel')
const { Error } = require('mongoose')

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
const signup = asyncHandler(async(req,res)=>{
const { email, password ,firstName, lastName } = req.body

if (!firstName ||!lastName || !email || !password ) {
  res.status(400)
  throw new Error('Please add all fields')
}

// Check if user exists
const userExists = await myUser.findOne({ email })

if (userExists) {
  res.status(400)
  throw new Error('User already exists')
}

// Hash password
const salt = await bcrypt.genSalt(12)
const hashedPassword = await bcrypt.hash(password, salt)

// Create user
const user = await myUser.create({
  email,
  password: hashedPassword,
  name: `${firstName} ${lastName}`,
  blogs:[]
})
const token = generateToken(user._id)
if (user) {
  res.status(201).json({user,token})
} else {
  res.status(400)
  throw new Error('Invalid user data')
}
})
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