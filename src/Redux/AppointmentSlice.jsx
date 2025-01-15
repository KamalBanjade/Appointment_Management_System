import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  list: [],
  totalSN: 0,
};

const appointmentSlice = createSlice({
  name: "appointments",
  initialState,
  reducers: {
    addAppointment: (state, action) => {
      state.list.push(action.payload);
      state.totalSN = state.list.length; // Update total count
    },
    editAppointment: (state, action) => {
      const index = state.list.findIndex((a) => a.id === action.payload.id);
      if (index !== -1) {
        state.list[index] = action.payload;
      }
    },
    deleteAppointment: (state, action) => {
      state.list = state.list.filter((a) => a.id !== action.payload);
      state.totalSN = state.list.length; // Update total count
    },
  },
});

export const { addAppointment, editAppointment, deleteAppointment } =
  appointmentSlice.actions;
export default appointmentSlice.reducer;
