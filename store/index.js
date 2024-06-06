import { configureStore } from '@reduxjs/toolkit'
import darkReducer from "./darkMode"

export const store = configureStore({
  reducer: {
    darkMode: darkReducer,
  },
})