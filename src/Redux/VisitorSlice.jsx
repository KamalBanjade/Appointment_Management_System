import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  list: [],
  totalSN: 0, 
};

const visitorSlice = createSlice({
  name: "visitors",
  initialState,
  reducers: {
    addVisitor: (state, action) => {
      state.list.push(action.payload);
      state.totalSN = state.list.length; // Update total count
    },
    editVisitor: (state, action) => {
      const index = state.list.findIndex((v) => v.id === action.payload.id);
      if (index !== -1) {
        state.list[index] = action.payload;
      }
    },
    deleteVisitor: (state, action) => {
      state.list = state.list.filter((v) => v.id !== action.payload);
      state.totalSN = state.list.length; // Update total count
    },
  },
});

export const { addVisitor, editVisitor, deleteVisitor } = visitorSlice.actions;
export default visitorSlice.reducer;
