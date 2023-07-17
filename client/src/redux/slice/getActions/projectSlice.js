import { createSlice } from "@reduxjs/toolkit";
import { getProjectList } from "./actions";

const initialState = {
  postProject: [],
  isLoading: false,
  isSuccess: false,
};

export const projectSlice = createSlice({
  name: "project",
  initialState,

  extraReducers: {
    [getProjectList.pending]: (state, action) => {
      state.isLoading = true;
    },
    [getProjectList.fulfilled]: (state, action) => {
      state.isLoading = false;

      state.postProject = action.payload;
    },
    [getProjectList.rejected]: (state, action) => {
      state.isLoading = false;
      state.postProject = [];
      state.error = action.error.message;
    },
  },
});
export default projectSlice.reducer;
