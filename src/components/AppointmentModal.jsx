import React, { useState, useEffect } from "react";
import { Modal, TextField, Button, MenuItem, Box, IconButton, CircularProgress } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes } from "react-icons/fa";
import emailjs from "@emailjs/browser";
import { useDispatch } from "react-redux";
import { formatDate, formatTime } from "../utils/dateUtils";

const AppointmentModal = ({
  isOpen,
  onClose,
  onSave,
  appointmentToEdit,
  employees,
  selectedEmployee,
}) => {
  const dispatch = useDispatch();
  const defaultAppointmentState = {
    visitorName: "",
    phoneNumber: "",
    reason: "",
    date: "",
    appointmentWith: "",
    department: "",
  };

  const [appointment, setAppointment] = useState(defaultAppointmentState);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (appointmentToEdit) {
      setAppointment(appointmentToEdit);
    } else {
      setAppointment(defaultAppointmentState);
    }
  }, [appointmentToEdit]);

  useEffect(() => {
    if (selectedEmployee) {
      setAppointment((prevState) => ({
        ...prevState,
        appointmentWith: selectedEmployee.name,
        department: selectedEmployee.department || "No department",
      }));
    }
  }, [selectedEmployee]);

  const validateFields = () => {
    const newErrors = {};
    if (!appointment.visitorName) newErrors.visitorName = "Name is required.";
    if (!appointment.phoneNumber) newErrors.phoneNumber = "Phone number is required.";
    if (!appointment.reason) newErrors.reason = "Reason is required.";
    if (!appointment.date) newErrors.date = "Date is required.";
    if (!appointment.appointmentWith) newErrors.appointmentWith = "Please select an employee.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAppointment({ ...appointment, [name]: value });
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const handleClear = () => {
    setAppointment(defaultAppointmentState);
    setErrors({});
  };

  const handleSubmit = async () => {
    if (!validateFields()) return;

    setIsSubmitting(true);

    try {
      const selectedEmployee = employees.find(
        (employee) => employee.name === appointment.appointmentWith
      );

      if (!selectedEmployee || !selectedEmployee.email) {
        alert("Email not found for the selected employee.");
        setIsSubmitting(false);
        return;
      }

      const employeeEmail = selectedEmployee.email;

      const appointmentDate = new Date(appointment.date);
      const formattedDate = formatDate(appointmentDate);
      const formattedTime = formatTime(appointmentDate);

      const emailData = {
        visitor_Name: appointment.visitorName,
        recipient_name: appointment.appointmentWith,
        appointment_date: formattedDate,
        appointment_time: formattedTime,
        department: selectedEmployee.department || "No department",
        office_contact: appointment.phoneNumber,
        to_email: employeeEmail,
      };

      const appointmentData = {
        ...appointment,
        id: appointment.id || Date.now().toString(),
      };

      onSave(appointmentData);

      await emailjs.send("service_ddikcul", "template_odr0a8c", emailData, "Li6wdbLmAvMDclI_9");
      console.log("Email sent successfully!");
      onClose();
    } catch (error) {
      console.error("Failed to send email:", error);
      alert("Failed to send the email. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <div>
        <AnimatePresence>
          <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.3 }}
          style={{
            backgroundColor: "#f8f9fa",
            borderRadius: "16px",
            boxShadow: "0 8px 24px rgba(0, 0, 0, 0.2)",
            padding: "32px",
            maxWidth: "600px",
            margin: "auto",
            marginTop: "10vh",
            outline: "none",
            position: "relative",
            background: "linear-gradient(145deg, #ffffff, #f9f9f9)",
          }}
           className="w-[90%] sm:w-[80%] md:w-[70%] lg:w-[600px] overflow-y-auto max-h-[90vh]"
          >
            {/* Close Icon */}
            <IconButton
              onClick={onClose}
              aria-label="Close modal"
              style={{
                position: "absolute",
                top: "16px",
                right: "16px",
                backgroundColor: "rgba(0, 0, 0, 0.05)",
                transition: "transform 0.2s ease-in-out",
              }}
              size="small"
              sx={{
                "&:hover": {
                  backgroundColor: "rgba(0, 0, 0, 0.1)",
                  transform: "scale(1.1)",
                },
              }}
            >
              <FaTimes />
            </IconButton>

            {/* Title */}
            <h2
              style={{
                fontSize: "1.5rem",
                fontWeight: "bold",
                textAlign: "center",
                color: "#16A34A",
                marginBottom: "20px",
                borderBottom: "2px solid #dee2e6",
                paddingBottom: "8px",
              }}
            >
              {appointmentToEdit ? "Edit Appointment" : "Add Appointment"}
            </h2>


            {/* Form */}
            <Box component="form" className="space-y-5">
              <TextField
                label="Visitor Name"
                name="visitorName"
                value={appointment.visitorName}
                onChange={handleChange}
                fullWidth
                required
                variant="outlined"
                error={!!errors.visitorName}
                helperText={errors.visitorName}
                className="bg-white rounded-lg"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "&:hover fieldset": {
                      borderColor: "#16A34A",
                    },
                  },
                }}
              />
              <TextField
                label="Phone Number"
                name="phoneNumber"
                value={appointment.phoneNumber}
                onChange={handleChange}
                fullWidth
                required
                type="tel"
                variant="outlined"
                error={!!errors.phoneNumber}
                helperText={errors.phoneNumber}
                className="bg-white rounded-lg"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "&:hover fieldset": {
                      borderColor: "#16A34A",
                    },
                  },
                }}
              />
              <TextField
                label="Reason"
                name="reason"
                value={appointment.reason}
                onChange={handleChange}
                fullWidth
                required
                multiline
                rows={3}
                variant="outlined"
                error={!!errors.reason}
                helperText={errors.reason}
                className="bg-white rounded-lg"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "&:hover fieldset": {
                      borderColor: "#16A34A",
                    },
                  },
                }}
              />
              <TextField
                label="Date"
                name="date"
                type="datetime-local"
                value={appointment.date}
                onChange={handleChange}
                fullWidth
                required
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
                error={!!errors.date}
                helperText={errors.date}
                className="bg-white rounded-lg"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "&:hover fieldset": {
                      borderColor: "#16A34A",
                    },
                  },
                }}
              />
              <TextField
                select
                label="Appointment With"
                name="appointmentWith"
                value={appointment.appointmentWith}
                onChange={handleChange}
                fullWidth
                required
                variant="outlined"
                error={!!errors.appointmentWith}
                helperText={errors.appointmentWith || "Select an employee for the appointment."}
                className="bg-white rounded-lg"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "&:hover fieldset": {
                      borderColor: "#16A34A",
                    },
                  },
                }}
              >
                {employees.map((employee) => (
                  <MenuItem key={employee.email} value={employee.name}>
                    {employee.name} - {employee.department || "No department"}
                  </MenuItem>
                ))}
              </TextField>
            </Box>

            {/* Action Buttons */}
            <div className="mt-6 flex justify-between">
              <Button
                onClick={handleClear}
                variant="outlined"
                color="warning"
                size="large"
                style={{
                  borderRadius: "8px",
                  padding: "8px 16px",
                  textTransform: "none",
                  background: "linear-gradient(145deg, #ff9800, #fb8c00)",
                  color: "white",
                  transition: "transform 0.2s ease-in-out",
                }}
                sx={{
                  "&:hover": {
                    transform: "scale(1.05)",
                  },
                }}
              >
                Clear
              </Button>
              <Button
                onClick={handleSubmit}
                variant="contained"
                color="primary"
                size="large"
                disabled={isSubmitting}
                style={{
                  borderRadius: "8px",
                  padding: "8px 16px",
                  textTransform: "none",
                  background: "linear-gradient(145deg, #16A34A, #166534)",
                  color: "white",
                  transition: "transform 0.2s ease-in-out",
                }}
                sx={{
                  "&:hover": {
                    transform: "scale(1.05)",
                  },
                }}
              >
                {isSubmitting ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "Save"
                )}
              </Button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </Modal>
  );
};

export default AppointmentModal;