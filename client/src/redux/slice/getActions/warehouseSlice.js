import { createSlice } from "@reduxjs/toolkit";

import { getWarehouseList, addWarehouse } from "../connectAPI/warehouseAPI";

const initialState = {
  postWarehouse: [],
  isLoading: "",
  isSuccess: "",
  error: "",
};

export const warehouseSlice = createSlice({
  name: "warehouse",
  initialState,

  extraReducers: (builder) => {
    // get warehouse
    builder.addCase(getWarehouseList.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getWarehouseList.fulfilled, (state, action) => {
      state.isLoading = false;
      state.postWarehouse = action.payload;
      state.error = "";
    });
    builder.addCase(getWarehouseList.rejected, (state, action) => {
      state.isLoading = false;
      state.postWarehouse = [];
      state.error = action.error.message;
    });
    // post warehouse
    builder.addCase(addWarehouse.pending, (state) => {
      state.isLoading = true;
      state.error = "";
    });
    builder.addCase(addWarehouse.fulfilled, (state, action) => {
      state.isLoading = false;
      state.postWarehouse = action.payload;
      state.isSuccess = action.payload;
    });
    builder.addCase(addWarehouse.rejected, (state, action) => {
      state.isLoading = false;
      state.postWarehouse = [];
      state.error = action.error.message;
    });
    // //edit warehouse
    // builder.addCase(putWarehouse.pending, (state, action) => {
    //   state.isLoading = true;
    //   state.error = "";
    // });
    // builder.addCase(putWarehouse.fulfilled, (state, action) => {
    //   state.isLoading = false;
    //   state.postWarehouse = [];
    //   state.isSuccess = action.payload;
    // });
    // builder.addCase(putWarehouse.rejected, (state, action) => {
    //   state.isLoading = false;
    //   state.postWarehouse = [];
    //   state.error = action.error.message;
    // });
  },
});
export default warehouseSlice.reducer;
