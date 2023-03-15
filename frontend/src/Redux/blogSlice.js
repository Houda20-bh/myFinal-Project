
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const getAllBlogs = createAsyncThunk('blogs/getAll', async()=>{
    try{
        const {data} = await axios.get("http://localhost:5000/api/blogs")
       return data;
    }
    catch(error){console.log(error)}
 })
 export const createBlog = createAsyncThunk("blog/create",async ({blogData, navigate, toast },{ rejectWithValue,getState, dispatch }) => {
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

  export const getBlogsByuser = createAsyncThunk('user/getUserBlogs', async({id}, 
    { rejectWithValue,getState})=>{
      const auth = getState()?.auth;
      const {user} = auth;
      const config = {
       headers: {
         Authorization: `Bearer ${user?.token}`,
       },
     };
try{
    const {data} = axios.get(`http://localhost:5000/api/blogs/user/${id}`,config)
    return data;
}
    catch (err) {
      return rejectWithValue(err.response.data);
    }
  });
  export const updateBlog = createAsyncThunk('blog/update',async({inputs,id, navigate, toast},{rejectWithValue,getState})=>{
    const auth = getState()?.auth;
    const {user} = auth;
    const config = {
      headers: { Authorization: `Bearer ${user?.token}` },
    };
    try{
      const { data } = await axios.put(`http://localhost:5000/api/blogs/${id}`,{inputs},config)
      toast.success("blog updated Successfully")
      navigate("/blogs");
     
        return data;
}
 catch (err) {
  return rejectWithValue(err.response.data);
}
  })
  export const deleteBlog = createAsyncThunk('blog/delete',async({id,toast,navigate},{rejectWithValue,getState})=>{
    const auth = getState()?.auth;
    const {user} = auth;
    const config = {
      headers: { Authorization: `Bearer ${user?.token}` },
    };
    try{
      const { data } = await axios.put(`http://localhost:5000/api/blogs/${id}`,config)
      navigate('/blogs');
      toast.success("blog deleted Successfully")
        return data;
}
    catch(err) {
      return rejectWithValue(err.response.data);
    }
  })

const blogSlice = createSlice({
    name:'blog',
    initialState:{
      isEdited :false,
    },
    reducers: {
      EditBlog: (state, action) => {
        state.blogList.map((el) =>
          el._id === action.payload ? (el.isEdited = !el.isEdited) : el.isEdited
        );
      },
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
         state.userBlogs= action?.payload;
           
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
            state.userBlogs=action?.payload;
          },
          [getBlogsByuser.rejected]: (state, action) => {
            state.loading = false;
            state.error = action?.payload?.message;
          },
          [updateBlog.pending]: (state, action) => {
            state.loading = true;
          },
          [updateBlog.fulfilled]: (state, action) => {
            state.loading = false;
            state.updatedBlog= action?.payload;
           
          },
          [updateBlog.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
          },
          [deleteBlog.pending]: (state, action) => {
            state.loading = true;
          },
          [deleteBlog.fulfilled]: (state, action) => {
            state.loading = false;
            state.deletedBlog= action?.payload;
           
          },
          [deleteBlog.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
          },
    }

});

export default blogSlice.reducer;
export const { EditBlog } = blogSlice.actions;