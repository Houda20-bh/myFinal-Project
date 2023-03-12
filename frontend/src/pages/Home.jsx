
import Spinner from '../Components/Spinner';
import Blog from '../Components/Blog';
import { useSelector } from 'react-redux';
function Home() {
 
  const {auth}= useSelector((state) => state);
 
  return (
    <>
       <center> 
         <br></br>
          <i> {auth?.user
          ? `Welcome ${auth?.user.name}`: "Eveyone"} </i>
          </center>
       <Blog />
    </>
  )
}

export default Home