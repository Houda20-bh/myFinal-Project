const express = require('express')
const router = express.Router()
const {signup,signin,getme,getAllusers} =require('../controllers/userController')
const {protect} = require ('../middleware/authMiddleware')
router.get('/',getAllusers)
router.post('/',signup)
 router.post('/signin',signin)
 router.get('/me',protect,getme )

 module.exports = router