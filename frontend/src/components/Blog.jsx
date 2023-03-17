import {Card,CardHeader,CardMedia,Typography,Box ,CardContent,Avatar, IconButton }from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import {useDispatch,useSelector} from 'react-redux';
import DeleteIcon from '@mui/icons-material/Delete';
import {deleteBlog, EditBlog} from '../Redux/blogSlice';
import BlogDetail from './BlogDetail';
const labelStyles = { mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" };
function Blog({title,description,image,userName,isEdited,_id}) {
  // const {auth}= useSelector((state) => state);


  const dispatch= useDispatch();

  const handleDelete=(e)=>{
    e.preventDefault();
    dispatch(deleteBlog(_id))
  }
  return (
    <Card sx={{ width:'40%',margin :'auto',mt:2, padding:2,
    boxShadow:'5px 5px 10px #ccc',
    ":hover:":{boxShadow:'10px 10px 20px #ccc'},
  }}
    >
   {isEdited && <BlogDetail  /> }
       <Box display ='flex'>
        <IconButton  sx={{marginLeft:'auto'}}><EditIcon></EditIcon></IconButton>
        <IconButton onClick={handleDelete}>< DeleteIcon></DeleteIcon></IconButton>

      </Box>
    <CardHeader
      avatar={
        <Avatar sx={{ bgcolor: 'red' }} aria-label="blog">
     {userName}
        </Avatar>
      }
      title= {title}
    />
    <CardMedia
      component="img"
      height="194"
      image={image}
      alt=""
    />
    <CardContent>
      <Typography variant="body2" color="text.secondary">
      <b>{userName}</b> {": "} {description}
      </Typography>
    </CardContent>
  </Card>
  )
}

export default Blog