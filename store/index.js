import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSliceReducer from "./slices/authSlice";
import tripSliceReducer from "./slices/tripSlice";

const reducers = combineReducers({
  auth: authSliceReducer,
  trip: tripSliceReducer
});

export const store = configureStore({
  reducer: reducers
});
