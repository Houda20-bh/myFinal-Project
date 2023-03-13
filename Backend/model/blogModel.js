const mongoose= require('mongoose')
const blogSchema= mongoose.Schema({
   title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  isEdited:Boolean,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
},{timestamps: true,})
module.exports= mongoose.model('Blog',blogSchema)