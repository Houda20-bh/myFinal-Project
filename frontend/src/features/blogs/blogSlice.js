import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";
const initialState= {
  blog: {},
  blogs:[],
  userBlogs:[],
  error: "",
  loading: false,
}


export const getAllBlogs = createAsyncThunk("blog/getAll", async (blogs,{ rejectWithValue }) => {
  try {
    const response = await api.getAllBlogs(blogs);
    return response.data;
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
});


export const getBlogsByUser = createAsyncThunk(
  "blog/getBlogsByUser",
  async (userId,{rejectWithValue}) => {
    try {
      const response = await api.getBlogsByUser(userId);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const createBlog = createAsyncThunk("blog/createBlog",
  async ({blogData, navigate, toast }, { rejectWithValue }) => {
    try {
      const response = await api.createBlog(blogData);
      toast.success("Blog Added Successfully");
      navigate("/");
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const blogSlice = createSlice({
    name: "blog",
    initialState,
    reducer:{},
    // reducers: {
    //  reset: (state) => initialState
    // },
    extraReducers: {

      [createBlog.pending]: (state, action) => {
        state.loading = true;
      },
      [createBlog.fulfilled]: (state, action) => {
        state.loading = false;
        state.blog=action.payload;
       
      },
      [createBlog.rejected]: (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
    },
    [getAllBlogs.pending]: (state, action) => {
      state.loading = true;
    },
    [getAllBlogs.fulfilled]: (state, action) => {
      state.loading = false;
      state.blogs = action.payload;
    },
    [getAllBlogs.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
  
    [getBlogsByUser.pending]: (state, action) => {
      state.loading = true;
    },
    [getBlogsByUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.userBlogs= action.payload;
    },
    [getBlogsByUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
},
});

export default blogSlice.reducer;