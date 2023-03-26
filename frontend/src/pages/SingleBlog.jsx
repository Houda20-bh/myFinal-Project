import React, { useEffect } from "react";
import {Card,CardHeader,CardMedia,Typography,Box ,CardContent,Avatar, IconButton }from '@mui/material';
import {useDispatch,useSelector} from 'react-redux';
import NotesIcon from '@mui/icons-material/Notes';
import { useParams,useNavigate } from "react-router-dom";
import {getBlog } from "../Redux/blogSlice";
import DisqusThread from '../Components/DisqusThread';
import KeyboardBackspaceOutlinedIcon from '@mui/icons-material/KeyboardBackspaceOutlined';
const SingleBlog = () => {
  const { id } = useParams();
const dispatch = useDispatch();
const navigate = useNavigate();  
const{blog}= useSelector((state)=>state.blogs)
 const {user}= useSelector((state) => state.auth);
   useEffect(() => {
    if (id) {
      dispatch(getBlog(id));
    }
  }, [id]);
  return (
<>
    
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
       {user?.user?.name? user.user.name.charAt(0) : ""}
     
          </Avatar>
        }
        action={<IconButton><NotesIcon/></IconButton>}
        title= {blog.title}
        subheader= {blog.date}
      
      />
      <CardMedia
        component="img"
        height="194"
        image={blog.image}
        alt={blog.title}
      />
          
              <KeyboardBackspaceOutlinedIcon
              color='warning' 
               onClick={() => navigate("/blogs")}
              />
           
      <CardContent>
      <hr></hr>
      <br></br>
      <Box paddingTop={1} display={'flex'} > 
        <Typography  fontWeight={'bold'} variant="caption" color="text.secondary">
        <b>{user?.user?.name}</b> {": "} 
        
        <Typography>{blog.description}</Typography>
        </Typography></Box>
        </CardContent>
        <DisqusThread id={id} title={blog.title} path={`/blog/${id}`}/> 
        </Card>

   
   
        </>
    
        
  )
}

export default SingleBlog;