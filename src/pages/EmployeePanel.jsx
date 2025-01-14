import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import VisitorModal from "../components/VisitorModal";
import AppointmentModal from "../components/AppointmentModal";
import SearchIcon from "@mui/icons-material/Search";
import { InputAdornment, TextField } from "@mui/material";


const EmployeePanel = () => {
  const [isVisitorModalOpen, setVisitorModalOpen] = useState(false);
  const [isAppointmentModalOpen, setAppointmentModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [appointments, setAppointments] = useState([]);

  const employees = useSelector((state) => state.employees.list);
  const isPanelOpen = useSelector((state) => state.employees.isEmployeePanelOpen);
  const dispatch = useDispatch();  // If you're dispatching any actions later

  // Function to open the modals
  const openModal = (employee, modalType) => {
    setSelectedEmployee(employee);
    if (modalType === "visitor") {
      setVisitorModalOpen(true);
    } else {
      setAppointmentModalOpen(true);
    }
  };

  const closeModals = () => {
    setVisitorModalOpen(false);
    setAppointmentModalOpen(false);
    setSelectedEmployee(null);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredEmployees = employees.filter((employee) =>
    employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    employee.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    employee.mobileNumber.includes(searchQuery)
  );

  // Handle saving an appointment
  const handleSaveAppointment = (appointment) => {
    setAppointments((prev) => [...prev, appointment]); // Add new appointment
    closeModals(); // Close the modal after saving
  };

  // Handle saving a visitor
  const handleSaveVisitor = (visitor) => {
    // Implement visitor saving logic here
    closeModals(); // Close the modal after saving
  };

  if (!isPanelOpen) return null;

  return (
    <div className="fixed top-16 right-0 w-[32%] h-[calc(100vh-4rem)] bg-gray-100 shadow-lg p-4 overflow-y-auto z-50 transition-transform transform duration-300 ease-in-out">
      <h2 className="text-lg font-bold mb-4 text-gray-800">Employee List:</h2>

      {/* Search Box */}
      <div className="mb-6">
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search Employee..."
          value={searchQuery}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon style={{ color: '#6B7280' }} />
              </InputAdornment>
            ),
            style: {
              borderRadius: '18px',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
              transition: 'box-shadow 0.3s ease',
            },
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              '&:hover fieldset': {
                borderColor: '#3B82F6',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#3B82F6',
                boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.2)',
              },
            },
          }}
        />
      </div>

      {/* Employee List or No Employees Message */}
      {filteredEmployees.length === 0 ? (
        <div className="flex justify-center items-center text-gray-500 text-md">
          No employees found.
        </div>
      ) : (
        filteredEmployees.map((employee) => (
          <div
            key={employee.id}
            className="shadow-lg p-4 rounded-lg mb-4 border border-gray-200 bg-gray-300"
          >
            <div className="flex items-start space-x-4">
              {/* Employee Image */}
              <div className="flex-shrink-0">
                <div className="flex flex-col items-center space-y-2">
                  <img
                    src={employee.image instanceof File
                      ? URL.createObjectURL(employee.image)
                      : employee.image || "/default-image.png"}
                    alt={employee.name || "Employee"}
                    className="h-16 w-16 object-cover rounded-full border border-gray-300"
                  />

                  {/* Action Buttons */}
                  <div className="flex space-x-2">
                    <button
                      className="btn px-3 py-1 rounded text-white bg-blue-500 hover:bg-blue-600 transition"
                      title="Add Visitor"
                      onClick={() => openModal(employee, "visitor")}
                    >
                      <img
                        src="/visitor.png"
                        alt="Add Visitor"
                        className="h-5 w-5 inline-block"
                      />
                    </button>
                    <button
                      className="btn px-3 py-1 rounded text-white bg-gray-500 hover:bg-gray-600 transition"
                      title="Add Appointment"
                      onClick={() => openModal(employee, "appointment")}
                    >
                      <img
                        src="/appointment.png"
                        alt="Add Appointment"
                        className="h-5 w-5 inline-block"
                      />
                    </button>
                  </div>
                </div>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-800">
                  <strong>Name:</strong> {employee.name}
                </p>
                <p className="text-sm text-gray-800">
                  <strong>Address:</strong> {employee.address || "N/A"}
                </p>
                <p className="text-sm text-gray-800">
                  <strong>Phone No:</strong> {employee.mobileNumber}
                </p>
                <p className="text-sm text-gray-800">
                  <strong>Email:</strong> {employee.email || "N/A"}
                </p>
                <p className="text-sm text-gray-800">
                  <strong>Office Time:</strong> {employee.officeTime || "N/A"}
                </p>
              </div>
            </div>
          </div>
        ))
      )}

      {/* Visitor Modal */}

      {isVisitorModalOpen && (
        <VisitorModal
          isOpen={isVisitorModalOpen}
          onClose={closeModals}
          employee={selectedEmployee}
          onSave={handleSaveVisitor}
        />
      )}

      {/* Appointment Modal */}
      {isAppointmentModalOpen && (
        <AppointmentModal
          isOpen={isAppointmentModalOpen}
          onClose={closeModals}
          appointmentToEdit={null}  // Pass null for adding new appointment
          onSave={handleSaveAppointment}  // Save the appointment to the list
          employees={employees}
          selectedEmployee={selectedEmployee}
        />
      )}
    </div>
  );
};

export default EmployeePanel;
