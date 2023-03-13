import React from 'react'
import { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux'
import { getBlogsByuser } from '../Redux/blogSlice'
import Blog from './Blog';
function UserBlogs() {
  const dispatch = useDispatch();
  const {user}= useSelector((state) => state.auth);
 const userId  = user?._id;
 
 useEffect(() => {
    dispatch(getBlogsByuser(userId));
    },[]);
  return (
    <div>
      <center> 
         <br></br>
          <i> {user && user.blogs && user.blogs?.map((blog, index) => (
          <Blog
            title={blog.title} 
            description={blog.description}
            imageURL={blog.image}
            userName={user.name}
          />
        ))
          } </i>
          </center>
    </div>
  )
}

export default UserBlogs