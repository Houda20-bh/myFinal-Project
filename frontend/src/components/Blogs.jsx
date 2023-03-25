import React from 'react'
import Blog from './Blog'
import{useDispatch,useSelector} from 'react-redux'
import { useEffect } from 'react'
import { getAllBlogs } from '../Redux/blogSlice';
import { Box } from '@mui/system';
import Spinner from './Spinner';
function Blogs() {
  const{blogList,loading}= useSelector((state)=>state.blogs)
  const {user}= useSelector((state) => state.auth);
  
  const dispatch= useDispatch();
  useEffect(()=>{
    dispatch(getAllBlogs())
  },[dispatch])
  if(loading)
  {
    return <Spinner></Spinner>
  }
  

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
        </Box>
    
  );
};
export default Blogs;