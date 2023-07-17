import { createSlice } from "@reduxjs/toolkit";
import { getElementPDFList } from "./actions";

const initialState = {
  postElementPDF: [],
  isLoading: false,
};

export const elementPDFSlice = createSlice({
  name: "elementPDF",
  initialState,

  extraReducers: {
    [getElementPDFList.pending]: (state, action) => {
      state.isLoading = true;
    },
    [getElementPDFList.fulfilled]: (state, action) => {
      state.isLoading = false;

      state.postProject = action.payload;
    },
    [getElementPDFList.rejected]: (state, action) => {
      state.isLoading = false;
    },
  },
});
export default elementPDFSlice.reducer;
