import React, { useState, useEffect } from "react";
import {
  Modal,
  TextField,
  Button,
  Box,
  MenuItem,
  IconButton,
  Typography,
  CircularProgress,
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { addEmployee, editEmployee } from "../Redux/EmployeeSlice";

const EmployeeModal = ({ isOpen, onClose, onSave, employeeToEdit }) => {
  const [employee, setEmployee] = useState({
    name: "",
    address: "",
    mobileNumber: "",
    email: "",
    department: "",
    officeTime: "10:00 A.M",
    image: null,
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const department = ["IT", "Finance", "HR", "Admin", "Sales"];

  useEffect(() => {
    if (employeeToEdit) {
      setEmployee(employeeToEdit);
    } else {
      setEmployee({
        name: "",
        address: "",
        mobileNumber: "",
        email: "",
        department: "",
        officeTime: "10:00 A.M",
        image: null,
      });
    }
  }, [employeeToEdit]);

  const validateFields = () => {
    const newErrors = {};
    if (!employee.name) newErrors.name = "Name is required.";
    if (!employee.mobileNumber) newErrors.mobileNumber = "Mobile number is required.";
    if (!employee.email) newErrors.email = "Email is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setEmployee({ ...employee, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    if (!validateFields()) return;

    setIsSubmitting(true);

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (!employee.id) {
      const newEmployee = { ...employee, id: Date.now() };
      onSave(newEmployee); // Call onSave with the new employee
    } else {
      onSave(employee); // Call onSave with the edited employee
    }

    setIsSubmitting(false);
    onClose(); // Close the modal
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
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
            maxWidth: "650px",
            margin: "auto",
            marginTop: "10vh",
            outline: "none",
            position: "relative",
            background: "linear-gradient(145deg, #ffffff, #f9f9f9)",
            maxHeight: "90vh", // Set max height for the modal
            overflowY: "auto", // Enable vertical scrolling
          }}
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
          <Typography
            variant="h5"
            component="h2"
            style={{
              textAlign: "center",
              fontWeight: "bold",
              marginBottom: "20px",
              borderBottom: "2px solid #dee2e6",
              paddingBottom: "8px",
              color: "#9333EA",
            }}
          >
            {employeeToEdit ? "Edit Employee" : "Add Employee"}
          </Typography>

          {/* Form */}
          <Box component="form" className="space-y-4">
            {/* Fields in a grid layout */}
            <Box
              display="grid"
              gridTemplateColumns="repeat(auto-fit, minmax(280px, 1fr))"
              gap="16px"
              marginBottom="16px"
            >
              <TextField
                label="Name"
                name="name"
                value={employee.name}
                onChange={handleChange}
                fullWidth
                required
                variant="outlined"
                error={!!errors.name}
                helperText={errors.name}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "&:hover fieldset": {
                      borderColor: "#9333EA",
                    },
                  },
                }}
              />
              <TextField
                label="Address"
                name="address"
                value={employee.address}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "&:hover fieldset": {
                      borderColor: "#9333EA",
                    },
                  },
                }}
              />
              <TextField
                label="Mobile Number"
                name="mobileNumber"
                value={employee.mobileNumber}
                onChange={handleChange}
                fullWidth
                required
                type="tel"
                variant="outlined"
                error={!!errors.mobileNumber}
                helperText={errors.mobileNumber}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "&:hover fieldset": {
                      borderColor: "#9333EA",
                    },
                  },
                }}
              />
              <TextField
                label="Email"
                name="email"
                value={employee.email}
                onChange={handleChange}
                fullWidth
                required
                type="email"
                variant="outlined"
                error={!!errors.email}
                helperText={errors.email}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "&:hover fieldset": {
                      borderColor: "#9333EA",
                    },
                  },
                }}
              />
            </Box>
            <TextField
              label="Department"
              name="department"
              value={employee.department || ""}
              onChange={handleChange}
              fullWidth
              required
              select
              variant="outlined"
              error={!!errors.department}
              helperText={errors.department}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&:hover fieldset": {
                    borderColor: "#9333EA",
                  },
                },
              }}
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
            <TextField
              label="Office Time"
              name="officeTime"
              value={employee.officeTime}
              onChange={handleChange}
              fullWidth
              variant="outlined"
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&:hover fieldset": {
                    borderColor: "#9333EA",
                  },
                },
              }}
            />
            <div className="image-upload" style={{ marginTop: "16px" }}>
              <Typography variant="subtitle1" style={{ marginBottom: "8px" }}>
                Upload Employee Image:
              </Typography>
              <input
                type="file"
                id="upload-image"
                accept="image/*"
                onChange={handleImageUpload}
                style={{
                  display: "block",
                  border: "1px solid #ccc",
                  padding: "8px",
                  borderRadius: "8px",
                  transition: "border-color 0.3s ease",
                }}
              />
              {employee.image && (
                <div style={{ marginTop: "16px", textAlign: "center" }}>
                  <img
                    src={employee.image}
                    alt="Employee"
                    style={{
                      width: "120px",
                      height: "120px",
                      objectFit: "cover",
                      borderRadius: "50%",
                      border: "2px solid #ccc",
                      transition: "transform 0.3s ease",
                    }}
                    className="hover:scale-105"
                  />
                </div>
              )}
            </div>
          </Box>

          {/* Action Buttons */}
          <div className="mt-6 flex justify-between">
            <Button
              onClick={() =>
                setEmployee({
                  name: "",
                  address: "",
                  mobileNumber: "",
                  email: "",
                  department: "",
                  officeTime: "10:00 A.M",
                  image: null,
                })
              }
              variant="outlined"
              color="warning"
              size="large"
              style={{
                padding: "8px 24px",
                borderRadius: "8px",
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
                padding: "8px 24px",
                borderRadius: "8px",
                background: "linear-gradient(145deg, #9333EA, #6B21A8)",
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
    </Modal>
  );
};

export default EmployeeModal;