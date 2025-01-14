import React, { useState, useEffect } from "react";
import { Modal, TextField, Button, MenuItem, Box, IconButton } from "@mui/material";
import { FaTimes } from "react-icons/fa";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";

const AppointmentModal = ({
  isOpen,
  onClose,
  onSave,
  appointmentToEdit,
  employees,
  selectedEmployee,
}) => {
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

  const handleSubmit = () => {
    if (!validateFields()) return;
  
    const selectedEmployee = employees.find(
      (employee) => employee.name === appointment.appointmentWith
    );
  
    if (!selectedEmployee || !selectedEmployee.email) {
      alert("Email not found for the selected employee.");
      return;
    }
  
    const employeeEmail = selectedEmployee.email;
  
    const appointmentDate = new Date(appointment.date);
    const formattedDate = appointmentDate.toLocaleDateString([], {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    const formattedTime = appointmentDate.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  
    const emailData = {
      visitor_Name: appointment.visitorName,
      recipient_name: appointment.appointmentWith,
      appointment_date: formattedDate,
      appointment_time: formattedTime,
      department: selectedEmployee.department || "No department", // Ensure department is set
      office_contact: appointment.phoneNumber,
      to_email: employeeEmail,
    };
  
    console.log("Email Data:", emailData);
  
    emailjs
      .send("service_ddikcul", "template_odr0a8c", emailData, "Li6wdbLmAvMDclI_9")
      .then(
        (response) => {
          console.log("Email sent successfully!", response.status, response.text);
          onSave(appointment);
          onClose();
        },
        (error) => {
          console.error("Failed to send email:", error);
          alert("Failed to send the email. Please try again.");
        }
      );
  };
  

  return (
    <Modal open={isOpen} onClose={onClose}>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
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
        }}
      >
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

        <h2
          style={{
            fontSize: "1.5rem",
            fontWeight: "bold",
            textAlign: "center",
            color: "#495057",
            marginBottom: "20px",
            borderBottom: "2px solid #dee2e6",
            paddingBottom: "8px",
          }}
        >
          {appointmentToEdit ? "Edit Appointment" : "Add Appointment"}
        </h2>

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
            style={{ backgroundColor: "#fff", borderRadius: "8px" }}
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
            style={{ backgroundColor: "#fff", borderRadius: "8px" }}
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
            style={{ backgroundColor: "#fff", borderRadius: "8px" }}
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
            style={{ backgroundColor: "#fff", borderRadius: "8px" }}
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
            style={{ backgroundColor: "#fff", borderRadius: "8px" }}
          >
            {employees.map((employee) => (
              <MenuItem key={employee.email} value={employee.name}>
                {employee.name} - {employee.department || "No department"}
              </MenuItem>
            ))}
          </TextField>
        </Box>

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
            }}
          >
            Clear
          </Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            color="primary"
            size="large"
            style={{
              borderRadius: "8px",
              padding: "8px 16px",
              textTransform: "none",
            }}
          >
            Save
          </Button>
        </div>
      </motion.div>
    </Modal>
  );
};

export default AppointmentModal;
