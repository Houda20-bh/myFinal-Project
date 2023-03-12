
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const getAllBlogs = createAsyncThunk('blogs/getAll', async()=>{
    try{
        const {data} = await axios.get("http://localhost:5000/api/blogs")
       return data;
    }
    catch(error){console.log(error)}
 })
 export const createBlog = createAsyncThunk("blog/create",async (payload, { rejectWithValue, getState, dispatch }) => {
     const token = thunkAPI.getState().auth.user.token
     const auth = getState()?.auth;
     const {user} = auth;
     const config = {
       headers: { Authorization: `Bearer ${user?.token}` },
     };

  try {
    const { data } = await axios.post("http://localhost:5000/api/blogs",blogData,config)
    toast.success("blog Added Successfully")
      navigate("/");
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  });
  export const getBlogsByuser = createAsyncThunk('user/getUserBlogs', async(userId, 
    { rejectWithValue, dispatch,thunkAPI})=>{
      const token = thunkAPI.getState().auth.user.token
      const config = {
       headers: {
         Authorization: `Bearer ${token}`,
       },
     };
try{
    const {data} = axios.get(`http://localhost:5000/api/blogs/user/${userId}`,config)
    return data;
}
    catch (err) {
      return rejectWithValue(err.response.data);
    }
  });

const blogSlice = createSlice({
    name:'blog',
    initialState:{
      blogs:[],
    },
    extraReducers: {
        [getAllBlogs.pending]: (state, action) => {
            state.loading = true;
          },
          [getAllBlogs.fulfilled]: (state, action) => {
            state.loading = false;
            state.blogList = action?.payload;
          },
          [getAllBlogs.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
          },
          [createBlog.pending]: (state, action) => {
            state.loading = true;
          },
          [createBlog.fulfilled]: (state, action) => {
            state.loading = false;
            state.goals.push(action?.payload);
          },
          [createBlog.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
          },
          [getBlogsByuser.pending]: (state, action) => {
            state.loading = true;
          },
          [getBlogsByuser.fulfilled]: (state, action) => {
            state.loading = false;
            state.userBlogs= action?.payload;
          },
          [getBlogsByuser.rejected]: (state, action) => {
            state.loading = false;
            state.error = action?.payload?.message;
          },
    }

});

export default blogSlice.reducer;