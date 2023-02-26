const asyncHandler = require('express-async-handler')
const { Error } = require('mongoose')
const myBlog= require('../model/blogModel')
//@desc      Get posts(or blogs)
//@route     GET /api/blogs
//@access    Private

const getBlogs= asyncHandler(async (req,res)=>{
    const posts= await myBlog.find()
    res.status(200).json(posts)
})
//@desc      Create a post(or blog)
//@route     POST /api/blogs
//@access    Private

const setBlog= asyncHandler(async (req,res)=>{
    if (!req.body.text) {
        res.status(400)
        throw new Error('Please add a text field')
      }
      const post= await myBlog.create({
        text:req.body.text,
      })
    res.status(200).json(post)
})
//@desc      Update a post(or blog)
//@route     PUT /api/blogs/:id
//@access    Private

const updateBlog= asyncHandler(async (req,res)=>{
   const blog = await myBlog.findById(req.params.id)
   if (!blog){
    res.status(400)
    throw new Error('Post not found lol')
   }
   const updatedBlog= await myBlog.findByIdAndUpdate(req.params.id,req.body,{new:true})

    res.status(200).json(updatedBlog)
})
//@desc      Delete a post(or blog)
//@route    DELETE /api/blogs/:id
//@access    Private

const deleteBlog= asyncHandler(async(req,res)=>{
  
    const blog = await myBlog.findById(req.params.id)
    if (!blog){
     res.status(400)
     throw new Error('Post not found lol')
    }
     await myBlog.remove()
    res.status(200).json({id:req.params.id})
})
module.exports={
    getBlogs,
    setBlog,
    updateBlog,
    deleteBlog,
}