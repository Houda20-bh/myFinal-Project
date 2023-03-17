import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const register = createAsyncThunk(
  "/auth/register",
  async ({ formValue, navigate, toast }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/users/signup",
        formValue
      );
      toast.success("Registred Successfully");
      navigate("/login");
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const login = createAsyncThunk(
  "auth/login",
  async ({ formValue, navigate, toast }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/users/signin",
        formValue
      );
      localStorage.setItem("userInfos", JSON.stringify(data));
      toast.success("Logged Successfully");
      navigate("/blogs");
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);
export const logout = createAsyncThunk(
  "user/logout",
  async (payload, { rejectWithValue }) => {
    try {
      await localStorage.removeItem("userInfos");
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const getConnectedUser = createAsyncThunk(
  "user/getuser",
  async (paylaod, { rejectWithValue, getState }) => {
    const auth = getState()?.auth;
    const { user } = auth;
    const config = {
      headers: { Authorization: `Bearer ${user?.token}` },
    };
    try {
      const { data } = await axios.get(
        `http://localhost:5000/api/users/singleUser/${user?.user?.id} `,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

const user = localStorage.getItem("userInfos")
  ? JSON.parse(localStorage.getItem("userInfos"))
  : null;

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: user,
    error: "",
    loading: false,
    isLoggedIn: false,
  },
  extraReducers: {
    [register.pending]: (state, action) => {
      state.loading = true;
    },
    [register.fulfilled]: (state, action) => {
      state.loading = false;
      state.user = action?.payload;
      state.isLoggedIn = true;
    },
    [register.rejected]: (state, action) => {
      state.loading = false;
      state.error = action?.payload?.message;
      state.isLoggedIn = false;
      state.user = null;
    },
    [login.pending]: (state, action) => {
      state.loading = true;
    },
    [login.fulfilled]: (state, action) => {
      state.loading = false;
      state.user = action?.payload;
      state.isLoggedIn = true;
    },
    [login.rejected]: (state, action) => {
      state.loading = false;
      state.error = action?.payload?.message;
      state.isLoggedIn = false;
      state.user = null;
    },
    [logout.pending]: (state, action) => {
      state.loading = true;
    },
    [logout.fulfilled]: (state, action) => {
      state.loading = false;
      state.user = null;
      window.location.reload();
      state.appErr = undefined;
      state.serverErr = undefined;
    },
    [logout.rejected]: (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    },
    [getConnectedUser.pending]: (state, action) => {
      state.loading = true;
    },
    [getConnectedUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.connectedUser = action?.payload;
    },
    [getConnectedUser.rejected]: (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    },
  },
});

export default authSlice.reducer;