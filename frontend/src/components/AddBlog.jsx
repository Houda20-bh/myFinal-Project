import React from 'react'
import { useState,useEffect } from 'react'
import { useDispatch,useSelector } from 'react-redux';
import {Typography,Box,Button, InputLabel, TextField,} from "@mui/material"
import { createBlog } from '../Redux/blogSlice';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
function AddBlog() {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [blogData, setBlogData]= useState({
  title:'',
  description:'',
  imageURl:'',
  })
  const onChange =(e)=>{
 setBlogData((prevState)=>({...prevState,[e.target.name]:e.target.value}))
  }
  
  const onSubmit =(e)=>{
    e.preventDefault();
    dispatch(createBlog({ blogData, navigate, toast }))
    navigate('/');
    
  }
  
  return (
    <div>
      <form onSubmit={onSubmit}>
        <Box borderColor ="linear-gradient(90deg, rgba(30,0,36,1) 0%, rgba(76,56,241,1) 35%, rgba(200,59,200,1) 100%);" 
        border={3} borderRadius={10}
        boxShadow='10px 10px 20px #ccc' padding={3} margin={'auto'} marginTop={3}
        display="flex" flexDirection={'column'} width={'80%'}>
          <Typography fontWeight={'bold'} padding={3} color="grey" variant='h4'
          textAlign={'center'}> Post your Blog</Typography>
          <InputLabel sx={{mb:1,mt:2, fontSize:'24px', fontWeight:'bold'}}  onChange={onChange}> Title </InputLabel>
          <TextField name='title' onChange={onChange}  margin='normal' variant='outlined'/>
          <InputLabel sx={{mb:1,mt:2, fontSize:'24px', fontWeight:'bold'}}> Description</InputLabel>
          <TextField name='description' onChange={onChange}   margin='normal' variant='outlined'/>
          <InputLabel sx={{mb:1,mt:2, fontSize:'24px', fontWeight:'bold'}}> ImageURL</InputLabel>
          <TextField name='image' onChange={onChange} margin='normal' variant='outlined'/>
          <Button variant='contained' sx={{margin:1,borderRadius:10}} color='warning' type='submit'>  Submit
          </Button>
        </Box>
      </form>
        </div>
  )
}

export default AddBlog