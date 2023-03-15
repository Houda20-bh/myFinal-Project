const asyncHandler = require('express-async-handler')
const { Error, default: mongoose } = require('mongoose')
const myBlog= require('../model/blogModel')
const myUser= require('../model/userModel')
//@desc      Get posts(or blogs)
//@route     GET /api/blogs
//@access    Private
 const getBlogs = async (req, res) => {
    try {
     const  blogs = await myBlog.find().populate("user").sort({createdAt:-1});
     if (!blogs) {
      return res.status(404).json({ message: "No Blogs Found" });
    }
    return res.status(200).json(blogs);
    } 
    catch (error) {
      res.status(500).json(error);
    }
    };  

//@desc      Get a single post(or blog)
//@route     GET /api/blogs/:id
//@access    Private

const getBlog= asyncHandler(async (req,res)=>{
        const id = req.params.id
        const post = await myBlog.findById(id)
        if(!post)
        { res.status(400)
            throw new Error('no such a blog') }
    res.status(200).json(post)
})
//@desc      Create a post(or blog)
//@route     POST /api/blogs
//@access    Private

const setBlog= async (req,res)=>{
  const {id} =req.user
  const {title,description,image}=req.body
 try{
  const post= await myBlog.create({
    title,
    description,
    image,
    user: req.user.id,
    isEdited:false,
      })
      res.status(200).json(post);
 } 
 catch (error) {
  res.status(500).json(error);
}
}
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
    const getByUser= asyncHandler(async(req,res)=>{
        // const {id}=req.user;
        const userBlogs = await myBlog.find(({ user: req.user.id }))
        //  const userBlogs= await myUser.findById(id).populate("blogs")
        if(!userBlogs){
            res.status(500)
    throw new Error("no Blog Found for this user")
            
        }
        return res.status(200).json(userBlogs);
    
    })

module.exports={
    getBlogs,
    getBlog,
    setBlog,
    updateBlog,
    deleteBlog,
    getByUser,
}