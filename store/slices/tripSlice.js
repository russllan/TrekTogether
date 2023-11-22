import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Api from "../../api/Api";

export const trip = createAsyncThunk("trip", async (data) => {
  const response = await Api.trip.trip(data);
  console.log(response);
  return response;
});

export const addTrip = createAsyncThunk("addTrip", async (addTripData) => {
  console.log(addTripData);
  const response = await Api.trip.addTrip(addTripData);
  console.log(response);
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

export const bookTrip = createAsyncThunk("book", async (bookData) => {
  const response = await Api.trip.bookTrip(bookData);
  console.log(response);
  return response;
});

export const getTrip = createAsyncThunk("getTrip", async (getTripId) => {
  const response = await Api.trip.getTrip(getTripId);
  return response;
});

const initState = {
  Trip: {
    result: [],
    error: false,
    isLoading: true,
  },
  AddTrip: {
    result: [],
    error: false,
    isLoading: true,
  },
  User: {
    result: [],
    error: false,
    isLoading: true,
  },
  Car: {
    result: [],
    error: false,
    isLoading: true,
  },
  Book: {
    result: [],
    error: false,
    isLoading: true,
  },
  GetTrip: {
    result: [],
    error: false,
    isLoading: true
  }
};

const tripSlice = createSlice({
  name: "trip",
  initialState: initState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(trip.fulfilled, (state, action) => {
      state.Trip.result = action.payload;
      state.Trip.error = false;
      state.Trip.isLoading = false;
    });
    builder.addCase(trip.pending, (state) => {
      state.Trip.isLoading = true;
    });
    builder.addCase(trip.rejected, (state) => {
      state.Trip.error = true;
      state.Trip.isLoading = false;
    });
    builder.addCase(addTrip.fulfilled, (state, action) => {
      state.AddTrip.result = action.payload;
      state.AddTrip.error = false;
      state.AddTrip.isLoading = false;
    });
    builder.addCase(addTrip.pending, (state) => {
      state.AddTrip.isLoading = true;
    });
    builder.addCase(addTrip.rejected, (state) => {
      state.AddTrip.error = true;
      state.AddTrip.isLoading = false;
    });
    builder.addCase(getUsers.fulfilled, (state, action) => {
      state.User.result = action.payload;
      state.User.error = false;
      state.User.isLoading = false;
    });
    builder.addCase(getUsers.pending, (state) => {
      state.User.isLoading = true;
    });
    builder.addCase(getUsers.rejected, (state) => {
      state.User.error = true;
      state.User.isLoading = false;
    });
    builder.addCase(car.fulfilled, (state, action) => {
      state.Car.result = action.payload;
      state.Car.error = false;
    });
    builder.addCase(car.pending, (state) => {
      state.Car.isLoading = true;
    });
    builder.addCase(car.rejected, (state) => {
      state.Car.error = true;
      state.Car.isLoading = false;
    });
    builder.addCase(bookTrip.fulfilled, (state, action) => {
      state.Book.result = action.payload;
      state.Book.error = false;
      state.Book.isLoading = false;
    });
    builder.addCase(bookTrip.pending, (state) => {
      state.Book.isLoading = true;
    });
    builder.addCase(bookTrip.rejected, (state) => {
      state.Book.error = true;
      state.Book.isLoading = false;
    });
    builder.addCase(getTrip.fulfilled, (state, action) => {
      state.GetTrip.result = action.payload;
      state.GetTrip.isLoading = false;
    });
    builder.addCase(getTrip.pending, (state) => {
      state.GetTrip.isLoading = true;
    });
    builder.addCase(getTrip.rejected, (state) => {
      state.GetTrip.error = true;
      state.GetTrip.isLoading = false;
    });
  },
});

export const tripSliceAction = tripSlice.actions;
export default tripSliceReducer = tripSlice.reducer;
