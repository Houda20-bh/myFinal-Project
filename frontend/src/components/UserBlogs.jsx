import React from 'react'
import { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux'
import { getBlogsByuser } from '../Redux/blogSlice'
import Blog from './Blog';

function UserBlogs() {
  const dispatch = useDispatch();
  const {user}= useSelector((state) => state.auth);
  const {userBlogs}= useSelector((state) => state.blogs);
 const userId  = user?._id;
 console.log(userBlogs);
 useEffect(() => {
    dispatch(getBlogsByuser(userId));
    },[]);
 console.log(userBlogs);
  return (
    <div>
      <center> 
         <br></br>
          <i> {userBlogs && userBlogs?.map((blog, index) => (
          <Blog
            title={blog.title} 
            description={blog.description}
            imageURL={blog.image}
          />
        ))
          } </i>
          </center>
    </div>
  )
}

export default UserBlogs