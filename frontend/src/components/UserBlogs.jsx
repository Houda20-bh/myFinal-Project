import React from 'react'
import { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux'
import { getConnectedUser } from '../Redux/authSlice';
import Blog from './Blog';
import Spinner from './Spinner';
function UserBlogs() {
  const dispatch = useDispatch();
  const {auth,loading}= useSelector((state) => state);
  
  useEffect(()=>{
    dispatch(getConnectedUser())
  },[dispatch])
  if(loading)
  {
    return  <Spinner></Spinner>
  }
  return (
    <div>
      
        {auth?.connectedUser?.blogs.map((blog)=><Blog title={blog.title} description={blog.description} image={blog.image} userName={auth?.user?.user?.name} />)}
       
    </div>
  )
}

export default UserBlogs