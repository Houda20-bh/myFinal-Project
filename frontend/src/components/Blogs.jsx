import React, { useState } from 'react'
import Blog from './Blog'
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import{useDispatch,useSelector} from 'react-redux'
import { useEffect } from 'react'
import { getAllBlogs,setCurrentPage } from '../Redux/blogSlice';
import { Box,CardActions,IconButton, TextField } from '@mui/material';
import Spinner from './Spinner';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';


function Blogs() {
  const{blogList,loading,currentPage,numberOfPages}= useSelector((state)=>state.blogs)
  const {user}= useSelector((state) => state.auth);
  const dispatch= useDispatch();
  const [search,setSearch]=useState("")

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
  const searchedPost= blogList?.filter((el)=>el.title.trim().toLowerCase().includes(search.trim().toLocaleLowerCase()))
  return (
    <div>
    <TextField variant={'standard'}
    type="text"
    placeholder="Search Post"
    onChange={(e)=>{setSearch(e.target.value)}}
  />

  
  <ZoomOutIcon variant='contained' sx={{margin:1,borderRadius:10}} color='warning' />
         <Box display={'flex'}
      flexDirection={'column'}
      padding={3}
      justifyContent={'center'}
      alignItems={'center'}>
      {searchedPost &&
      searchedPost?.map((blog, index) => (
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
    </div>

        
   
    
  );
};
export default Blogs;