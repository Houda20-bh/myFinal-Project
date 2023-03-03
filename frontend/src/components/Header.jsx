import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {logout} from '../features/auth/authSlice'
import {AppBar,Toolbar,Typography,Box,Button,Tabs,Tab,} from "@mui/material"
import { useState } from 'react'

function Header() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)
 const [value,setValue]= useState()
  const onLogout = () => {
    dispatch(logout())
    navigate('/')
  }

  return (
    <AppBar position='sticky'
       sx={{background:'linear-gradient(90deg, rgba(30,0,36,1) 0%, rgba(76,56,241,1) 35%, rgba(200,59,200,1) 100%);'}}>
     <Toolbar>
      <Typography variant='h4'> BlogsApp</Typography>
      <Box display="flex" marginLeft={"auto"} marginRight="auto">
        <Tabs textColor='inherit' value={value} onChange={(e,val)=>setValue(val)}>
        <Link to='/blogs'> <Tab label="All Blogs"></Tab>  </Link>
        <Link to='/myBlogs'>  <Tab label="My Blogs"></Tab>  </Link>
        </Tabs>

      </Box>
      <Box display="flex"  marginLeft='auto'>
        {user ? (
          
            <Button variant='contained' sx={{margin:1,borderRadius:10}} color='warning' onClick={onLogout}>
              <FaSignOutAlt /> Logout
            </Button>
          
        ) : (
          <>
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
          </>
        )}
      </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Header