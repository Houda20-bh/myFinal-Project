const express= require("express")
const dotenv= require('dotenv').config()
const {errorHandler}= require('./middleware/errorMiddleware')
const port =process.env.PORT
//express app (start)
const app= express()
// use middleware
app.use(express.json());
app.use(express.urlencoded({extended:false}))
//routes
app.use('/api/blogs',require('./routes/blogRoutes'))
app.use(errorHandler);
//listen for requests
app.listen(port,()=>console.log(`server running on port ${port}`))