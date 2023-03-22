import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {logout} from '../Redux/authSlice'
import {AppBar,Toolbar,Typography,Box,Button,Tabs,Tab,LinkComponent} from "@mui/material"
import { useState } from 'react'

function Header() {
  const {isLoggedIn }= useSelector (state=>state.auth)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector(state => state.auth)
 const [value,setValue]= useState()
  const onLogout = () => {
    dispatch(logout())
    navigate('/')
  }

  return (
    <AppBar position='sticky'
       sx={{background:'linear-gradient(90deg, rgba(30,0,36,1) 0%, rgba(3,71,69,1) 35%, rgba(200,59,200,1) 100%)'}}>
     <Toolbar>
      <Typography variant='h4'> BlogsApp</Typography>
      {user && <Box display="flex" marginLeft={"auto"} marginRight="auto">
        <Tabs textColor='inherit' value={value} onChange={(e,val)=>setValue(val)}>
       <Tab LinkComponent={Link} to='/blogs' label="All Blogs">  </Tab>  
      <Tab LinkComponent={Link} to='/myBlogs' label="My Blogs"> </Tab>  
      <Tab  LinkComponent={Link} to='/blogs/add' label="Add Blog"></Tab>
        </Tabs>

      </Box>}
      <Box display="flex"  marginLeft='auto'>
            {user && <Button onClick={onLogout} variant='contained' sx={{margin:1,borderRadius:10}} color='warning' >
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