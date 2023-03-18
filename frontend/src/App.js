import React from "react";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./Components/Header";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Blogs from "./Components/Blogs";
import AddBlog from "./Components/AddBlog";
import UserBlogs from "./Components/UserBlogs";
import BlogDetail from "./Components/BlogDetail";
function App() {
  const { isLoggedIn } = useSelector((state) => state.auth);
  return (
    <React.Fragment>
      <Router>
        <header>
          <ToastContainer />
          <Header />
        </header>
        <main>
          <Routes>
          {!isLoggedIn ? (
            <>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            </>
            ) : (
              <>
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/blogs/add" element={<AddBlog />} />
            <Route path="/myBlogs" element={<UserBlogs />} />
            <Route path="/myBlogs/:id" element={<BlogDetail />} />
            </>
          )}
          </Routes>
        </main>
      </Router>
    </React.Fragment>
  );
}

export default App;