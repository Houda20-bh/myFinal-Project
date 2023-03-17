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
    <div>
      <center> 
         <br></br>
        {auth?.connectedUser?.blogs.map((blog)=><Blog title={blog.title} description={blog.description} image={blog.image} userName={auth?.user?.user?.name} />)}
          </center>
    </div>
  )
}

export default UserBlogs