import{useDispatch, useSelector} from 'react-redux'
import { useState, useEffect } from "react";
import { FaUser } from 'react-icons/fa'
import { Link,useNavigate} from "react-router-dom";
import { register } from '../Redux/authSlice';
import { toast } from 'react-toastify';
import {Box,Button,Typography,TextField} from "@mui/material"
function Register() {
    const [formValue, setFormValue] = useState({
        firstName: "",
        lastName: "",
        email:'',
        password:'',
        password2:'',
    })
    const {loading,error}= useSelector((state) => state.auth)
    const {firstName,lastName,email,password, password2} = formValue
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(()=>{
      error && toast.error (error)
    },[error]);
    const onChange =(e)=>{
      setFormValue({...formValue,[e.target.name]:e.target.value})
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
      <Box  width={'40%'} component= "form" onSubmit={onSubmit}
        display={"flex"} flexDirection="column" 
                 alignItems={'center'} justifyContent='center' 
                 boxShadow="5px 5px 10px #ccc "
                 padding={3}
                 margin='auto'
                 marginTop={10} borderRadius={10}>
                   <Typography variant='h5' padding={3} textAlign='center'>
                   <FaUser /> Register
     <p>Please create an account</p>
      </Typography>
      <Box
                  display={'flex'}
                  flexDirection={'column'}
                  width={'60%'}
                  padding={5}
                  margin='auto' >
                    
                <TextField margin="normal" type="text" 
                 id='firstName'
                 name="firstName" value={firstName}
                 placeholder='Please enter your firstName'
                 label="FirstName"
                 required
                 fullWidth
                 onChange={onChange}/>
                
                
                <TextField   margin="normal" type="text" 
                 id='lastName'
                 name="lastName" value={lastName}
                 placeholder='Please enter your lastName'
                 label="LastName"
                 required
                 fullWidth
                 onChange={onChange}/>
                
               
                <TextField margin="normal" type="email" 
                 id='email'
                 name="email" value={email}
                 label="Email"
                 placeholder='Please enter your email address'
                 required
                 fullWidth
                 onChange={onChange}/>
               
                 
                <TextField  margin="normal"   type="password" 
                 id='password'
                 name="password" value={password}
                 label="password"
                 placeholder='Enter a password'
                 required
                 fullWidth
                 autoFocus
                 onChange={onChange}/>
                <TextField   size="normal" margin="normal" type="password" 
                 id='password2'
                 name="password2" value={password2}
                 label="password2"
                 placeholder='Confirm your password'
                 required
                 fullWidth
                 autoFocus
                 onChange={onChange}/>
            </Box>
                 <Button  type='submit' variant='contained' sx={{marginTop:3,borderRadius:3}} color='warning'>
                  Sign Up</Button>
                 <Button variant='contained' sx={{borderRadius:3,marginTop:3}}> 
                      <Link to='/Login'>
                      Change to Login</Link> </Button>
                 </Box>
           
         
        </>
      );
}

export default Register
