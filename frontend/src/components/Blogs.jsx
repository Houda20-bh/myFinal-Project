import React from 'react'
import Blog from './Blog'
import{useDispatch,useSelector} from 'react-redux'
import { useEffect } from 'react'
import { getAllBlogs } from '../Redux/blogSlice';
import { Box } from '@mui/system';
function Blogs() {
  const dispatch= useDispatch();
  useEffect(()=>{
    dispatch(getAllBlogs())
  },[dispatch])
  const{blogList}= useSelector((state)=>state.blogs)
  // const {user}= useSelector((state) => state.auth);
  return (
   
      <Box display={'flex'}
      flexDirection={'column'}
      padding={3}
      justifyContent={'center'}
      alignItems={'center'}>
      {blogList &&
      blogList?.map((blog, index) => (
          <Blog
          id={blog._id}
          isEdited={blog.isEdited}
          title={blog.title}
          description={blog.description}
          image={blog.image}
          userName={blog.user.name}
          />
        ))}
        </Box>
    
  );
};
export default Blogs;