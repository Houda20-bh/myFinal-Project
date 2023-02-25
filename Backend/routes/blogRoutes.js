const express= require('express');
const router= express.Router()
const { getBlogs,setBlog,updateBlog,deleteBlog}= require('../controllers/blogController')

router.route('/').get(getBlogs).post(setBlog)
// router.get('/',getBlogs)
// router.post('/',setBlog)

router.route('/:id').put(updateBlog).delete(deleteBlog)
// router.put('/:id',updateBlog)
//  router.delete('/:id',deleteBlog)
module.exports=router