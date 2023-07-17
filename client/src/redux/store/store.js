import { configureStore } from "@reduxjs/toolkit";
import projectSlice from "../slice/getActions/projectSlice";
import elementPDFSlice from "../slice/getActions/elementPdfSlise";
import elementSlice from "../slice/getActions/elementSlice";
import moduleOfProjectSlice from "../slice/getActions/moduleOfProjectSlice";
import userSlice from "../slice/getActions/userSlice";
import warehouseSlice from "../slice/getActions/warehouseSlice";
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

// import storage from "redux-persist/lib/storage";
// import { createStore } from "redux";

// const persistConfig = {
//   key: "root",
//   version: 1,
//   storage,
// };

// const rootReducer = combineReducers({
//   getProgect: projectSlice,
// });

// const persistedReducer = persistReducer(persistConfig, rootReducer);

export default configureStore({
  reducer: {
    getProject: projectSlice,
    getElementPdf: elementPDFSlice,
    getElement: elementSlice,
    getModuleOfProject: moduleOfProjectSlice,
    getUser: userSlice,
    getWarehouse: warehouseSlice,
    // getWarehouseWork: warehouseWorkSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
