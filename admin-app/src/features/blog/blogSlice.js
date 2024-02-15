import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import blogService from "./blogService";

export const getBlog = createAsyncThunk("blogs/get-blogs", async (thunkAPI) => {
  try {
    const timestamp = new Date().getTime();
    return await blogService.getBlog(timestamp);
  } catch (error) {
    return thunkAPI.rejectedWithValue(error);
  }
});

const initialState = {
  blogs: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const blogSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBlog.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBlog.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.blogs = action.payload;
      })
      .addCase(getBlog.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      });
  },
});

export default blogSlice.reducer;
