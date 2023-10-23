import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Api from "../../api/Api";

export const login = createAsyncThunk("login", async (data) => {
  const response = await Api.auth.login(data);
  console.log(response);
  return response;
});

export const register = createAsyncThunk("register", async (registerData) => {
  const response = await Api.auth.register(registerData);
  console.log(response)
  return response;
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    loginUser: {
      result: [],
      error: false,
    },
    registerUser: {
      result: [],
      error: false
    },
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.loginUser.result = action.payload;
      state.loginUser.error = false;
    });
    builder.addCase(register.fulfilled, (state, action) => {
      state.registerUser.result = action.payload;
      state.loginUser.error = false;
    });
    builder.addCase(register.rejected, (state) => {
        state.registerUser.error = true;
      });
      builder.addCase(login.rejected, (state) => {
        state.loginUser.error = true;
      });
  },
});

export const authSliceAction = authSlice.actions;
export default authSliceReducer = authSlice.reducer;
