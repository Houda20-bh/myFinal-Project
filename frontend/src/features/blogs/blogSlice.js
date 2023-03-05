import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";

export const createBlog = createAsyncThunk("blog/createBlog",
  async ({blogData, navigate, toast }, { rejectWithValue }) => {
    try {
      const response = await api.createBlog(blogData);
      toast.success("Blog Added Successfully");
      navigate("/");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const blogSlice = createSlice({
    name: "blog",
    initialState: {
      blog: {},
      blogs:[],
      userBlogs:[],
      error: "",
      loading: false,
    },
    reducer:{
      addBlog: (state,action)=> {
      state.blogs.push(action.payload)
       },},
    // reducers: {
    //  reset: (state) => initialState
    // },
    extraReducers: {

      [createBlog.pending]: (state, action) => {
        state.loading = true;
      },
      [createBlog.fulfilled]: (state, action) => {
        state.loading = false;
        state.blogs=[action.payload];
       
      },
      [createBlog.rejected]: (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      

    }
},
});
export const {addBlog} =blogSlice.actions;

export default blogSlice.reducer;