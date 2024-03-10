import { configureStore } from "@reduxjs/toolkit";
import todoSlice from "./todoSlice";

import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

const persistConfig = {
  key: "root",
  storage,
};
const persistedTODO = persistReducer(persistConfig, todoSlice)


const store = configureStore({
  reducer: {
    todo: persistedTODO,
  },
});

export default store;
export const persistor = persistStore(store)
