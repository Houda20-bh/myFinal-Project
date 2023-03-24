import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {logout} from '../Redux/authSlice'
import {AppBar,Toolbar,Typography,Box,Button,Tabs,Tab,LinkComponent} from "@mui/material"
import NoteIcon from '@mui/icons-material/Note';
import { setLogout } from "../Redux/authSlice";
import { useState } from 'react'

function Header() {
  const {isLoggedIn }= useSelector (state=>state.auth)
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

  return (
    <>
    <AppBar position='sticky'
       sx={{bgcolor:'transparent'}}>
     <Toolbar>
      < NoteIcon sx={{color:'black'}} />
      <Typography variant='h4'> BlogsApp</Typography>
      {user && <Box display="flex" marginLeft={"auto"} marginRight="auto">
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

      </Box>}
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
    <center> <br></br>
        {user && (<h5 style={{ marginRight: "30px", marginTop: "27px" }}>
        Welcome : {user?.user?.name}</h5>)} 
       <br></br></center>
       
       </>
  )
  
}

export default Header