import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
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
// / Logout user
// const logout = () => {
//   localStorage.removeItem('user')
// }

 const authSlice = createSlice({
    name: 'auth',
    initialState:{
    user: null,
    error:'',
   loading: false,
   isLoggedIn: false,
  },
    reducers:{
      login(state){state.isLoggedIn= true}, 
      logout(state){state.isLoggedIn= false},
    },
    extraReducers: {
      [login.pending]: (state, action) => {
        state.loading = true;
      },
      [login.fulfilled]: (state, action) => {
        state.loading = false;
        // localStorage.setItem("profile", JSON.stringify({ ...action.payload }));
        localStorage.setItem("userId",JSON.stringify({ ...action.payload }));
        state.user = action.payload;
        state.isLoggedIn= true;
      },
      [login.rejected]: (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
        state.isLoggedIn= false;
      },
      [register.pending]: (state, action) => {
        state.loading = true;
      },
      [register.fulfilled]: (state, action) => {
        state.loading = false;
        localStorage.setItem("profile", JSON.stringify({ ...action.payload }));
        state.user = action.payload;
        state.isLoggedIn= true;
      },
      [register.rejected]: (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
        state.isLoggedIn= false;
      },
      [logout.fulfilled]: (state, action) => {
        state.user = null;
      },
    }
    })
    export const authActions = authSlice.actions
    export default authSlice.reducer