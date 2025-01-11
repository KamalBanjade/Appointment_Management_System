import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Default storage (localStorage)
import { combineReducers } from "redux";
import appointmentReducer from "./AppointmentSlice";
import EmployeeReducer from "./EmployeeSlice";
import visitorReducer from "./VisitorSlice";

// Persist configuration
const persistConfig = {
  key: "root",
  storage,
};

// Combine reducers
const rootReducer = combineReducers({
  appointments: appointmentReducer,
  employees: EmployeeReducer, // Added EmployeeReducer
  visitors: visitorReducer, // Added visitorReducer
});

// Persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure store with middleware
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});

// Persistor
export const persistor = persistStore(store);

export default store;
