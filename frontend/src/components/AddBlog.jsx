import React from 'react'
import { useState,useEffect } from 'react'
import PostAddIcon from '@mui/icons-material/PostAdd';
import { useDispatch,useSelector } from 'react-redux';
import {Typography,Box,Button, InputLabel, TextField,IconButton} from "@mui/material"
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { createBlog } from '../Redux/blogSlice';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
const labelStyles = { mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" };
function AddBlog() {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const{error}= useSelector((state)=>state.blogs)
 const {user}= useSelector((state) => state.auth);
 useEffect(() => {
  error && toast.error(error);
}, [error]);
  const [blogData, setBlogData]= useState({
  title:'',
  description:'',
  imageURl:'',
  date:'',

  })
  const onChange =(e)=>{
 setBlogData({...blogData,[e.target.name]:e.target.value})
  }
  const handleClear = () => {
    setBlogData({ title: "", description: "", imageURl:'',date:'' });
  };
  const onSubmit =(e)=>{
    e.preventDefault();
    dispatch(createBlog({blogData, navigate, toast }))
    handleClear();
  }
  
  return (
   <Box  display="flex" 
   flexDirection={'column'} 
   width={'100%'}
   height={'100%'}>
        <Box 
        display="flex"  
        padding={2}
         margin={'auto'}>
          <Typography  fontWeight={'bold'} padding={3} color="black" variant='h2'
          textAlign={'center'}> Share your Post </Typography>
          <PostAddIcon sx={{fontSize:'40px', paddingLeft:1, color:'lightcoral'}}/>
          </Box>
          <form onSubmit={onSubmit}>
            <Box   
       display="flex"  
        padding={3}
         margin={'auto'}
         flexDirection={'column'} 
         width={'70%'}>
          <InputLabel sx={{labelStyles}}  onChange={onChange}> Title </InputLabel>
          <TextField variant={'standard'} name='title' onChange={onChange}  margin='auto'/>
          <InputLabel  sx={{labelStyles}}> Description</InputLabel>
          <TextField variant={'standard'} name='description' onChange={onChange}   margin='auto' />
          <InputLabel  sx={{labelStyles}}> ImageURL</InputLabel>
        
          <TextField variant={'standard'} name='image' onChange={onChange} margin='auto'>
          <IconButton><AddPhotoAlternateIcon  sx={{fontSize:'40px', paddingLeft:1, color:'lightcoral'}}/></IconButton>
          </TextField>
          <InputLabel  sx={{labelStyles}}> Date</InputLabel>
          <TextField variant={'standard'} type='date' name='date' onChange={onChange} margin='auto'/>
          <Button  variant='contained' sx={{borderRadius:7, width:'50%', margin:'auto',mt:3,}} color='warning' type='submit'>  Post
          </Button>
          </Box>
          </form>
        </Box>
  )
}

export default AddBlog