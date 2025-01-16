import { createSlice } from "@reduxjs/toolkit";

const EmployeeSlice = createSlice({
  name: "employees",
  initialState: {
    list: [], // Array to store employee data
    isEmployeePanelOpen: false, // Controls the visibility of the employee panel
    totalSN: 0, // Total number of employees
  },
  reducers: {
    // Add a new employee to the list
    addEmployee: (state, action) => {
      const newEmployee = {
        ...action.payload,
        id: Date.now(), // Assign a unique ID to the employee
      };
      state.list.push(newEmployee); // Add the employee to the list
      state.totalSN = state.list.length; // Update the total count
    },

    // Edit an existing employee
    editEmployee: (state, action) => {
      const index = state.list.findIndex((emp) => emp.id === action.payload.id);
      if (index !== -1) {
        // Update the employee's details
        state.list[index] = {
          ...state.list[index],
          ...action.payload,
        };
      }
    },

    // Delete an employee by ID
    deleteEmployee: (state, action) => {
      state.list = state.list.filter((emp) => emp.id !== action.payload); // Remove the employee
      state.totalSN = state.list.length; // Update the total count
    },

    // Update an employee's image
    updateEmployeeImage: (state, action) => {
      const { id, image } = action.payload;
      const employee = state.list.find((emp) => emp.id === id);
      if (employee) {
        employee.image = image; // Update the employee's image
      }
    },

    // Remove an employee's image
    removeEmployeeImage: (state, action) => {
      const id = action.payload;
      const employee = state.list.find((emp) => emp.id === id);
      if (employee) {
        employee.image = null; // Remove the image
      }
    },

    // Toggle the visibility of the employee panel
    toggleEmployeePanel: (state) => {
      state.isEmployeePanelOpen = !state.isEmployeePanelOpen;
    },
  },
});

// Export actions for use in components
export const {
  addEmployee,
  editEmployee,
  deleteEmployee,
  updateEmployeeImage,
  removeEmployeeImage,
  toggleEmployeePanel,
} = EmployeeSlice.actions;

// Export the reducer for the store
export default EmployeeSlice.reducer;