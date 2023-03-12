
import Spinner from '../Components/Spinner';
import Blog from '../Components/Blog';
import { useSelector } from 'react-redux';
function Home() {
  // const {userExist } = useSelector((state) => state.auth.userLoggedIn);
  const {auth}= useSelector((state) => state);
 
  return (
    <>
       <center> 
         <br></br>
          <i> {auth?.userLoggedIn?.userExist
          ? `Welcome ${auth?.userLoggedIn?.userExist.name}`: "Eveyone"} </i>
          </center>
       <Blog />
    </>
  )
}

export default Home