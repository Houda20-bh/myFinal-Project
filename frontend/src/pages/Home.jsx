import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Spinner from '../components/Spinner'
import BlogForm from '../components/Blog'
function Home() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {user}=useSelector ((state)=>state.auth);
  useEffect(() => {
    if (!user) {
      navigate('/login')
    }
  },[user,navigate])
  return (
    <>
  <section className='heading'>
        <h1>Welcome {user && user.name}</h1>
        <p>Blogs Dashboard</p>
      </section>

      <BlogForm />
    </>
  )
}

export default Home