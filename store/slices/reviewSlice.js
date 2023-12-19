import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Api from "../../api/Api";

export const getReview = createAsyncThunk("getReview", async (id) => {
  const response = await Api.review.getReviews(id);
  return response;
});

export const addReview = createAsyncThunk("addReview", async (data) => {
  const response = await Api.review.addReview(data);
  console.log(response);
  return response;
});

const reviewSlice = createSlice({
  name: "review",
  initialState: {
    reviewData: {
      result: [],
      error: false,
      isLoading: false
    },

  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getReview.fulfilled, (state, action) => {
        state.reviewData.result = action.payload;
        state.reviewData.isLoading = false;
        state.reviewData.error = false;
    });
    builder.addCase(getReview.pending, (state) => {
        state.reviewData.isLoading = true;
        state.reviewData.error = false;
    });
    builder.addCase(getReview.rejected, (state) => {
        state.reviewData.isLoading = false;
        state.reviewData.error = true;
    });

  },
});

export const reviewSliceAction = reviewSlice.actions;
export default reviewSliceReducer = reviewSlice.reducer;
