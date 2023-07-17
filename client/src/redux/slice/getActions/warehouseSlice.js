import { createSlice } from "@reduxjs/toolkit";
import { getWarehouseList } from "./actions";

const initialState = {
  postWarehouse: [],
  isLoading: false,
};

export const warehouseSlice = createSlice({
  name: "warehouse",
  initialState,

  extraReducers: {
    [getWarehouseList.pending]: (state, action) => {
      state.isLoading = true;
    },
    [getWarehouseList.fulfilled]: (state, action) => {
      state.isLoading = false;

      state.postWarehouse = action.payload;
    },
    [getWarehouseList.rejected]: (state, action) => {
      state.isLoading = false;
    },
  },
});
export default warehouseSlice.reducer;
