import React from 'react'
import { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux'
import { getBlogsByuser } from '../Redux/blogSlice'
import Blog from './Blog';
function UserBlogs() {
  const dispatch = useDispatch();
  const {user}= useSelector((state) => state.auth);
  const id= user._id;
 useEffect(() => {
    dispatch(getBlogsByuser({id}));
    },[]);
  return (
    <div>
      <center> 
         <br></br>
          <i> {user&& user.blogs && user.blogs?.map((blog, index) => (
          <Blog
            title={blog.title} 
            description={blog.description}
            image={blog.image}
          
          />
        ))
          } </i>
          </center>
    </div>
  )
}

export default UserBlogs