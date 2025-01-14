import React, { useState, useEffect } from "react";
import { Modal, TextField, Button, MenuItem, Box, IconButton } from "@mui/material";
import { motion } from "framer-motion";
import { FaTimes } from "react-icons/fa";
const VisitorModal = ({ isOpen, onClose, onSave, visitorToEdit, employee }) => {
  const defaultVisitorState = {
    name: "",
    email: "",
    phoneNumber: "",
    visitReason: "",
    visitDate: "",
    appointmentWith: employee?.department || "",  // Set the default to employee's department
  };

  const [visitor, setVisitor] = useState(defaultVisitorState);
  const [errors, setErrors] = useState({});
  const department = ["IT", "Finance", "HR", "Admin", "Sales"];

  useEffect(() => {
    if (visitorToEdit) {
      setVisitor(visitorToEdit);
    } else {
      setVisitor(defaultVisitorState);
    }
  }, [visitorToEdit, employee]); // Add employee as a dependency so that it updates when employee changes


  useEffect(() => {
    if (visitorToEdit) {
      setVisitor(visitorToEdit);
    } else {
      setVisitor(defaultVisitorState);
    }
  }, [visitorToEdit]);

  const validateFields = () => {
    const newErrors = {};
    if (!visitor.name) newErrors.name = "Name is required.";
    if (!visitor.email) newErrors.email = "Email is required.";
    if (!visitor.phoneNumber) newErrors.phoneNumber = "Phone number is required.";
    if (!visitor.visitReason) newErrors.visitReason = "Reason is required.";
    if (!visitor.visitDate) newErrors.visitDate = "Date is required.";
    if (!visitor.appointmentWith) newErrors.appointmentWith = "Appointment is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVisitor({ ...visitor, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handleClear = () => {
    setVisitor(defaultVisitorState);
    setErrors({});
  };

  const handleSubmit = () => {
    if (validateFields()) {
      onSave(visitor);
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
          aria-label="Close modal"
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
          <FaTimes />
        </IconButton>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
          {visitorToEdit ? "Edit Visitor" : "Add Visitor"}
        </h2>

        <Box component="form" className="space-y-4">
          <TextField
            label="Name"
            name="name"
            value={visitor.name}
            onChange={handleChange}
            fullWidth
            required
            variant="outlined"
            error={!!errors.name}
            helperText={errors.name}
          />
          <TextField
            label="Email"
            name="email"
            value={visitor.email}
            onChange={handleChange}
            fullWidth
            required
            variant="outlined"
            error={!!errors.email}
            helperText={errors.email}
          />
          <TextField
            label="Phone Number"
            name="phoneNumber"
            value={visitor.phoneNumber}
            onChange={handleChange}
            fullWidth
            required
            variant="outlined"
            error={!!errors.phoneNumber}
            helperText={errors.phoneNumber}
          />
          <TextField
            label="Reason for Visit"
            name="visitReason"
            value={visitor.visitReason}
            onChange={handleChange}
            fullWidth
            required
            variant="outlined"
            error={!!errors.visitReason}
            helperText={errors.visitReason}
          />
          <TextField
            label="Date"
            name="visitDate"
            type="datetime-local"
            value={visitor.visitDate}
            onChange={handleChange}
            fullWidth
            required
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
            error={!!errors.visitDate}
            helperText={errors.visitDate}
          />
          <TextField
            label="Appointment With"
            name="appointmentWith"
            value={visitor.appointmentWith || employee?.department || ""} // Set default to employee's department
            onChange={handleChange}
            fullWidth
            required
            select
            variant="outlined"
            error={!!errors.appointmentWith}
            helperText={errors.appointmentWith || "Select a department for the appointment."}
          >
            <MenuItem value="">
              <em>Select a Department</em>
            </MenuItem>
            {department.map((dept) => (
              <MenuItem key={dept} value={dept}>
                {dept}
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
          >
            Clear
          </Button>
          <div className="flex space-x-2">
            <Button
              onClick={handleSubmit}
              variant="contained"
              color="primary"
              size="large"
            >
              Save
            </Button>
          </div>
        </div>
      </motion.div>
    </Modal>
  );
};

export default VisitorModal;
