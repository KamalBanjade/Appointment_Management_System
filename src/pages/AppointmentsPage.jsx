import React, { useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addAppointment, editAppointment, deleteAppointment } from "../Redux/AppointmentSlice";
import AppointmentModal from "../components/AppointmentModal";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Edit as EditIcon } from "@mui/icons-material";
import { IconButton, Checkbox } from "@mui/material";
import { format } from "date-fns";
import PageLayout from "../utils/PageLayout";
import { motion, AnimatePresence } from "framer-motion";
import { toastConfig } from '../../src/toastConfig';

const AppointmentsPage = () => {
  const appointments = useSelector((state) => state.appointments.list);
  const employees = useSelector((state) => state.employees.list);
  const dispatch = useDispatch();
  const [isModalOpen, setModalOpen] = useState(false);
  const [appointmentToEdit, setAppointmentToEdit] = useState(null);
  const [completedAppointments, setCompletedAppointments] = useState({});

  const openModal = useCallback((appointment = null) => {
    setAppointmentToEdit(appointment);
    setModalOpen(true);
  }, []);

  const handleSaveAppointment = useCallback(
    (appointment) => {
      if (appointmentToEdit) {
        dispatch(editAppointment(appointment));
        toast.success("Appointment updated successfully!", toastConfig);
      } else {
        dispatch(addAppointment({ ...appointment, id: Date.now() }));
        toast.success("Appointment added successfully!", toastConfig);
      }
      setModalOpen(false);
      setAppointmentToEdit(null);
    },
    [appointmentToEdit, dispatch]
  );

  const handleCompleteAppointment = (id) => {
    setCompletedAppointments((prev) => ({ ...prev, [id]: true }));
    setTimeout(() => {
      dispatch(deleteAppointment(id));
      toast.success("Appointment marked as completed!", toastConfig);
    }, 500);
  };

  const formattedDate = (date) => {
    return format(new Date(date), "MMM dd, yyyy (HH:mm)");
  };

  // Helper function to get department by employee name
  const getDepartmentByEmployeeName = (employeeName) => {
    const employee = employees.find((emp) => emp.name === employeeName);
    return employee ? employee.department : "N/A";
  };

  return (
    <PageLayout
      title={<span className="text-sm lg:text-lg">Appointee's List:</span>}
      onAddClick={() => openModal()}
      addButtonText="Add Appointment"
      buttonStyle="text-xs lg:text-lg bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-2 rounded-lg shadow-md hover:from-green-600 hover:to-green-700 transition-all duration-300 "
    >
      {/* Responsive Table Container */}
      <div className="overflow-x-auto">
        <table className="min-w-full text-xs lg:text-sm text-gray-700 shadow-lg rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gradient-to-r from-gray-200 to-gray-300 text-black">
              <th className="border border-gray-300 px-4 py-3 text-center font-semibold">S.N</th>
              <th className="border border-gray-300 px-4 py-3 text-center font-semibold">Appointee's Name</th>
              <th className="border border-gray-300 px-4 py-3 text-center font-semibold">Phone Number</th>
              <th className="border border-gray-300 px-4 py-3 text-center font-semibold">Reason</th>
              <th className="border border-gray-300 px-4 py-3 text-center font-semibold">Date (Time)</th>
              <th className="border border-gray-300 px-4 py-3 text-center font-semibold">Appointment with (Department)</th>
              <th className="border border-gray-300 px-4 py-3 text-center font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment, index) => (
              <AnimatePresence key={appointment.id}>
                {!completedAppointments[appointment.id] && (
                  <motion.tr
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className={`hover:bg-gradient-to-r from-gray-50 to-gray-100 transition-all duration-300 transform hover:scale-100 hover:shadow-lg ${index % 2 === 0 ? "bg-gray-50" : "bg-white"
                      }`}
                  >
                    <td className="border border-gray-200 px-4 py-2 text-gray-700 text-center">
                      <div className="flex items-center justify-start space-x-2">
                        <Checkbox
                          onChange={() => handleCompleteAppointment(appointment.id)}
                          sx={{
                            color: "#d73838",
                            "&.Mui-checked": {
                              color: "#d73838",
                            },
                            transition: "transform 0.5s ease-in-out, color 0.5s ease-in-out",
                          }}
                          inputProps={{
                            "data-fakefiller-ignore": "true",
                            "aria-label": "controlled",
                          }}
                          disableRipple
                        />
                        <span>{index + 1}</span>
                      </div>
                    </td>
                    <td className="border border-gray-200 px-4 py-2 text-gray-800 font-medium text-center">
                      {appointment.appointeeName}
                    </td>
                    <td className="border border-gray-200 px-4 py-2 text-gray-700 text-center">
                      <a
                        href={`tel:${appointment.phoneNumber}`}
                        className="text-blue-500 hover:underline hover:text-blue-600 transition-all duration-300"
                      >
                        {appointment.phoneNumber}
                      </a>
                    </td>
                    <td className="border border-gray-200 px-4 py-2 text-gray-800 text-center">
                      {appointment.reason}
                    </td>
                    <td className="border border-gray-200 px-4 py-2 text-gray-700 text-center">
                      {formattedDate(appointment.date)}
                    </td>
                    <td className="border border-gray-200 px-4 py-2 text-gray-700 font-medium text-center">
                      {appointment.appointmentWith} ({getDepartmentByEmployeeName(appointment.appointmentWith)})
                    </td>
                    <td className="border border-gray-200 px-4 py-2 justify-center space-x-2 text-center">
                      <IconButton
                        onClick={() => openModal(appointment)}
                        color="success"
                        sx={{
                          backgroundColor: "#48bb78",
                          color: "white",
                          borderRadius: "8px",
                          padding: "8px",
                          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                          "&:hover": {
                            backgroundColor: "#3a9c63",
                          },
                        }}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                    </td>
                  </motion.tr>
                )}
              </AnimatePresence>
            ))}
          </tbody>
        </table>
      </div>
      {isModalOpen && (
        <AppointmentModal
          isOpen={isModalOpen}
          onClose={() => setModalOpen(false)}
          onSave={handleSaveAppointment}
          appointmentToEdit={appointmentToEdit}
          employees={employees}
        />
      )}
      <ToastContainer position="bottom-right" autoClose={3000} theme="colored" />
    </PageLayout>
  );
};

export default AppointmentsPage;