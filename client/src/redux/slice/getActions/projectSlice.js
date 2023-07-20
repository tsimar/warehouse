import { createSlice } from "@reduxjs/toolkit";
import {
  getProjectList,
  addProject,
  putProject,
} from "../connectAPI/projectAPI";

const initialState = {
  postProject: [],
  isLoading: false,
  isSuccess: false,
  error: "",
};

export const projectSlice = createSlice({
  name: "project",
  initialState,

  extraReducers: (builder) => {
    builder.addCase(getProjectList.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getProjectList.fulfilled, (state, action) => {
      state.isLoading = false;

      state.postProject = action.payload;
    });
    builder.addCase(getProjectList.rejected, (state, action) => {
      state.isLoading = false;
      state.postProject = [];
      state.error = action.error.message;
    });
    // post project
    builder.addCase(addProject.pending, (state, action) => {
      state.isLoading = true;
      state.error = "";
    });
    builder.addCase(addProject.fulfilled, (state, action) => {
      state.isLoading = false;
      state.postProject = [];
      state.isSuccess = action.payload;
    });
    builder.addCase(addProject.rejected, (state, action) => {
      state.isLoading = false;
      state.postProject = [];
      state.error = action.error.message;
    });
    //edit project
    builder.addCase(putProject.pending, (state, action) => {
      state.isLoading = true;
      state.error = "";
    });
    builder.addCase(putProject.fulfilled, (state, action) => {
      state.isLoading = false;
      state.postProject = [];
      state.isSuccess = action.payload;
    });
    builder.addCase(putProject.rejected, (state, action) => {
      state.isLoading = false;
      state.postProject = [];
      state.error = action.error.message;
    });
  },
});
export default projectSlice.reducer;
