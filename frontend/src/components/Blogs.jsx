import React from 'react'
import {useEffect, useState} from 'react'
import axios from 'axios'
function Blogs() {
    const [blogs,setBlogs]= useState()
    const sendRequest= async () =>{
        const res = await axios
        .get('http://localhost:5000/api/blogs')
        .catch((err)=>console.log(err));
        const data = await res.data;
        return data;
    };
    useEffect(()=>{
        sendRequest().then((data)=>setBlogs(data.blogs))
    },[]);
    console.log(blogs)
    return (
        <div>
           
           Blogs 
        </div>
    )
}

export default Blogs
