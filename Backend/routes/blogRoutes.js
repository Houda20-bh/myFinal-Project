const express= require('express');
const router= express.Router()
const { getBlogs,getBlog,setBlog,updateBlog,deleteBlog,getByUserId}= require('../controllers/blogController')
const {protect} = require ('../middleware/authMiddleware')
router.route('/').get(getBlogs).post(protect,setBlog)
// router.get('/',getBlogs)
// router.post('/',setBlog)

router.route('/:id').put(protect,updateBlog).delete(protect,deleteBlog).get(protect,getBlog)
// router.put('/:id',updateBlog)
//  router.delete('/:id',deleteBlog)
//router.get('/:id',getBlog)
router.get('/user/:id',protect,getByUserId)
module.exports=router