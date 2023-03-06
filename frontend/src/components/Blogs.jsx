import React from 'react'
import {useEffect, useState} from 'react'
import { useSelector, useDispatch } from "react-redux";
import { getAllBlogs } from '../features/blogs/blogSlice';
import Blog from './Blog';
function Blogs(props) {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllBlogs());
      }, [dispatch]);
    
      const { blogs } = useSelector((state) => state.blogs);
    return (
        <div>
           
        {blogs && blogs.map((blog)=>(<Blog
        title={blog.title} description={blog.description} imageUrl={blog.image}
        user={blog.user.name} key={blog.id}/>))}
        </div>
    )
}

export default Blogs
