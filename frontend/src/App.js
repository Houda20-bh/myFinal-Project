import { useEffect } from "react";
import React from "react";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useDispatch } from "react-redux";
import { setUser } from "./Redux/authSlice";
import "react-toastify/dist/ReactToastify.css";
import Header from "./Components/Header";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Blogs from "./Components/Blogs";
import AddBlog from "./Components/AddBlog";
import UserBlogs from "./Components/UserBlogs";
import BlogDetail from "./Components/BlogDetail";
import  SingleBlog from './Pages/SingleBlog.jsx'
import PrivateRoute from './Components/PrivateRoute'
import NotFound from "./Pages/NotFound";
function App() {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));
  useEffect(() => {
    dispatch(setUser(user));
  }, []);
  return (
   
    <React.Fragment>
      <Router>
        <header>
          <Header />
        </header>
        <main>
        <ToastContainer />
          <Routes>
       
            <>
            <Route path="/" element={<Home />} />
            <Route path="blogs/search" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/blog/:id" element={<SingleBlog />} />
            </>
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/blogs/add" element={ <PrivateRoute><AddBlog /></PrivateRoute>} />
            <Route path="/myBlogs" element={<PrivateRoute><UserBlogs /></PrivateRoute>} />
            <Route path="/myBlogs/:id" element={<PrivateRoute><BlogDetail /></PrivateRoute>} /> 
            <Route path="*" element={<NotFound />} />
         </Routes>
        </main>
      </Router>
    </React.Fragment>
  );
}

export default App;