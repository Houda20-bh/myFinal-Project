import {Card,CardHeader,CardMedia,Typography,Box ,CardContent,Avatar, IconButton, CardActions }from '@mui/material';
import ModeEditOutlineIcon from '@mui/icons-material/Edit';
import {useDispatch} from 'react-redux';
import DeleteForeverIcon from '@mui/icons-material/Delete';
import {deleteBlog, EditBlog} from '../Redux/blogSlice';
import BlogDetail from './BlogDetail';
import NotesIcon from '@mui/icons-material/Notes';
import { toast } from 'react-toastify';
function Blog({title,description,image,userName,isEdited,id,date}) {
  const dispatch= useDispatch();
 const handleEdit= (e)=>{
  e.preventDefault();
  dispatch(EditBlog(id))
 }
 console.log(id);
  const handleDelete=(id)=>{
   if(window.confirm('Are you sure you want to delete this blog?')){
    dispatch(deleteBlog({ id, toast }))
   }
   
  }
  return (
    <Card sx={{
      width: "50%",
      height:'50%',
      margin: "auto",
      mt: 2,
      display:'flex',
      flexDirection:'column',
      padding: 1,
      boxShadow: "5px 5px 10px #ccc",
      ":hover": {
        boxShadow: "10px 10px 20px #ccc",
      },
    }}
    >
  
    <CardHeader
      avatar={
        <Avatar sx={{ bgcolor: 'red' }} aria-label="blog">
     {userName ? userName.charAt(0) : ""}
   
        </Avatar>
      }
      action={<IconButton><NotesIcon/></IconButton>}
      title= {title}
      subheader= {date}
    
    />
    <CardMedia
      component="img"
      height="194"
      image={image}
      alt={title}
    />
    <CardContent>
    <hr></hr>
    <br></br>
    <Box paddingTop={1} display={'flex'} > 
      <Typography  fontWeight={'bold'} variant="caption" color="text.secondary">
      <b>{userName}</b> {": "} 
      
      <Typography>{description}</Typography>
      </Typography></Box>
    </CardContent>
    <CardActions  sx={{marginLeft:'auto'}}>
    {isEdited && <BlogDetail title={title} description={description}  id={id}/> }

       { !isEdited &&<IconButton onClick={handleEdit} sx={{marginLeft:'auto'}}><ModeEditOutlineIcon color="warning"/></IconButton>}
        <IconButton onClick={()=>handleDelete(id)}>< DeleteForeverIcon color="error"/></IconButton>

     
    </CardActions >
  </Card>
  )
}

export default Blog