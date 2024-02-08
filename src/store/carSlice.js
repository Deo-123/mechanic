import { createSlice } from '@reduxjs/toolkit';

const carSlice = createSlice({
  name: 'car',
  initialState: {
    carData: null,
  },
  reducers: {
    setCarData: (state, action) => {
      state.carData = action.payload;
    },
  },
});

export const { setCarData } = carSlice.actions;
export default carSlice.reducer;
