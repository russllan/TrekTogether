import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Api from "../../api/Api";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const trip = createAsyncThunk("trip", async (data) => {
  console.log("Data being sent: ", data);
  const response = await Api.trip.trip(data);
  console.log(response);
  return response;
});

export const addTrip = createAsyncThunk("addTrip", async (addTripData) => {
  console.log("addTripData", addTripData);
  const response = await Api.trip.addTrip(addTripData);
  console.log("response", response);
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
  // console.log(response);
  return response;
});

export const getTrip = createAsyncThunk("getTrip", async (getTripId) => {
  const response = await Api.trip.getTrip(getTripId);
  return response;
});

export const deleteUserTrip = createAsyncThunk(
  "deleteUserTrip",
  async (userTrip) => {
    console.log(userTrip.tripId);
    const response = await Api.trip.deleteUserTrip(
      userTrip.id,
      userTrip.tripId
    );
    console.log(response);
    return response;
  }
);

export const deleteTrip = createAsyncThunk("deleteTrip", async (id) => {
  console.log("Удаление поездки. ID поездки: " + id);
  const response = await Api.trip.deleteTrip(id);
  console.log(response);
  return response;
});

export const completeTrip = createAsyncThunk("completeTrip", async (id) => {
  const response = await Api.trip.completeTrip(id);
  console.log(response);
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
    isDriver: false,
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
    isLoading: true,
  },
  completeTrip: {
    id: [],
    isLoading: false,
    isError: true,
  },
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
    builder.addCase(trip.rejected, (state, action) => {
      console.error("Error: ", action.error);
      state.Trip.error = true;
      state.Trip.isLoading = false;
    });
    builder.addCase(addTrip.fulfilled, (state, action) => {
      state.AddTrip.result = action.payload;
      state.AddTrip.error = false;
      state.AddTrip.isLoading = false;
      state.AddTrip.isDriver = true;
    });
    builder.addCase(addTrip.pending, (state) => {
      state.AddTrip.isLoading = true;
      state.AddTrip.isDriver = false;
    });
    builder.addCase(addTrip.rejected, (state, action) => {
      console.error("Error: ", action.error);
      state.AddTrip.error = true;
      state.AddTrip.isLoading = false;
      state.AddTrip.isDriver = false;
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
      AsyncStorage.setItem("car", JSON.stringify(state.Car.result.id))
        .then(() => console.log("Car saved"))
        .catch((error) => console.error("Error car saved: ", error));
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

    builder.addCase(completeTrip.fulfilled, (state, action) => {
      state.completeTrip.id = action.payload;
      state.completeTrip.isError = false;
      state.completeTrip.isLoading = false;
      state.AddTrip.isDriver = false;
    });
    builder.addCase(completeTrip.pending, (state) => {
      state.completeTrip.isError = true;
      state.completeTrip.isLoading = true;
    });
    builder.addCase(completeTrip.rejected, (state) => {
      state.completeTrip.isError = true;
      state.completeTrip.isLoading = false;
    });
  },
});

export const tripSliceAction = tripSlice.actions;
export default tripSliceReducer = tripSlice.reducer;
