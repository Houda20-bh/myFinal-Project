
import { useState, useEffect } from "react";
import {FaSignInAlt } from 'react-icons/fa'
import { Link} from "react-router-dom";
import{useDispatch, useSelector} from"react-redux"
import {useNavigate} from'react-router-dom';
import {toast} from 'react-toastify';
import { login } from '../Redux/authSlice';
import Spinner from "../Components/Spinner"
import {Box,Button,Typography,TextField} from "@mui/material"
function Login() {
    const [formValue, setFormValue] = useState({
        email:'',
        password:'',  
    })
    const { loading, error } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const onChange =(e)=>{
      setFormValue({...formValue,[e.target.name]:e.target.value})
    } 
    const onSubmit =(e)=>{
        e.preventDefault()
          dispatch (login({formValue,navigate,toast}))
    }
    return  (
        <>
        <Box  maxWidth={400} component= "form" onSubmit={onSubmit}
        display={"flex"} flexDirection="column" 
                 alignItems={'center'} justifyContent='center' 
                 boxShadow="10px 10px 20px #ccc "
                 padding={3}
                 margin='auto'
                 marginTop={5} borderRadius={5}>
          <Typography variant='h6' padding={3} textAlign='center'>
        <FaSignInAlt />Login
        <p>Please login and start posting</p>
      </Typography>  
                <TextField margin="normal"
                  required
                  fullWidth
                 id='email'
                 name="email" 
                 label="Email"
                 autoComplete="Email"
                 autoFocus
                 onChange={onChange}/>
               <TextField  margin="normal"type="password" 
                 id='password'
                 name="password" 
                 label="password"
                 placeholder='Enter a password'
                 required
                 fullWidth
                 autoFocus
                 onChange={onChange}/>
                 
                    <Button   type="submit" variant='contained'  
                     sx={{borderRadius:3,marginTop:3}} color='warning'>
                    {loading && (
                  <Spinner 
                    size="sm"
                    role="status"
                    tag="span"
                    className="me-2"
                  />
                )}
                      login</Button>
                      <Button  type="submit" variant='contained' sx={{marginTop:3,borderRadius:3}}> 
                      <Link to='/register'>
                      Change to Signup </Link> </Button>
                      </Box>
        </>
      );
}

export default Login