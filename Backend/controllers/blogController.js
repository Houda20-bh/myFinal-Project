const asyncHandler = require('express-async-handler')
//@desc      Get posts(or blogs)
//@route     GET /api/blogs
//@access    Private

const getBlogs= asyncHandler(async (req,res)=>{
    res.status(200).json({message:'get posts'})
})
//@desc      Create a post(or blog)
//@route     POST /api/blogs
//@access    Private

const setBlog= asyncHandler(async (req,res)=>{
    if (!req.body.text) {
        res.status(400)
        throw new Error('Please add a text field')
      }
    res.status(200).json({message:'set post'})
})
//@desc      Update a post(or blog)
//@route     PUT /api/blogs/:id
//@access    Private

const updateBlog= asyncHandler(async (req,res)=>{
    res.status(200).json({message:`update a post ${req.params.id}`})
})
//@desc      Delete a post(or blog)
//@route    DELETE /api/blogs/:id
//@access    Private

const deleteBlog= asyncHandler(async(req,res)=>{
  
    res.status(200).json({message:`remove a post ${req.params.id}`})
})
module.exports={
    getBlogs,
    setBlog,
    updateBlog,
    deleteBlog,
}