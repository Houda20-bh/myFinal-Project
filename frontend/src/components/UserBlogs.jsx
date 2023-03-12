import React from 'react'
import { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux'
import { getBlogsByuser } from '../Redux/blogSlice'
import Blog from './Blog';

function UserBlogs() {
  const dispatch = useDispatch();
  const {userBlogs} = useSelector((state)=>state.blogs);
  const {auth}= useSelector((state) => state.auth);
 const userId  = auth?.user?._id;
 useEffect(() => {
    dispatch(getBlogsByuser(userId));
    },[dispatch]);
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