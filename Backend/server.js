const express= require("express")
const colors= require('colors');
const dotenv= require('dotenv').config()
const cors = require('cors');
const {errorHandler}= require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
const port =process.env.PORT
// connect db
connectDB ()

//express app (start)
const app= express()
// use middleware
app.use(express.json());
app.use(express.urlencoded({extended:false}))
app.use(cors());
//routes
app.use('/api/blogs',require('./routes/blogRoutes'))
app.use('/api/users',require('./routes/userRoutes'))
app.use(errorHandler);
//listen for requests
app.listen(port,()=>console.log(`server running on port ${port}`))