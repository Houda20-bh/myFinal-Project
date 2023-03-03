import axios from 'axios'
const API = axios.create({baseURL:"http://localhost:5000"})
export const signIn = (formData)=> API.post('/api/users/signin',formData)
export const signup = (formData)=> API.post('/api/users/',formData)