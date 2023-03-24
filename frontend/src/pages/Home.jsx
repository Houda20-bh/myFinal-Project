
import { useSelector } from 'react-redux';
import Blog from '../Components/Blog';
import blogSlice from '../Redux/blogSlice';
import {Link} from 'react-router-dom'
import img1 from '../Images/positive.jpg'
import { Button,Typography,LinkComponent,Box } from "@mui/material";
function Home() {
 
  const {auth}= useSelector((state) => state);
 
  return (
    <>
       <center> 
        <Box
   width="100%"
   height="30%"
   display={'flex'}
   flexDirection={'column'}
   >
     <Typography  variant='h2' textAlign={"center"} width={'80%'} padding={4}>
          Let it challenge you to change you! 
    </Typography>
   </Box>
         <br></br>
          <h1><i> {auth?.user
          ? `Welcome ${auth?.user?.user?.name}`: "Welcome Everyone"} </i></h1>
          <br></br>
   <Box position={'relative'} width={'100%'} height='90vh'>
    <img src={img1} alt='Positive vibes' width={'100%'} height='60%'/>
   </Box>
   <Box margin="auto">
   <Button LinkComponent={Link} to='/login' variant='outlined' sx={{mr:2}}> Share Your Post
    </Button>
    <Button  LinkComponent={Link} to='/blogs' variant='contained' sx={{ml:2}}> View Your Posts</Button>
   </Box>
   </center>
    </>
  )
}

export default Home