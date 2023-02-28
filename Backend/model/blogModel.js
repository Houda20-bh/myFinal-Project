const mongoose= require('mongoose')
const blogSchema= mongoose.Schema({
   user:{
     type: mongoose.Schema.Types.ObjectId,
     required: true,
     ref:'User',
   },
   title:{
        type:String,
        require:[true, 'Please add a title value']
       },
    text:{
     type:String,
     require:[true, 'Please add a text value']
    },
},{timestamps: true,})
module.exports= mongoose.model('Blog',blogSchema)