import { createSlice } from "@reduxjs/toolkit";
import { getUserList } from "./actions";

const initialState = {
  postUser: [],
  isLoading: false,
};

export const userSlice = createSlice({
  name: "users",
  initialState,

  extraReducers: {
    [getUserList.pending]: (state, action) => {
      state.isLoading = true;
    },
    [getUserList.fulfilled]: (state, action) => {
      state.isLoading = false;

      state.postUser = action.payload;
    },
    [getUserList.rejected]: (state, action) => {
      state.isLoading = false;
    },
  },
});
export default userSlice.reducer;
