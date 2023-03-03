import{useDispatch, useSelector} from 'react-redux'
import { useState, useEffect } from "react";
import { FaUser } from 'react-icons/fa'
import { Link,useNavigate} from "react-router-dom";
import { register } from '../features/auth/authSlice';
import { toast } from 'react-toastify';
import Spinner from '../components/Spinner';
import {Box,Button,Typography,TextField} from "@mui/material"
function Register() {
    const [formValue, setFormValue] = useState({
        firstName: "",
        lastName: "",
        email:'',
        password:'',
        password2:'',
    })
    const {loading,error}= useSelector((state) => ({...state.auth}))
    const {firstName,lastName,email,password, password2} = formValue
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(()=>{
      error && toast.error (error)
    },[error]);
    const onChange =(e)=>{
setFormValue((prevState)=>({
    ...prevState,[e.target.name]:e.target.value,}))
    } 
    const onSubmit =(e)=>{
        e.preventDefault()
        if(password !== password2)
        {
          toast.error('Passwords do not match')
        }
        if(email && password && firstName && lastName && password2){
          dispatch(register({formValue,navigate,toast}))
        }
    }
    return  (
      <>
      <form onSubmit={onSubmit}>
        <Box maxWidth={600}
        display={"flex"} flexDirection="column" 
                 alignItems={'center'} justifyContent='center' 
                 boxShadow="10px 10px 20px #ccc "
                 padding={3}
                 margin='auto'
                 marginTop={5} borderRadius={5}>
                   <Typography variant='h6' padding={3} textAlign='center'>
                   <FaUser /> Register
     <p>Please create an account</p>
      </Typography>
            
                <TextField margin="normal" type="text" 
                 id='firstName'
                 name="firstName" value={firstName}
                 placeholder='Please enter your firstName'
                 label="FirstName"
                 onChange={onChange}/>
                
                
                <TextField  margin="normal" type="text" 
                 id='lastName'
                 name="lastName" value={lastName}
                 placeholder='Please enter your lastName'
                 label="LastName"
                 onChange={onChange}/>
                
               
                <TextField margin="normal" type="email" 
                 id='email'
                 name="email" value={email}
                 label="Email"
                 placeholder='Please enter your email address'
                 onChange={onChange}/>
               
                 
                <TextField  margin="normal"   type="password" 
                 id='password'
                 name="password" value={password}
                 label="password"
                 placeholder='Enter password'
                 onChange={onChange}/>
                 
                
                <TextField  margin="normal" type="password" 
                 id='password2'
                 name="password2" value={password2}
                 label="password2"
                 placeholder='Confirm your password'
                 onChange={onChange}/>
                 <Button  type='submit' variant='contained' sx={{marginTop:3,borderRadius:3}} color='warning'>
                    {loading && (
                  <Spinner 
                    size="sm"
                    role="status"
                    tag="span"
                    className="me-2"
                  />
                )}Submit</Button>
                 
                 </Box>
            </form>
         
        </>
      );
}

export default Register
