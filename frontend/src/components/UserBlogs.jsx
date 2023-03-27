import { Box, Typography } from '@mui/material';
import React from 'react'
import { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux'
import { getConnectedUser } from '../Redux/authSlice';
import Blog from './Blog';
function UserBlogs() {
  const dispatch = useDispatch();
  const {auth}= useSelector((state) => state);
  
  useEffect(()=>{
    dispatch(getConnectedUser())
  },[dispatch])
  return (
    <>
    <br></br>
<Box display={'flex'} flexDirection={'column'} paddingTop={'5'}>
<Typography
text textAlign={'center'}
variant='h3' fontFamily={'fantasy'}
padding={'2'} >
MY BLOGS 
</Typography>
<Typography
text textAlign={'left'}
variant='h5' fontFamily={'cursive'}
padding={'2'} >
Name {": "} <i>{auth?.user?.user?.name}</i>
</Typography>
<Typography
text textAlign={'left'}
variant='h5' fontFamily={'cursive'}
padding={'2'} >
Email {": "} <i>{auth?.user?.user?.email}</i>
</Typography>
<hr></hr>
<br></br> 
    <div>
      <center> 
         <br></br>
        {auth?.connectedUser?.blogs.map((blog)=><Blog title={blog.title} description={blog.description} image={blog.image} blogId={blog._id} user={blog.user} userName={auth?.user?.user?.name} />)}
          </center>
    </div>
</Box>
    </>
  )
}

export default UserBlogs;