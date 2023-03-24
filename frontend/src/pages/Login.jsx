
import { useState, useEffect } from "react";
import {FaSignInAlt } from 'react-icons/fa'
import { Link} from "react-router-dom";
import{useDispatch, useSelector} from"react-redux"
import {useNavigate} from'react-router-dom';
import {toast} from 'react-toastify';
import { login } from '../Redux/authSlice';
import {Box,Button,Typography,TextField} from "@mui/material"
function Login() {
    const [formValue, setFormValue] = useState({
        email:'',
        password:'',  
    })
    const { loading, error,user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate()
    useEffect(() => {
      error && toast.error(error);
    }, [error]);
    const onChange =(e)=>{
      setFormValue({...formValue,[e.target.name]:e.target.value})
    } 
    const onSubmit =(e)=>{
        e.preventDefault()
          dispatch (login({formValue,navigate,toast}))
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
                  <Box
                  display={'flex'}
                  flexDirection={'column'}
                  width={'60%'}
                  padding={5}
                  margin='auto'>

                  
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
                 </Box>
                 
                    <Button   type="submit" variant='contained'  
                     sx={{borderRadius:3,marginTop:3}} color='warning'>
          {loading && (<div class="spinner-border" role="status">
  <span class="sr-only">Loading...</span>
</div>
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