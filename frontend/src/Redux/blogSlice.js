import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const getAllBlogs = createAsyncThunk("blogs/getAll", async (page, {rejectWithValue}) => {
  try {
    const { data } = await axios.get(`http://localhost:5000/api/blogs?page=${page}`);
    return data;
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
});
export const SearchBlog = createAsyncThunk("/blog/search", async (searchQuery,{rejectWithValue}) => {
  try {
    const { data } = await axios.get(`http://localhost:5000/api/blogs/search?searchQuery=${searchQuery}`);
    return data;
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
});
export const getBlog = createAsyncThunk("blog/getblog", async (id) => {
  try {
    const { data } = await axios.get(`http://localhost:5000/api/blogs/${id}`);
    return data;
  } catch (error) {
    console.log(error);
  }
});
export const createBlog = createAsyncThunk(
  "blog/create",
  async (
    { blogData, navigate, toast },
    { rejectWithValue, getState }
  ) => {
    const auth = getState()?.auth;
    const { user } = auth;
    const config = {
      headers: { Authorization: `Bearer ${user?.token}` },
    };

    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/blogs",
        blogData,
        config
      );
      toast.success("blog Added Successfully");
      navigate("/blogs");
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const updateBlog = createAsyncThunk(
  "blog/update",
  async (
    { id, updatedBlog, navigate, toast },
    { rejectWithValue, getState }
  ) => {
    const auth = getState()?.auth;
    const { user } = auth;
    const config = {
      headers: { Authorization: `Bearer ${user?.token}` },
    };
    try {
      const { data } = await axios.put(
        `http://localhost:5000/api/blogs/${id}`,
        updatedBlog,
        config
      );
      toast.success("blog updated Successfully");
      navigate("/");

      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
export const likeBlog = createAsyncThunk(
  "blog/like",
  async (
    {id}, { rejectWithValue,getState }
  ) => {
    const auth = getState()?.auth;
    const { user } = auth;
    const config = {
      headers: { Authorization: `Bearer ${user?.token}` },
    };
    try {
      const { data } = await axios.patch(
         `http://localhost:5000/api/blogs/like/${id}`,
        config
      );
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
export const deleteBlog = createAsyncThunk(
  "blog/delete",
  async ({id, toast}, { rejectWithValue, getState }) => {
    const auth = getState()?.auth;
    const { user } = auth;
    const config = {
      headers: { Authorization: `Bearer ${user?.token}` },
    };
    try {
      const { data } = await axios.delete(
        `http://localhost:5000/api/blogs/${id}`,
        config
      );
      toast.success("blog deleted Successfully");
      
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const blogSlice = createSlice({
  name: "blog",
  initialState: 
  {
    blog:{},
    currentPage:1,
    numberOfPages:null,
   },
  reducers: {
    EditBlog: (state, action) => {
      state.blogList.map((el) =>
      el._id === action.payload ? (el.isEdited = !el.isEdited) : el.isEdited
      );
    },
    setCurrentPage:(state,action)=>{
      state.currentPage = action.payload;
    }
  },
  extraReducers: {
    [getAllBlogs.pending]: (state, action) => {
      state.loading = true;
    },
    [getAllBlogs.fulfilled]: (state, action) => {
      state.loading = false;
      state.blogList = action?.payload.data;
      state.numberOfPages=action?.payload.numberOfPages;
      state.currentPage=action?.payload.currentPage;
    },
    [getAllBlogs.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [getBlog.pending]: (state, action) => {
      state.loading = true;
    },
    [getBlog.fulfilled]: (state, action) => {
      state.loading = false;
      state.blog = action?.payload;
    },
    [getBlog.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [createBlog.pending]: (state, action) => {
      state.loading = true;
    },
    [createBlog.fulfilled]: (state, action) => {
      state.loading = false;
      window.location.reload();
      state.userBlogs = action?.payload;
    },
    [createBlog.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [updateBlog.pending]: (state, action) => {
      state.loading = true;
    },
    [updateBlog.fulfilled]: (state, action) => {
      state.loading = false;
      state.updatedBlog = action?.payload;
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
      window.location.reload();
      const{arg}=action.meta;
      if(arg){
        state.userBlogs=state.userBlogs.filter((item)=>item._id !==arg);
        state.blogList=state.blogList.filter((item)=>item._id !==arg);}
      state.deletedBlog = action?.payload;
      },
    [deleteBlog.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [updateBlog.pending]: (state, action) => {
      state.loading = true;
    },
    [updateBlog.fulfilled]: (state, action) => {
      state.loading = false;
      state.updatedBlog = action?.payload;
    },
    [updateBlog.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [SearchBlog.pending]: (state, action) => {
      state.loading = true;
    },
    [SearchBlog.fulfilled]: (state, action) => {
      state.loading = false;
      state.blogList= action.payload;
    },
    [SearchBlog.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [likeBlog.pending]: (state, action) => { },
    [likeBlog.fulfilled]: (state, action) => {
      state.loading = false;
      const {
        arg: { _id },
      } = action.meta;
      if (_id) {
        state.blogList = state.blogList.map((item) =>
          item._id === _id ? action.payload : item
        );
      }
    },
    [likeBlog.rejected]: (state, action) => {
      state.error = action.payload.message;
    },
  },
});

export default blogSlice.reducer;
export const { EditBlog , setCurrentPage} = blogSlice.actions;