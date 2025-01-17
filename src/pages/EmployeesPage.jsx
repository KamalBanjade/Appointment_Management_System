import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addEmployee, editEmployee, deleteEmployee } from "../Redux/EmployeeSlice";
import EmployeeModal from "../components/EmployeeModal";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import PageLayout from "../utils/PageLayout";

const EmployeePage = () => {
  const employees = useSelector((state) => state.employees.list);
  const dispatch = useDispatch();
  const [isModalOpen, setModalOpen] = useState(false);
  const [currentEmployee, setCurrentEmployee] = useState(null);

  const openModalForNewEmployee = () => {
    setCurrentEmployee(null);
    setModalOpen(true);
  };

  const handleEditEmployee = (employee) => {
    setCurrentEmployee(employee);
    setModalOpen(true);
  };

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

  const handleDeleteEmployee = (id) => {
    dispatch(deleteEmployee(id));
    toast.error("Employee deleted successfully!");
  };

  return (
    <PageLayout
  title="Employee's List"
  onAddClick={openModalForNewEmployee}
  addButtonText="Add Employee"
  buttonStyle="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-6 py-2 rounded-lg shadow-md hover:from-purple-600 hover:to-purple-700 transition-all duration-300"
>
      <table className="w-full text-sm text-gray-700 rounded-lg overflow-hidden">
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
              className="hover:bg-gradient-to-r from-gray-50 to-gray-100 transition-all duration-300 transform hover:scale-105 hover:shadow-md"
            >
              <td className="border border-gray-200 px-4 py-2 text-gray-700 text-center">
                {index + 1}
              </td>
              <td className="border border-gray-200 px-4 py-2 text-gray-800 font-medium text-center">
                <span className="inline-block px-3 py-1 text-sm">{employee.name}</span>
              </td>
              <td className="border border-gray-200 px-4 py-2 text-gray-700 text-center">
                <a
                  href={`tel:${employee.mobileNumber}`}
                  className="text-blue-500 hover:underline hover:text-blue-600 transition-all duration-300"
                >
                  {employee.mobileNumber}
                </a>
              </td>
              <td className="border border-gray-200 px-4 py-2 text-gray-700 text-center">
                <span className="inline-block px-2 py-1 text-sm">{employee.officeTime || "-"}</span>
              </td>
              <td className="border border-gray-200 px-4 py-2 text-gray-700 font-medium text-center">
                {employee.department}
              </td>
              <td className="border border-gray-200 px-4 py-2 flex justify-center space-x-2 text-center">
                <IconButton
                  onClick={() => handleEditEmployee(employee)}
                  color="success"
                  sx={{
                    backgroundColor: "#9B4DCA",
                    color: "white",
                    borderRadius: "8px",
                    padding: "8px",
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                    transition: "transform 0.15s ease-in-out, box-shadow 0.15s ease-in-out",
                    "&:hover": {
                      backgroundColor: "#9B4DCA",
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

      {isModalOpen && (
        <EmployeeModal
          isOpen={isModalOpen}
          onClose={() => setModalOpen(false)}
          onSave={handleAddOrEditEmployee}
          employeeToEdit={currentEmployee}
        />
      )}

      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </PageLayout>
  );
};

export default EmployeePage;