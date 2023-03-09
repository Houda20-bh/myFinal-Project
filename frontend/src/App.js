import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddBlog from './Components/AddBlog';
import Blog from './Components/Blog';
import Blogs from './Components/Blogs';
import Header from './Components/Header';
import UserBlogs from './Components/UserBlogs';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Register from './Pages/Register';
function App() {
const {isLoggedIn }= useSelector (state=>state.auth)
  console.log(isLoggedIn);
  return (
    <React.Fragment>
    <Router>
        <header>
          <Header />
          </header>
          <main>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/blogs' element={<Blogs />} />
            <Route path='/blogs/add' element={<AddBlog />} />
            <Route path='/myBlogs' element={<UserBlogs />} />
            <Route path='/myBlogs/:id' element={<Blog />} />
           
          </Routes>
          </main>
          <ToastContainer /> 
      </Router>
    </React.Fragment>
  );
}

export default App;