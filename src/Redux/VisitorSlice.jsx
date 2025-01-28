import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  list: [],
  totalSN: 0,
  latestVisitorName: "", // New property to store the latest visitor's name
};

const visitorSlice = createSlice({
  name: "visitors",
  initialState,
  reducers: {
    addVisitor: (state, action) => {
      const visitorWithTimestamp = { ...action.payload, timestamp: Date.now() };
      state.list.push(visitorWithTimestamp);
      state.totalSN = state.list.length;
      state.latestVisitorName = visitorWithTimestamp.name;
    },
    editVisitor: (state, action) => {
      const index = state.list.findIndex((v) => v.id === action.payload.id);
      if (index !== -1) {
        const updatedVisitor = { ...action.payload, timestamp: Date.now() };
        state.list[index] = updatedVisitor;
        // Find the visitor with the latest timestamp
        const latestVisitor = state.list.reduce((latest, current) =>
          current.timestamp > latest.timestamp ? current : latest
        );
        state.latestVisitorName = latestVisitor.name;
      }
    },
    deleteVisitor: (state, action) => {
      state.list = state.list.filter((v) => v.id !== action.payload);
      state.totalSN = state.list.length;
      if (state.list.length > 0) {
        const latestVisitor = state.list.reduce((latest, current) =>
          current.timestamp > latest.timestamp ? current : latest
        );
        state.latestVisitorName = latestVisitor.name;
      } else {
        state.latestVisitorName = "";
      }
    },
  },
});
export const { addVisitor, editVisitor, deleteVisitor } = visitorSlice.actions;
export default visitorSlice.reducer;
