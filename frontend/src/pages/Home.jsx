
import { useSelector } from 'react-redux';
import {Box,Typography} from "@mui/material";
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
    <img 
      src="https://waynesboro.va.us/ImageRepository/Document?documentID=9249"
      alt='Positive vibes' width={'100%'} height='60%'
      />
   </Box>

   </center>
    </>
  )
}

export default Home