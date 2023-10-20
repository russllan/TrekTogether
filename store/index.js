import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSliceReducer from "./slices/authSlice";

const reducers = combineReducers({
  auth: authSliceReducer,
});

export const store = configureStore({
  reducer: reducers
});
