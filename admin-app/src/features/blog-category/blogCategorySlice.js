import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import blogCategoryService from "./blogCategoryService";

export const getBlogCategory = createAsyncThunk(
  "brands/get-brands",
  async (thunkAPI) => {
    try {
      const timestamp = new Date().getTime();
      return await blogCategoryService.getBlogCategory(timestamp);
    } catch (error) {
      return thunkAPI.rejectedWithValue(error);
    }
  }
);

const initialState = {
  blogCategory: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const blogCategorySlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBlogCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBlogCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.blogCategory = action.payload;
      })
      .addCase(getBlogCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      });
  },
});

export default blogCategorySlice.reducer;
