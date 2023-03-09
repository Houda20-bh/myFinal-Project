
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
      navigate("/");
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
        const response = await axios.post("http://localhost:5000/api/users/signin",formValue);
        toast.success("Logged Successfully");
        navigate("/");
        return response.data;
      } catch (error) {
        return rejectWithValue(error?.response?.data);
      }
    }
  );
  export const logout = createAsyncThunk("auth/logout",async()=>{
    localStorage.removeItem('user')})

const authSlice = createSlice({
  name: "auth",
  initialState: { 
    user: null,
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
        state.user = action.payload;
        state.isLoggedIn= true;
    },
    [register.rejected]: (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
        state.isLoggedIn= false;
    },
    [login.pending]: (state, action) => {
        state.loading = true;
      },
      [login.fulfilled]: (state, action) => {
        state.loading = false;
        state.user = action.payload;
        localStorage.setItem("userInfos", JSON.stringify({ ...action.payload }));
        state.isLoggedIn= true;
      },
      [login.rejected]: (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
        state.isLoggedIn= false;
      },
      [logout.fulfilled]: (state, action) => {
        state.user = null;
      },
  },
});


export default authSlice.reducer;