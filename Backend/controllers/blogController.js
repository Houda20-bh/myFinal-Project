const asyncHandler = require("express-async-handler");
const { Error, default: mongoose } = require("mongoose");
const myBlog = require("../model/blogModel");

//@desc      Get posts(or blogs)
//@route     GET /api/blogs
//@access    Public
const getBlogs = async (req, res) => {
  try {
    const blogs = await myBlog.find().sort({ createdAt: -1 }).populate('user');
    if (!blogs) {
      return res.status(404).json({ message: "No Blogs Found" });
    }
    return res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json(error);
  }
};

//@desc      Get a single post(or blog)
//@route     GET /api/blogs/:id
//@access    Private

const getBlog = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const post = await myBlog.findById(id);
  if (!post) {
    res.status(400);
    throw new Error("no such a blog");
  }
  res.status(200).json(post);
});
//@desc      Create a post(or blog)
//@route     POST /api/blogs
//@access    Private

const setBlog = async (req, res) => {
  const { id } = req.user;
  const { title, description, image,isEdited } = req.body;
  try {
    const post = await myBlog.create({
      title,
      description,
      image,
      user: id,
      isEdited,
    });
    res.status(200).json({post});
  } catch (error) {
    res.status(500).json(error);
  }
};
//@desc      Update a post(or blog)
//@route     PUT /api/blogs/:id
//@access    Private
const updateBlog = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedBlog = await myBlog.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true }
    );
    res.status(200).json(updatedBlog);
  } catch (error) {
    res.status(500).json(error);
  }
};
//@desc      Delete a post(or blog)
//@route    DELETE /api/blogs/:id
//@access    Private

const deleteBlog = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    await myBlog.findByIdAndRemove(id);
    res.json({message:'blog deleted successfuly'});
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = {
  getBlogs,
  getBlog,
  setBlog,
  updateBlog,
  deleteBlog,
};