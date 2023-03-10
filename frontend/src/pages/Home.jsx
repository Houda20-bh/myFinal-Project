
import Spinner from '../Components/Spinner';
import Blog from '../Components/Blog';
import { useSelector } from 'react-redux';
function Home() {
  const {blog} = useSelector((state)=>state.blogs)
  return (
    <>
        <h1><center> welcome </center></h1>
        <Blog />
    </>
  )
}

export default Home