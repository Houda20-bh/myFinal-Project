import React, { useState } from "react";
import ZoomOutIcon from '@mui/icons-material/ZoomOut';
import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import {AppBar,Toolbar,Typography,Box,Button,Tabs,Tab, TextField} from "@mui/material"
import NoteIcon from '@mui/icons-material/Note';
import { setLogout } from "../Redux/authSlice";
import { SearchBlog } from "../Redux/blogSlice";



function Header() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector(state => state.auth)
 const [value,setValue]= useState()
  // const onLogout = () => {
  //   dispatch(logout())
    
  // }
  const handleLogout = () => {
    dispatch(setLogout());
    navigate('/')
    
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (search) {
      dispatch(SearchBlog(search));
      navigate(`/Blogs/search?searchQuery=${search}`);
      setSearch("");
    } else {
      navigate("/");
    }
  };
  return (
 
    <AppBar position='sticky'
       sx={{bgcolor:'transparent'}}>
     <Toolbar>
      < NoteIcon sx={{color:'black'}} />
      <Typography variant='h4'> BlogsApp</Typography>
      {user &&  <><Box display="flex" marginLeft={"auto"} marginRight="auto">
        <Tabs   sx={{ml:'auto',textDecoration:'none'}} value={value} onChange={(e,val)=>setValue(val)}>
       <Tab sx={{textDecoration:'none',fontWeight:'bold',fontFamily:'cursive',":hover":{
      
        textUnderlineOffset:'10px'
      }}}LinkComponent={Link} to='/blogs' label="All Blogs">  </Tab>  
      <Tab  sx={{textDecoration:'none',fontWeight:'bold',fontFamily:'cursive',":hover":{
        textUnderlineOffset:'10px'
      }}} LinkComponent={Link} to='/myBlogs' label="My Blogs"> </Tab>  
      <Tab  sx={{textDecoration:'none',fontWeight:'bold',fontFamily:'cursive',":hover":{
     
        textUnderlineOffset:'10px'
      }}}LinkComponent={Link} to='/blogs/add' label="Add Blog"></Tab>
        </Tabs>

      </Box>
       <Box>
       <form onSubmit={handleSubmit}>
       
       <TextField variant={'standard'}
         type="text"
         placeholder="Search Post"
         value={search}
         onChange={(e) => setSearch(e.target.value)}
       />
       
       <ZoomOutIcon variant='contained' sx={{margin:1,borderRadius:10}} color='warning' />
     </form>
       </Box></>
      }
     
      <Box display="flex"  marginLeft='auto'>
            {user && <Button onClick={() => handleLogout()} variant='contained' sx={{margin:1,borderRadius:10}} color='warning' >
              <FaSignOutAlt /> Logout
            </Button>}
          {!user && <>
            <Button variant='contained' sx={{margin:1,borderRadius:10}} color='warning'>
              <Link to='/login'>
                <FaSignInAlt /> Login
              </Link>
           </Button>
           <Button variant='contained' sx={{margin:1,borderRadius:10}} color='warning'>
              <Link to='/register'>
                <FaUser /> Register
              </Link>
              </Button>
          </>}
      </Box>
    
      </Toolbar>
      
    </AppBar>
   
  )
  
}

export default Header