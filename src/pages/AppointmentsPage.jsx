import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addAppointment, editAppointment, deleteAppointment } from "../Redux/AppointmentSlice";
import AppointmentModal from "../components/AppointmentModal";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";
import { IconButton } from "@mui/material";

const AppointmentsPage = () => {
  const appointments = useSelector((state) => state.appointments.list);
  const employees = useSelector((state) => state.employees.list);
  const dispatch = useDispatch();
  const [isModalOpen, setModalOpen] = useState(false);
  const [appointmentToEdit, setAppointmentToEdit] = useState(null);
  const isMenuOpen = useSelector((state) => state.employees.isEmployeePanelOpen);

  const openModal = (appointment = null) => {
    setAppointmentToEdit(appointment);
    setModalOpen(true);
  };

  const handleSaveAppointment = (appointment) => {
    if (appointmentToEdit) {
      dispatch(editAppointment(appointment));
      toast.success("Appointment updated successfully!");
    } else {
      dispatch(addAppointment({ ...appointment, id: Date.now() }));
      toast.success("Appointment added successfully!");
    }
    setModalOpen(false);
    setAppointmentToEdit(null);
  };
  

  const handleDeleteAppointment = (id) => {
    dispatch(deleteAppointment(id));
    toast.error("Appointment deleted successfully!");
  };

  return (
    <div className="container mx-20 mt-10">
      <div
        className={`mt-4 transition-all duration-300 ease-in-out bg-white rounded-lg ${
          isMenuOpen ? "w-auto md:w-3/4 lg:w-3/4" : "w-auto"
        }`}
      >
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">Appointment's List</h1>
          <button
            onClick={() => openModal()}
            className="bg-green-500 text-white px-4 py-2 rounded shadow hover:bg-green-600"
          >
            Add Appointment
          </button>
        </div>
      </div>
      
      <div
        className={`mt-4 transition-all duration-300 ease-in-out bg-white rounded-lg ${
          isMenuOpen ? "w-auto md:w-3/4 lg:w-3/4" : "w-auto"
        }`}
      >
        <table className="min-w-full border-collapse border border-gray-200 shadow-lg rounded-lg text-center">
          <thead>
            <tr className="bg-gradient-to-r from-gray-200 to-gray-300 text-black">
              <th className="border border-gray-300 px-4 py-3 text-center font-semibold">SN</th>
              <th className="border border-gray-300 px-4 py-3 text-center font-semibold">Visitor's Name</th>
              <th className="border border-gray-300 px-4 py-3 text-center font-semibold">Phone Number</th>
              <th className="border border-gray-300 px-4 py-3 text-center font-semibold">Reason</th>
              <th className="border border-gray-300 px-4 py-3 text-center font-semibold">Date (Time)</th>
              <th className="border border-gray-300 px-4 py-3 text-center font-semibold">Appointment with</th>
              <th className="border border-gray-300 px-4 py-3 text-center font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment, index) => (
              <tr key={appointment.id} className="hover:bg-gradient-to-r from-gray-100 to-gray-200 transition-all duration-300 transform">
                <td className="border border-gray-200 px-4 py-2 text-gray-700 font-medium">{index + 1}</td>
                <td className="border border-gray-200 px-4 py-2 text-gray-800 font-medium">
                  <span className="inline-block px-3 py-1 text-sm">
                    {appointment.visitorName}
                  </span>
                </td>
                <td className="border border-gray-200 px-4 py-2 text-gray-700">
                  <a
                    href={`tel:${appointment.phoneNumber}`}
                    className="text-blue-500 hover:underline hover:text-blue-700"
                  >
                    {appointment.phoneNumber}
                  </a>
                </td>
                <td className="border border-gray-200 px-4 py-2 text-gray-800 font-medium">
                  <span className="inline-block px-2 py-1 text-sm">
                    {appointment.reason}
                  </span>
                </td>
                <td className="border border-gray-200 px-4 py-2">{appointment.date}</td>
                <td className="border border-gray-200 px-4 py-2 text-gray-900">{appointment.appointmentWith}</td>
                <td className="border border-gray-200 px-4 py-2 flex space-x-2">
                  <IconButton
                    onClick={() => openModal(appointment)}
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
                    onClick={() => handleDeleteAppointment(appointment.id)}
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
  <AppointmentModal
    isOpen={isModalOpen}
    onClose={() => setModalOpen(false)}
    onSave={handleSaveAppointment}
    appointmentToEdit={appointmentToEdit} // Pass the current appointment
    employees={employees} // Pass employees for the "Appointment with" dropdown
  />
)}


      <ToastContainer />
    </div>
  );
};

export default AppointmentsPage;
