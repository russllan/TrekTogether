import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSliceReducer from "./slices/authSlice";
import tripSliceReducer from "./slices/tripSlice";
import reviewSliceReducer from "./slices/reviewSlice";

const reducers = combineReducers({
  auth: authSliceReducer,
  trip: tripSliceReducer,
  review: reviewSliceReducer
});

export const store = configureStore({
  reducer: reducers
});
