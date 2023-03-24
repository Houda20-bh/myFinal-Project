import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const getAllBlogs = createAsyncThunk("blogs/getAll", async () => {
  try {
    const { data } = await axios.get("http://localhost:5000/api/blogs");
    return data;
  } catch (error) {
    console.log(error);
  }
});
export const createBlog = createAsyncThunk(
  "blog/create",
  async (
    { blogData, navigate, toast },
    { rejectWithValue, getState, dispatch }
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
      navigate("/myblogs");
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
  initialState: {
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
      state.deletedBlog = action?.payload;
    },
    [deleteBlog.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
  },
});

export default blogSlice.reducer;
export const { EditBlog } = blogSlice.actions;