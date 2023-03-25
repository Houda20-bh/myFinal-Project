import {Card,CardHeader,CardMedia,Typography,Box ,CardContent,Avatar, IconButton, CardActions, Button }from '@mui/material';
import ModeEditOutlineIcon from '@mui/icons-material/Edit';
import {useDispatch,useSelector} from 'react-redux';
import DeleteForeverIcon from '@mui/icons-material/Delete';
import {deleteBlog, EditBlog} from '../Redux/blogSlice';
import BlogDetail from './BlogDetail';
import NotesIcon from '@mui/icons-material/Notes';
import { toast } from 'react-toastify';
import { Link ,useNavigate} from 'react-router-dom';
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';
import { likeBlog} from "../Redux/blogSlice";

function Blog({title,description,image,userName,isEdited,id,date,likes,}) {
const {auth}= useSelector((state) => state)
const userId = auth?.user?._id 
const dispatch= useDispatch();
const navigate = useNavigate();
const handleEdit = () => {
  dispatch(EditBlog(id))
  navigate(`/myBlogs/${id}`);
};
 const excerpt = (str) => {
  if (str.length > 20) {
    str = str.substring(0, 20) + " ...";
  }
  return str;
};  
 console.log(id);
  const handleDelete=(id)=>{
    navigate(`/myBlogs/${id}`);
   if(window.confirm('Are you sure you want to delete this blog?')){
    dispatch(deleteBlog({ id, toast }))
   }
  }
  const Likes = () => {
    if (likes.length > 0) {
      return likes.find((like) => like === userId) ? (
        <>
          <IconButton fas icon="thumbs-up" />
          &nbsp;
          {likes.length > 2 ? (
            <ThumbDownOutlinedIcon
              title={`You and ${likes.length - 1} other people likes`}
            >
              {likes.length} Likes
            </ThumbDownOutlinedIcon>
          ) : (
            `${likes.length} Like${likes.length > 1 ? "s" : ""}`
          )}
        </>
      ) : (
        <>
          <IconButton  far icon="thumbs-up" />
          &nbsp;{likes.length} {likes.length === 1 ? "Like" : "Likes"}
        </>
      );
    }
    return (
      <>
        <IconButton far icon="thumbs-up" />
        &nbsp;Like
      </>
    );
  };
  const handleLike = () => {
    dispatch(likeBlog({ userId }));
  };

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

      <Typography className="text-start">
            {excerpt(description)}
            <Link to={`/blog/${id}`}>Read More</Link>
          </Typography>
      </Typography></Box>
    </CardContent>
    <CardActions  sx={{marginLeft:'auto'}}>
    {isEdited && <BlogDetail title={title} description={description}  id={id}/> }

       {auth?.user && <><IconButton onClick={handleEdit} sx={{marginLeft:'auto'}}><ModeEditOutlineIcon color="warning"/></IconButton>
        <IconButton onClick={()=>handleDelete(id)}>< DeleteForeverIcon color="error"/></IconButton></>}

        <IconButton 
            style={{ float: "right" }}
            tag="a"
            color="none"
           onClick={!auth?.connectedUser ? null : handleLike}
          >
            {!auth?.connectedUser ? (
              <ThumbDownOutlinedIcon  title="Please login to like "  color="warning">
                <Likes />
              </ThumbDownOutlinedIcon >) : (
              <Likes /> 
          ) } 
          </IconButton >
    </CardActions >
  </Card>
  )
}

export default Blog;