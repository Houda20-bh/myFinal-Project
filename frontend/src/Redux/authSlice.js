
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const register = createAsyncThunk(
  "/auth/register",
  async ({ formValue, navigate, toast }, { rejectWithValue}) => {
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/users",
        formValue);
      toast.success("Registred Successfully");
      navigate('/login');
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const login = createAsyncThunk(
    "auth/login",
    async ({ formValue, navigate,toast }, { rejectWithValue }) => {
      try {
        const {data} = await axios.post("http://localhost:5000/api/users/signin",formValue);
        localStorage.setItem("userInfos", JSON.stringify(data));
        toast.success("Logged Successfully");
        navigate("/blogs");
        return data;
      } catch (error) {
        return rejectWithValue(error?.response?.data);
      }
    }
  );
  export const logout = createAsyncThunk("auth/logout",async({ rejectWithValue })=>{
   try{
    await localStorage.removeItem("userInfos");
  } catch (error) {
    return rejectWithValue(error?.response?.data);
  }}
  );
  const user = localStorage.getItem("userInfos")
  ? JSON.parse(localStorage.getItem("userInfos"))
  : null;

const authSlice = createSlice({
  name: "auth",
  initialState: { 
    user: user,
  error:'',
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
        state.isLoggedIn= true;
    },
    [register.rejected]: (state, action) => {
        state.loading = false;
        state.error = action?.payload?.message;
        state.isLoggedIn= false;
        state.user =null;
    },
    [login.pending]: (state, action) => {
        state.loading = true;
      },
      [login.fulfilled]: (state, action) => {
        state.loading = false;
        state.user= action?.payload;
        state.isLoggedIn= true;
      },
      [login.rejected]: (state, action) => {
        state.loading = false;
        state.error = action?.payload?.message;
        state.isLoggedIn= false;
        state.user =null;
      },
      [logout.fulfilled]: (state, action) => {
        state.user= null;
        state.isLoggedIn= false;
      },
  },
});


export default authSlice.reducer;