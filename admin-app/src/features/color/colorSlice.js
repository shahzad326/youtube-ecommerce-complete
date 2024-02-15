import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import colorService from "./colorService";

export const getColor = createAsyncThunk(
  "color/get-colors",
  async (thunkAPI) => {
    try {
      const timestamp = new Date().getTime();
      return await colorService.getColor(timestamp);
    } catch (error) {
      return thunkAPI.rejectedWithValue(error);
    }
  }
);

const initialState = {
  colors: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const colorSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getColor.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getColor.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.colors = action.payload;
      })
      .addCase(getColor.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      });
  },
});

export default colorSlice.reducer;
