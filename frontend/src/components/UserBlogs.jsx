import { getBlogsByUser } from '../features/blogs/blogSlice';
import {useEffect, useState} from 'react';
import { useSelector, useDispatch } from "react-redux";
import Blog from './Blog';
function UserBlogs(props) {
    const {user}= useSelector (state=>state.auth)
    const {userBlogs,loading} = useSelector(state=>state.blogs );
    const userId = user._id;
const dispatch = useDispatch();
  useEffect(() => {
    if (userId) {
      dispatch(getBlogsByUser(userId));
    }
  },[userId]);
    return (
        <div>
           
        {user && userBlogs && userBlogs.map((blog)=>(<Blog
        title={blog.title} description={blog.description} imageUrl={blog.image}
        userName={user.name} key={blog.id}/>))}
        </div>
    )
}
export default UserBlogs