const express = require("express");
const router = express.Router();
const {
  getBlogs,
  getBlog,
  setBlog,
  updateBlog,
  deleteBlog,
} = require("../controllers/blogController");
const { protect } = require("../middleware/authMiddleware");

router.get("/", getBlogs);
router.get("/:id", protect, getBlog);
router.post("/", protect, setBlog);
router.put("/:id", protect, updateBlog);
router.delete("/:id", protect, deleteBlog);

module.exports = router;