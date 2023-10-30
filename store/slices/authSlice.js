import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Api from "../../api/Api";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const login = createAsyncThunk("login", async (data) => {
  const response = await Api.auth.login(data);
  return response;
});

export const register = createAsyncThunk("register", async (registerData) => {
  const response = await Api.auth.register(registerData);
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
      error: false,
    },
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.loginUser.result = action.payload;
      state.loginUser.error = false;
      AsyncStorage.setItem("user", JSON.stringify(state.loginUser.result))
        .then(() => console.log("User saved"))
        .catch((error) => console.error("Error saved: ", error));
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
