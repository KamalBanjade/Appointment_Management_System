import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addEmployee, editEmployee, deleteEmployee } from "../Redux/EmployeeSlice";
import EmployeeModal from "../components/EmployeeModal";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";
import { IconButton } from "@mui/material";


const EmployeePage = () => {
  const employees = useSelector((state) => state.employees.list);
  const isMenuOpen = useSelector((state) => state.employees.isEmployeePanelOpen); // Hamburger menu state from Redux
  const dispatch = useDispatch();

  const [isModalOpen, setModalOpen] = useState(false);
  const [currentEmployee, setCurrentEmployee] = useState(null);

  // Open modal for a new employee
  const openModalForNewEmployee = () => {
    setCurrentEmployee(null);
    setModalOpen(true);
  };

  // Open modal for editing an existing employee
  const handleEditEmployee = (employee) => {
    setCurrentEmployee(employee);
    setModalOpen(true);
  };

  // Save employee (add or edit)
  const handleAddOrEditEmployee = (employee) => {
    if (currentEmployee) {
      dispatch(editEmployee(employee));
      toast.success("Employee updated successfully!");
    } else {
      dispatch(addEmployee({ ...employee, id: Date.now() }));
      toast.success("Employee added successfully!");
    }
    setModalOpen(false);
  };

  // Delete an employee
  const handleDeleteEmployee = (id) => {
    dispatch(deleteEmployee(id));
    toast.error("Employee deleted successfully!");
  };

  return (
    <div className="container mx-20 mt-14 px-4">
      <div
        className={`mt-4 transition-all duration-300 ease-in-out bg-white rounded-lg ${isMenuOpen ? "w-auto md:w-3/4 lg:w-3/4" : "w-auto"
          }`}
      >
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">Employee's List</h1>
          <button
            onClick={openModalForNewEmployee}
            className="bg-green-500 text-white px-4 py-2 rounded shadow hover:bg-green-600"
          >
            Add Employee
          </button>
        </div>
      </div>
      {/* Employee Table */}
      <div
        className={`mt-4 transition-all duration-300 ease-in-out bg-white rounded-lg ${isMenuOpen ? "w-auto md:w-3/4 lg:w-3/4" : "w-auto"
          }`}
      >
        <table className="w-full text-sm text-gray-700 shadow-lg rounded-lg overflow-hidden text-center">
          <thead>
            <tr className="bg-gradient-to-r from-gray-200 to-gray-300 text-black">
              <th className="border border-gray-300 px-4 py-3 text-center font-semibold">SN</th>
              <th className="border border-gray-300 px-4 py-3 text-center font-semibold">Employee's Name</th>
              <th className="border border-gray-300 px-4 py-3 text-center font-semibold">Phone Number</th>
              <th className="border border-gray-300 px-4 py-3 text-center font-semibold">Office Time</th>
              <th className="border border-gray-300 px-4 py-3 text-center font-semibold">Department</th>
              <th className="border border-gray-300 px-4 py-3 text-center font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee, index) => (
              <tr
                key={employee.id}
                className="hover:bg-gradient-to-r from-gray-100 to-gray-200 transition-all duration-300 transform"
              >
                <td className="border border-gray-200 px-4 py-2 text-gray-600 font-medium">{index + 1}</td>
                <td className="border border-gray-200 px-4 py-2 text-gray-600 font-medium">
                  <span className="inline-block px-3 py-1 text-sm">{employee.name}</span>
                </td>
                <td className="border border-gray-200 px-4 py-2 text-gray-600">
                  <a
                    href={`tel:${employee.mobileNumber}`}
                    className="text-blue-500 hover:underline hover:text-blue-700"
                  >
                    {employee.mobileNumber}
                  </a>
                </td>
                <td className="border border-gray-200 px-4 py-2 text-gray-600 font-medium">
                  <span className="inline-block px-2 py-1 text-sm">{employee.officeTime || "-"}</span>
                </td>
                <td className="border border-gray-200 px-4 py-2 text-gray-600 font-medium">{employee.department}</td>
                <td className="border border-gray-200 px-4 py-2 flex justify-center space-x-2">
                  <IconButton
                    onClick={() => handleEditEmployee(employee)}
                    color="success"
                    sx={{
                      backgroundColor: "#48bb78",
                      color: "white",
                      borderRadius: "8px",
                      padding: "8px",
                      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                      transition: "transform 0.15s ease-in-out, box-shadow 0.15s ease-in-out",
                      "&:hover": {
                        backgroundColor: "#3a9c63",
                        transform: "scale(1.05)",
                        boxShadow: "0 6px 8px rgba(0, 0, 0, 0.15)",
                      },
                    }}
                  >
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton
                    onClick={() => handleDeleteEmployee(employee.id)}
                    color="error"
                    sx={{
                      backgroundColor: "#FB4141",
                      color: "white",
                      borderRadius: "8px",
                      padding: "8px",
                      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                      transition: "transform 0.15s ease-in-out, box-shadow 0.15s ease-in-out",
                      "&:hover": {
                        backgroundColor: "#d73838",
                        transform: "scale(1.05)",
                        boxShadow: "0 6px 8px rgba(0, 0, 0, 0.15)",
                      },
                    }}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <EmployeeModal
          isOpen={isModalOpen}
          onClose={() => setModalOpen(false)}
          onSave={handleAddOrEditEmployee}
          employeeToEdit={currentEmployee}
        />
      )}

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default EmployeePage;
