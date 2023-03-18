import React from 'react'
import { useState,useEffect } from 'react'
import { useDispatch,useSelector } from 'react-redux';
import {Typography,Box,Button, InputLabel, TextField,} from "@mui/material"
import { createBlog } from '../Redux/blogSlice';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
const labelStyles = { mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" };
function AddBlog() {

  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [blogData, setBlogData]= useState({
  title:'',
  description:'',
  imageURl:'',
  })
  const onChange =(e)=>{
 setBlogData({...blogData,[e.target.name]:e.target.value})
  }
  
  const onSubmit =(e)=>{
    e.preventDefault();
    dispatch(createBlog({blogData, navigate, toast }))
    navigate('/myblogs'); 
  }
  
  return (
    <div>
      <form onSubmit={onSubmit}>
        <Box borderColor ="linear-gradient(90deg, rgba(30,0,36,1) 0%, rgba(76,56,241,1) 35%, rgba(200,59,200,1) 100%);" 
        border={3} borderRadius={10}
        boxShadow='10px 10px 20px #ccc' padding={3} margin={'auto'} marginTop={3}
        display="flex" flexDirection={'column'} width={'60%'}>
          <Typography  fontWeight={'bold'} padding={3} color="black" variant='h2'
          textAlign={'center'}> Post your Blog</Typography>
          
          <InputLabel  sx={{labelStyles}}  onChange={onChange}> Title </InputLabel>
          <TextField  name='title' onChange={onChange}  margin='normal' variant='outlined'/>
          <InputLabel  sx={{labelStyles}}> Description</InputLabel>
          <TextField name='description' onChange={onChange}   margin='normal' variant='outlined'/>
          <InputLabel  sx={{labelStyles}}> ImageURL</InputLabel>
          <TextField  name='image' onChange={onChange} margin='normal' variant='outlined'/>
          <Button  variant='contained' sx={{mt:2,borderRadius:10}} color='warning' type='submit'>  Submit
          </Button>
        </Box>
      </form>
        </div>
  )
}

export default AddBlog