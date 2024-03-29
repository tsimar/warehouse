import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  apiProject,
  apiElementPDF,
  apiElement,
  apiUser,
  apiWarehouse,
  apiModuleOfProject,
} from "../../../url/URL";

export const getProjectList = createAsyncThunk("post/getProject", async () => {
  try {
    const res = await apiProject.get();
    return res.data;
  } catch (error) {
    return error.message;
  }
});
export const adddProject = createAsyncThunk(
  "project/addProject",
  async (value) => {
    return await apiWarehouse
      .post("", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          number: value.number,
          dataStart: value.dataStart,
          idProject: value.idProject,
          idModule: value.idModule,
          idElement: value.idElement,
          idUser: value.idUser,
          warehouseName: value.name,
        }),
      })
      .then((res) => res.json());
  }
);

export const getElementList = createAsyncThunk("post/getElement", async () => {
  try {
    const res = await apiElement.get();
    return res.data;
  } catch (error) {
    return error.message;
  }
});

export const getUserList = createAsyncThunk("post/getUser", async () => {
  try {
    const res = await apiUser.get();
    return res.data;
  } catch (error) {
    return error.message;
  }
});

export const getWarehouseList = createAsyncThunk(
  "post/getWarehouse",
  async () => {
    try {
      const res = await apiWarehouse.get();
      return res.data;
    } catch (error) {
      return error.message;
    }
  }
);

export const getModuleOfProjecList = createAsyncThunk(
  "post/getModuleOfProjec",
  async () => {
    try {
      const res = await apiModuleOfProject.get();
      return res.data;
    } catch (error) {
      return error.message;
    }
  }
);

export const getElementPDFList = createAsyncThunk(
  "post/getElementPDF",
  async () => {
    try {
      const res = await apiElementPDF.get();
      return res.data;
    } catch (error) {
      return error.message;
    }
  }
);
