import axios from "axios";

export const URL = "http://localhost:8080";

export const apiElement = axios.create({ baseURL: `${URL}/element` });
export const apiUser = axios.create({ baseURL: `${URL}/user` });
export const apiProject = axios.create({ baseURL: `${URL}/project` });
export const apiPosition = axios.create({ baseURL: `${URL}/position` });
export const apiWarehouse = axios.create({ baseURL: `${URL}/warehouseOut` });
export const apiWarehouseWork = axios.create({
  baseURL: `${URL}/warehouseWork`,
});

