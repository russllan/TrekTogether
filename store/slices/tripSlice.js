import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Api from "../../api/Api";

export const trip = createAsyncThunk("trip", async (data) => {
  const response = await Api.trip.trip(data);
  console.log(response);
  return response;
});

export const addTrip = createAsyncThunk("addTrip", async (addTripData) => {
  const response = await Api.trip.addTrip(addTripData);
  return response;
});

export const getUsers = createAsyncThunk("getUser", async (id) => {
  const response = await Api.trip.getUsers(id);
  return response;
});

export const car = createAsyncThunk("car", async (carData) => {
  const response = await Api.trip.postCar(carData);
  return response;
});

const tripSlice = createSlice({
  name: "trip",
  initialState: {
    Trip: {
      result: [],
      error: false,
      isLoading: true,
    },
    AddTrip: {
      result: [],
      error: false,
    },
    User: {
      result: [],
      error: false,
    },
    Car: {
      result: [],
      error: false,
    },
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(trip.fulfilled, (state, action) => {
      state.Trip.result = action.payload;
      state.Trip.error = false;
      state.Trip.isLoading = false;
    });
    builder.addCase(addTrip.fulfilled, (state, action) => {
      state.AddTrip.result = action.payload;
      state.AddTrip.error = false;
    });
    builder.addCase(getUsers.fulfilled, (state, action) => {
      state.User.result = action.payload;
      state.User.error = false;
    });
    builder.addCase(trip.rejected, (state) => {
      state.Trip.error = true;
    });
    builder.addCase(addTrip.rejected, (state) => {
      state.AddTrip.error = true;
    });
    builder.addCase(getUsers.rejected, (state) => {
      state.User.error = true;
    });
    builder.addCase(car.fulfilled, (state, action) => {
      state.Car.result = action.payload;
      state.Car.error = false;
    });
    builder.addCase(car.rejected, (state) => {
      state.Car.error = true;
    });
  },
});

export const tripSliceAction = tripSlice.actions;
export default tripSliceReducer = tripSlice.reducer;
