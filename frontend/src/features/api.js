import axios from 'axios'
const API = axios.create({baseURL:"http://localhost:5000"})
API.interceptors.request.use((req) => {
    if (localStorage.getItem("profile")) {
      req.headers.Authorization = `Bearer ${
        JSON.parse(localStorage.getItem("profile")).token
      }`;
    }
    return req;
  });
export const signIn = (formData)=> API.post('/api/users/signin',formData)
export const signup = (formData)=> API.post('/api/users/',formData);
export const getAllBlogs = (blogs)=> API.get('/api/blogs',blogs);
export const getBlogsByUser = (userId) => API.get(`/api/userBlogs/${userId}`);
export const createBlog = (blogData) => API.post('/api/blogs/',blogData);