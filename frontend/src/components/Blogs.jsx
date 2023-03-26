import React from 'react'
import Blog from './Blog'
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import{useDispatch,useSelector} from 'react-redux'
import { useEffect } from 'react'
import { getAllBlogs,setCurrentPage } from '../Redux/blogSlice';
import { Box,CardActions,IconButton } from '@mui/material';
import Spinner from './Spinner';


function Blogs() {
  const{blogList,loading,currentPage,numberOfPages}= useSelector((state)=>state.blogs)
  const {user}= useSelector((state) => state.auth);
  const dispatch= useDispatch();
  useEffect(()=>{
    dispatch(getAllBlogs(currentPage))
  },[currentPage])
  if(loading)
  {
    return <Spinner></Spinner>
  }
  
  const gotoPrevious = () => {
    dispatch(setCurrentPage(currentPage - 1));
  };

  const gotoNext = () => {
    dispatch(setCurrentPage(currentPage + 1));
  };
  return (
   
      <Box display={'flex'}
      flexDirection={'column'}
      padding={3}
      justifyContent={'center'}
      alignItems={'center'}>
      {blogList &&
      blogList?.map((blog, index) => (
          <Blog
          date={new Date(`${blog.date}`).toLocaleDateString()}
          id={blog._id}
          title={blog.title}
          description={blog.description}
          image={blog.image}
          userName={blog.user.name}
          key={index}
          />
        ))}
        <CardActions >
        <IconButton  onClick={gotoPrevious}><SkipPreviousIcon color="warning"/></IconButton>
        <p><i>{currentPage}</i></p>
        <IconButton  onClick={gotoNext}><SkipNextIcon color="warning"/></IconButton>
        </CardActions>


        
        </Box>
    
  );
};
export default Blogs;