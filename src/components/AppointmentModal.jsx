import React, { useState, useEffect } from "react";
import { Modal, TextField, Button, MenuItem, Box, IconButton } from "@mui/material";
import { FaTimes } from "react-icons/fa"
import { motion } from "framer-motion";

const AppointmentModal = ({ isOpen, onClose, onSave, appointmentToEdit, employees }) => {
  const [appointment, setAppointment] = useState({
    visitorName: "",
    phoneNumber: "",
    reason: "",
    date: "",
    appointmentWith: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (appointmentToEdit) {
      setAppointment(appointmentToEdit);
    } else {
      setAppointment({
        visitorName: "",
        phoneNumber: "",
        reason: "",
        date: "",
        appointmentWith: "",
      });
    }
  }, [appointmentToEdit]);

  const validateFields = () => {
    const newErrors = {};
    if (!appointment.visitorName) newErrors.visitorName = "Name is required.";
    if (!appointment.phoneNumber) newErrors.phoneNumber = "Phone number is required.";
    if (!appointment.reason) newErrors.reason = "Reason is required.";
    if (!appointment.date) newErrors.date = "Date is required.";
    if (!appointment.appointmentWith)
      newErrors.appointmentWith = "Please select an employee.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAppointment({ ...appointment, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handleClear = () => {
    setAppointment({
      visitorName: "",
      phoneNumber: "",
      reason: "",
      date: "",
      appointmentWith: "",
    });
    setErrors({});
  };

  const handleSubmit = () => {
    if (validateFields()) {
      onSave(appointment);
      onClose();
    }
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.3 }}
    style={{
      backgroundColor: "white",
      borderRadius: "16px",
      boxShadow: "0 8px 24px rgba(0, 0, 0, 0.2)",
      padding: "24px",
      maxWidth: "600px",
      margin: "auto",
      marginTop: "10vh",
      outline: "none",
      position: "relative",
    }}
  >
    {/* Close Icon */}
    <IconButton
      onClick={onClose}
      style={{
        position: "absolute",
        top: "12px",
        right: "12px",
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
      <FaTimes/>
    </IconButton>

    {/* Modal Header */}
    <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
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
      >
        {Array.isArray(employees) && employees.length > 0 ? (
          employees.map((employee) => (
            <MenuItem key={employee.email} value={employee.name}>
              {employee.name}
            </MenuItem>
          ))
        ) : (
          <MenuItem disabled>No employees available</MenuItem>
        )}
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
        }}
      >
        Clear
      </Button>
      <div className="flex space-x-2">
        <Button
          onClick={handleSubmit}
          variant="contained"
          color="primary"
          size="large"
          style={{
            borderRadius: "8px",
            padding: "8px 16px",
          }}
        >
          Save
        </Button>
      </div>
    </div>
  </motion.div>
</Modal>

  );
};

export default AppointmentModal;
