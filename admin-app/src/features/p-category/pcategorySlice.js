import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import productCategoryService from "./pcategoryService";

export const getProductCategory = createAsyncThunk(
  "productcategory/get-productCategory",
  async (thunkAPI) => {
    try {
      const timestamp = new Date().getTime();
      return await productCategoryService.getProductCategory(timestamp);
    } catch (error) {
      return thunkAPI.rejectedWithValue(error);
    }
  }
);

const initialState = {
  productcategory: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const productCategorySlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProductCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProductCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.productcategory = action.payload;
      })
      .addCase(getProductCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      });
  },
});

export default productCategorySlice.reducer;
