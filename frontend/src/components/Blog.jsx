import {Card,CardHeader,CardMedia,Typography,Box ,CardContent,Avatar, IconButton }from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import {useDispatch} from 'react-redux';
import DeleteIcon from '@mui/icons-material/Delete';
import { EditBlog } from '../Redux/blogSlice';
const labelStyles = { mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" };
function Blog({title,description,imageURL,userName,isEdited,_id}) {
  const dispatch = useDispatch();
  const editHandler = (e) => {
    e.preventDefault();
    dispatch(EditBlog (_id));
  };

  return (
    <Card sx={{ width:'40%',margin :'auto',mt:2, padding:2,
    boxShadow:'5px 5px 10px #ccc',":hover:":{
      boxShadow:'10px 10px 20px #ccc',
    },}}>
      {!isEdited && (<Box display ='flex'>
        <IconButton onClick={editHandler} sx={{marginLeft:'auto'}}><EditIcon></EditIcon></IconButton>
        <IconButton>< DeleteIcon></DeleteIcon></IconButton>

      </Box>)}
    <CardHeader
      avatar={
        <Avatar sx={{ bgcolor: 'red' }} aria-label="recipe">
     {userName}
        </Avatar>
      }
      title= {title}
    />
    <CardMedia
      component="img"
      height="194"
      image={imageURL}
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