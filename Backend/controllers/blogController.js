const asyncHandler = require('express-async-handler')
const { Error, default: mongoose } = require('mongoose')
const myBlog= require('../model/blogModel')
const myUser= require('../model/userModel')
//@desc      Get posts(or blogs)
//@route     GET /api/blogs
//@access    Private

const getBlogs= asyncHandler(async (req,res)=>{
    const posts= await myBlog.find().populate("user").sort({createdAt:-1})
    res.status(200).json(posts)
})
//@desc      Get a single post(or blog)
//@route     GET /api/blogs/:id
//@access    Private

const getBlog= asyncHandler(async (req,res)=>{
    const {id}= req.params
    if(!mongoose.Types.ObjectId.isValid(id))
    { res.status(400)
        throw new Error('no such a blog')}
        const post = await myBlog.findById(id)
        if(!post)
        {
            res.status(400)
            throw new Error('no such a blog') 
        }
    res.status(200).json(post)
})
//@desc      Create a post(or blog)
//@route     POST /api/blogs
//@access    Private

const setBlog= asyncHandler(async (req,res)=>{
    const {title,description, image,user}=req.body
   const existUser = await myUser.findById(user)
   if(!existUser){
    res.status(400)
    throw new Error('Unable to find a user')
   }
const post= await myBlog.create({
    title,
    description,
    user,
    image,
      })
      const session = await mongoose.startSession()
      session.startTransaction();
      await post.save({session});
      existUser.blogs.push(post);
      await existUser.save({session});
      await session.commitTransaction();
    res.status(200).json(post)
})
//@desc      Update a post(or blog)
//@route     PUT /api/blogs/:id
//@access    Private

const updateBlog= asyncHandler(async (req,res)=>{
    const id = req.params.id
   const blog = await myBlog.findById(id)
   if (!blog){
    res.status(400)
    throw new Error('Post not found lol')
   }
   //check for user
   if(!req.user){
    res.status(401)
    throw new Error('User not found lol')

   }
   // make sure the logged in user matches the blog user
   if(blog.user.toString() !== req.user.id)
   { res.status(401)
    throw new Error('User not authorized')}

   const updatedBlog= await myBlog.findByIdAndUpdate(req.params.id,{...req.body},{new:true})

    res.status(200).json(updatedBlog)
})
//@desc      Delete a post(or blog)
//@route    DELETE /api/blogs/:id
//@access    Private

const deleteBlog= asyncHandler(async(req,res)=>{
    const id=req.params.id;
      const blog = await myBlog.findByIdAndRemove(id).populate("user");
         await blog.user.blogs.pull(blog);
         await blog.user.save();
    if(!blog){
    res.status(500)
    throw new Error('no post to delete')
    }
    return res.status(200).json({message:"Successfully Delete"}) })
 //@desc      Get all blogs for a  specific user
//@route     GET /api/blogs/user/:id
//@access    Private
    // 
    const getByUserId= asyncHandler(async(req,res)=>{
        const {id}=req.params;
         const    userBlogs= await myBlog.find({user:id})
        if(!userBlogs){
            res.status(500)
    throw new Error("no Blog Found for this user")
            
        }
        return res.status(200).json({userBlogs});
    
    })

module.exports={
    getBlogs,
    getBlog,
    setBlog,
    updateBlog,
    deleteBlog,
    getByUserId,
}