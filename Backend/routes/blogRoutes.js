const express = require("express");
const router = express.Router();
const {
  getBlogs,
  getBlog,
  setBlog,
  updateBlog,
  deleteBlog,
  SearchBlog,
  likeBlog ,
} = require("../controllers/blogController");
const { protect } = require("../middleware/authMiddleware");
router.get("/search", SearchBlog);
router.get("/", getBlogs);
router.get("/:id", getBlog);
router.post("/", protect, setBlog);
router.put("/:id", protect, updateBlog);
router.patch("/like/:id", protect,likeBlog);
router.delete("/:id", protect, deleteBlog);
router.get("/search", SearchBlog);

module.exports = router;