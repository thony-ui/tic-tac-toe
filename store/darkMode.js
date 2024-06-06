import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: false,
}

export const darkMode = createSlice({
  name: 'darkMode',
  initialState,
  reducers: {
    change: (state) => {
      state.value = !state.value
    },
  },
})

// Action creators are generated for each case reducer function
export const { change } = darkMode.actions

export default darkMode.reducer