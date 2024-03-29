import axios from "axios";

export const apiElementPDF = axios.create({
  baseURL: `${process.env.REACT_APP_BASE_URL}/element`,
  responseType: "blob",

  mode: "cors",
  cache: "default",
});
export const apiElement = axios.create({
  baseURL: `${process.env.REACT_APP_BASE_URL}/element`,
});
export const apiUser = axios.create({
  baseURL: `${process.env.REACT_APP_BASE_URL}/user`,
});
export const apiProject = axios.create({
  baseURL: `${process.env.REACT_APP_BASE_URL}/project`,
});
export const apiModuleOfProject = axios.create({
  baseURL: `${process.env.REACT_APP_BASE_URL}/module`,
});
export const apiPosition = axios.create({
  baseURL: `${process.env.REACT_APP_BASE_URL}/position`,
});
export const apiWarehouse = axios.create({
  baseURL: `${process.env.REACT_APP_BASE_URL}/warehouse`,
});
export const apiWarehouseWork = axios.create({
  baseURL: `${process.env.REACT_APP_BASE_URL}/warehouseWork`,
});

