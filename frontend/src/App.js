import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddBlog from './components/AddBlog';
import BlogDetails from './components/BlogDetails';
import Blogs from './components/Blogs';
import Header from './components/Header';
import UserBlogs from './components/UserBlogs';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
function App() {
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
            <Route path='/myBlogs/add' element={<AddBlog />} />
            <Route path='/myBlogs' element={<UserBlogs />} />
            <Route path='/myBlogs/:id' element={<BlogDetails />} />
           
          </Routes>
          </main>
          <ToastContainer /> 
      </Router>
    </React.Fragment>
  );
}

export default App;
