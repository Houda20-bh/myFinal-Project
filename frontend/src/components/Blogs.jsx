import React from 'react'
import Blog from './Blog'
import{useDispatch,useSelector} from 'react-redux'
import { useEffect } from 'react'
import { getAllBlogs } from '../Redux/blogSlice';
function Blogs() {
  const dispatch= useDispatch();
  useEffect(()=>{
    dispatch(getAllBlogs())
  },[dispatch])
  const{blogList}= useSelector((state)=>state.blogs)
  console.log(blogList);
  return (
    <div>
      {blogList &&
      blogList?.map((blog, index) => (
          <Blog
          id={blog._id}
          title={blog.title}
          description={blog.description}
          image={blog.image}

            userName={blog.user.name}
          />
        ))}
    </div>
  );
};


export default Blogs