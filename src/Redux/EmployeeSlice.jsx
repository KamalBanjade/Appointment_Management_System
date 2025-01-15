import { createSlice } from "@reduxjs/toolkit";

const EmployeeSlice = createSlice({
  name: "employees",
  initialState: {
    list: [], // Employee list
    isEmployeePanelOpen: false, // Controls the visibility of the employee panel
    totalSN: 0,
  },
  reducers: {
    addEmployee: (state, action) => {
      state.list.push(action.payload);
      state.totalSN = state.list.length; // Update total count
    },
    editEmployee: (state, action) => {
      const index = state.list.findIndex((emp) => emp.id === action.payload.id);
      if (index !== -1) {
        state.list[index] = {
          ...state.list[index],
          ...action.payload,
        };
      }
    },
    deleteEmployee: (state, action) => {
      state.list = state.list.filter((emp) => emp.id !== action.payload);
      state.totalSN = state.list.length; // Update total count
    },
    updateEmployeeImage: (state, action) => {
      const { id, image } = action.payload;
      const employee = state.list.find((emp) => emp.id === id);
      if (employee) {
        employee.image = image; // Update the employee's image
      }
    },
    removeEmployeeImage: (state, action) => {
      const id = action.payload;
      const employee = state.list.find((emp) => emp.id === id);
      if (employee) {
        employee.image = null; // Remove the image
      }
    },
    toggleEmployeePanel: (state) => {
      state.isEmployeePanelOpen = !state.isEmployeePanelOpen;
    },
  },
});

export const {
  addEmployee,
  editEmployee,
  deleteEmployee,
  updateEmployeeImage,
  removeEmployeeImage,
  toggleEmployeePanel,
} = EmployeeSlice.actions;

export default EmployeeSlice.reducer;
