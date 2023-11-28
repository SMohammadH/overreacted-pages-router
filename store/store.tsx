import { configureStore } from "@reduxjs/toolkit";
import themeSlice from "./reducers/themeSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import thunk from "redux-thunk";

const persistConfig = {
  key: "root",
  storage,
};

const persistedTheme = persistReducer(persistConfig, themeSlice);

export const store = configureStore({
  reducer: {
    theme: persistedTheme,
  },
  middleware: [thunk],
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
