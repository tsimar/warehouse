import { createSlice } from "@reduxjs/toolkit";
import { getElementList } from "./actions";

const initialState = {
  postElement: [],
  isLoading: false,
};

export const elementSlice = createSlice({
  name: "element",
  initialState,

  extraReducers: {
    [getElementList.pending]: (state, action) => {
      state.isLoading = true;
    },
    [getElementList.fulfilled]: (state, action) => {
      state.isLoading = false;

      state.postElement = action.payload;
    },
    [getElementList.rejected]: (state, action) => {
      state.isLoading = false;
    },
  },
});
export default elementSlice.reducer;
