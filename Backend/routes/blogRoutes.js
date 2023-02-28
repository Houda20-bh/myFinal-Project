const express= require('express');
const router= express.Router()
const { getBlogs,getBlog,setBlog,updateBlog,deleteBlog}= require('../controllers/blogController')
const {protect} = require ('../middleware/authMiddleware')
router.route('/').get(protect,getBlogs).post(protect,setBlog)
// router.get('/',getBlogs)
// router.post('/',setBlog)

router.route('/:id').put(protect,updateBlog).delete(protect,deleteBlog).get(protect,getBlog)
// router.put('/:id',updateBlog)
//  router.delete('/:id',deleteBlog)
//router.get('/:id',getBlog)
module.exports=router