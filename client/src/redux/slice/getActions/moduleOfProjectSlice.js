import { createSlice } from "@reduxjs/toolkit";
import { getModuleOfProjecList } from "./actions";

const initialState = {
  postModuleOfProjec: [],
  isLoading: false,
};

export const postModuleOfProjecSlice = createSlice({
  name: "moduleOfProjec",
  initialState,

  extraReducers: {
    [getModuleOfProjecList.pending]: (state, action) => {
      state.isLoading = true;
    },
    [getModuleOfProjecList.fulfilled]: (state, action) => {
      state.isLoading = false;

      state.postModuleOfProjec = action.payload;
    },
    [getModuleOfProjecList.rejected]: (state, action) => {
      state.isLoading = false;
    },
  },
});
export default postModuleOfProjecSlice.reducer;
