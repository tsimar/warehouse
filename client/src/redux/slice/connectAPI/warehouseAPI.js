import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiWarehouse } from "../../../url/URL";

export const getWarehouseList = createAsyncThunk(
  "warehouse/getWarehouseList",
  async (name) => {
    try {
      const res = await apiWarehouse.get(`/${name}`);
      return res.data;
    } catch (error) {
      return error.message;
    }
  }
);
export const addWarehouse = createAsyncThunk(
  "warehouse/addWarehouse",
  async (value) => {
    return await apiWarehouse
      .post("", value)
      .then((res) => res.json())
      .then((res) => console.log(res.data));
  }
);

// export const addWarehouse = createAsyncThunk(
//   "warehouse/addWarehouse",
//   async ({ value }) => {
//     console.log(value);
//     return await apiWarehouse.post("", value).then((res) => res.json());
//   }
// );
// export const putWarehouse = createAsyncThunk(
//   "warehouse/editWarehouse",
//   async (value) => {
//     return await apiWarehouse
//       .put("/editProject", value)
//       .then((res) => res.json());
//   }
// );
