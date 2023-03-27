const asyncHandler = require("express-async-handler");
const { Error, default: mongoose } = require("mongoose");
const myBlog = require("../model/blogModel");

//@desc      Get posts(or blogs)
//@route     GET /api/blogs
//@access    Public
const getBlogs = async (req, res) => {
  const { page } = req.query;
  try {

      const limit = 4;
      const startIndex = (Number(page) - 1) * limit;
      const total = await myBlog.countDocuments({});
      const blogs = await myBlog.find().limit(limit).skip(startIndex).populate('user');
      res.json({
        data: blogs,
        currentPage: Number(page),
        totalBlogs: total,
        numberOfPages: Math.ceil(total / limit),
      });

  } 
  catch (error) {
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
  const { title, description, image,isEdited,date } = req.body;
  try {
    const post = await myBlog.create({
      title,
      description,
      image,
      user: id,
      isEdited,
      date:new Date(`${date}`),
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
 const SearchBlog = async (req, res) => {
  const {searchQuery} = req.query;
  try {
    const title = new RegExp(searchQuery, "i");
    const Blogs = await myBlog.find({ title });
    res.json(Blogs);
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
};
const likeBlog = async (req, res) => {
   const { id } = req.params;
  try {
    if (!req.userId) {
      return res.json({ message: "User is not authenticated" });
    }

    const Blog = await myBlog.findById(id);

    const index = Blog.likes.findIndex((id) => id === String(req.userId));

    if (index === -1) {
      Blog.likes.push(req.userId);
    } else {
      Blog.likes = Blog.likes.filter((id) => id !== String(req.userId));
    }
    const updatedBlog=  await myBlog.findByIdAndUpdate(id,Blog,{new:true})
    res.status(200).json(updatedBlog);
  } catch (error) {
  res.status(404).json({ message: error.message });
}
  };


module.exports = {
  getBlogs,
  getBlog,
  setBlog,
  updateBlog,
  deleteBlog,
  SearchBlog,
  likeBlog,
};