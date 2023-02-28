const express= require('express');
const router= express.Router()
const { getBlogs,getBlog,setBlog,updateBlog,deleteBlog}= require('../controllers/blogController')

router.route('/').get(getBlogs).post(setBlog)
// router.get('/',getBlogs)
// router.post('/',setBlog)

router.route('/:id').put(updateBlog).delete(deleteBlog).get(getBlog)
// router.put('/:id',updateBlog)
//  router.delete('/:id',deleteBlog)
//router.get('/:id',getBlog)
module.exports=router