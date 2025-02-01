import React, { useState, useEffect } from "react";
import { Modal, TextField, Button, MenuItem, Box, IconButton, Grid, Typography, CircularProgress } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes } from "react-icons/fa";
import { useDispatch } from "react-redux";

const VisitorModal = ({ isOpen, onClose, onSave, visitorToEdit, employee }) => {
  const dispatch = useDispatch();
  const defaultVisitorState = {
    name: "",
    email: "",
    phoneNumber: "",
    visitReason: "",
    visitDate: "",
    appointmentWith: employee?.department || "",
  };

  const [visitor, setVisitor] = useState(defaultVisitorState);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const departments = ["IT", "Finance", "HR", "Admin", "Sales"];

  useEffect(() => {
    if (visitorToEdit) {
      setVisitor(visitorToEdit);
    } else {
      setVisitor({
        ...defaultVisitorState,
        appointmentWith: employee?.department || "",
      });
    }
  }, [visitorToEdit, employee]);

  const validateFields = () => {
    const newErrors = {};
    if (!visitor.name) newErrors.name = "Name is required.";
    if (!visitor.email || !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(visitor.email)) {
      newErrors.email = "Valid email is required.";
    }
    if (!visitor.phoneNumber) {
      newErrors.phoneNumber = "Valid phone number is required.";
    }
    if (!visitor.visitReason) newErrors.visitReason = "Reason is required.";
    if (!visitor.visitDate) newErrors.visitDate = "Date is required.";
    if (!visitor.appointmentWith) newErrors.appointmentWith = "Department is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVisitor((prev) => ({ ...prev, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const handleClear = () => {
    setVisitor(defaultVisitorState);
    setErrors({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateFields()) {
      setIsSubmitting(true);
      const updatedVisitor = visitorToEdit
        ? { ...visitor }
        : { ...visitor, id: new Date().getTime() };

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      onSave(updatedVisitor);
      setIsSubmitting(false);
      onClose();
    }
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      {/* Wrap AnimatePresence in a div to hold the ref */}
      <div>
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
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

            <Typography
              variant="h5"
              component="h2"
              style={{
                textAlign: "center",
                fontWeight: "bold",
                marginBottom: "20px",
                borderBottom: "2px solid #dee2e6",
                paddingBottom: "8px",
                color: "#3B82F6",
              }}
            >
              {visitorToEdit ? "Edit Visitor" : "Add Visitor"}
            </Typography>

            {/* Form */}
            <Box component="form" className="space-y-5">
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
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "&:hover fieldset": {
                      borderColor: "#3B82F6",
                    },
                  },
                }}
              />
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
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
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        "&:hover fieldset": {
                          borderColor: "#3B82F6",
                        },
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
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
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        "&:hover fieldset": {
                          borderColor: "#3B82F6",
                        },
                      },
                    }}
                  />
                </Grid>
              </Grid>
              <TextField
                label="Reason for Visit"
                name="visitReason"
                value={visitor.visitReason}
                onChange={handleChange}
                fullWidth
                required
                multiline
                rows={3}
                variant="outlined"
                error={!!errors.visitReason}
                helperText={errors.visitReason}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "&:hover fieldset": {
                      borderColor: "#3B82F6",
                    },
                  },
                }}
              />

              {/* Date Input */}
              <TextField
                id="visitDate"
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
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "&:hover fieldset": {
                      borderColor: "#3B82F6",
                    },
                  },
                }}
              />

              <TextField
                select
                label="Appointment With"
                name="appointmentWith"
                value={visitor.appointmentWith}
                onChange={handleChange}
                fullWidth
                required
                variant="outlined"
                error={!!errors.appointmentWith}
                helperText={errors.appointmentWith || "Select a department for the appointment."}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "&:hover fieldset": {
                      borderColor: "#3B82F6",
                    },
                  },
                }}
              >
                <MenuItem value="">
                  <em>Select a Department</em>
                </MenuItem>
                {departments.map((dept) => (
                  <MenuItem key={dept} value={dept}>
                    {dept}
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
                  background: "linear-gradient(145deg, #3B82F6, #2563eb)",
                  color: "white",
                  transition: "transform 0.2s ease-in-out",
                }}
                sx={{
                  "&:hover": {
                    transform: "scale(1.05)",
                  },
                }}
              >
                {isSubmitting ? <CircularProgress size={24} color="inherit" /> : "Save"}
              </Button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </Modal>
  );
};

export default VisitorModal;