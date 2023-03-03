import { createSlice, createAsyncThunk, isRejectedWithValue } from '@reduxjs/toolkit'
import* as api from "../api"
export const login = createAsyncThunk("auth/login",async({formValue,navigate,toast},{rejectWithValue})=>{
  try{
    const response = await api.signIn(formValue)
    toast.success('login successfully')
    navigate('/')
    return response.data
  }
  catch(err){
   return rejectWithValue(err.response.data)
  }
})
export const register = createAsyncThunk("auth/register",async({formValue,navigate,toast},{rejectWithValue})=>{
  try{
    const response = await api.signup(formValue)
    toast.success('register successfully')
    navigate('/')
    return response.data
  }
  catch(err){
   return rejectWithValue(err.response.data)
  }
})
export const logout = createAsyncThunk("auth/logout",async()=>{
  localStorage.removeItem('user')
})
/// Logout user
// const logout = () => {
//   localStorage.removeItem('user')
// }

 const authSlice = createSlice({
    name: 'auth',
    initialState:{
      user: null,
    error:'',
   loading: false,
  },
    reducers:{},
    extraReducers: {
      [login.pending]: (state, action) => {
        state.loading = true;
      },
      [login.fulfilled]: (state, action) => {
        state.loading = false;
        localStorage.setItem("profile", JSON.stringify({ ...action.payload }));
        state.user = action.payload;
      },
      [login.rejected]: (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      },
      [register.pending]: (state, action) => {
        state.loading = true;
      },
      [register.fulfilled]: (state, action) => {
        state.loading = false;
        localStorage.setItem("profile", JSON.stringify({ ...action.payload }));
        state.user = action.payload;
      },
      [register.rejected]: (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      },
      [logout.fulfilled]: (state, action) => {
        state.user = null;
      },
    }
    })
    export default authSlice.reducer