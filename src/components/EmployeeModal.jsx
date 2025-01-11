import React, { useState, useEffect } from "react";
import {
  Modal,
  TextField,
  Button,
  Box,
  MenuItem,
  IconButton,
} from "@mui/material";
import { motion } from "framer-motion";
import { FaTimes } from "react-icons/fa";

const EmployeeModal = ({ isOpen, onClose, onSave, employeeToEdit }) => {
  const [employee, setEmployee] = useState({
    name: "",
    address: "",
    mobileNumber: "",
    email: "",
    department: "",
    officeTime: "10:00 A.M",
    image: null, // Stores the base64 string
  });

  const [errors, setErrors] = useState({});
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
        setEmployee({ ...employee, image: reader.result }); // Save as base64
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    if (validateFields()) {
      onSave(employee);
      onClose();
    }
  }

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
          <FaTimes />
        </IconButton>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
          {employeeToEdit ? "Edit Employee" : "Add Employee"}
        </h2>
        <Box component="form" className="space-y-4">
          {/* Fields in a grid layout */}
          <Box
            display="grid"
            gridTemplateColumns="1fr 1fr"
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
            />
            <TextField
              label="Address"
              name="address"
              value={employee.address}
              onChange={handleChange}
              fullWidth
              variant="outlined"
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
            />
          </Box>
          <TextField
            label="Department"
            name="department"
            value={employee.department}
            onChange={handleChange}
            fullWidth
            required
            select // This tells the TextField to act as a dropdown
            variant="outlined"
            error={!!errors.department}
            helperText={errors.department}
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
          />

          {/* Image Upload Field */}
          <div className="image-upload">
            <label htmlFor="upload-image" style={{ display: "block", marginBottom: "8px" }}>
              Upload Employee Image:
            </label>
            <input
              type="file"
              id="upload-image"
              accept="image/*"
              onChange={handleImageUpload}
              style={{ display: "block", marginBottom: "16px" }}
            />
            {employee.image instanceof File && (
              <div style={{ marginTop: "10px" }}>
                <img
                  src={URL.createObjectURL(employee.image)}
                  alt="Employee"
                  style={{ width: "100px", height: "100px", objectFit: "cover", borderRadius: "8px" }}
                />
              </div>
            )}

          </div>
        </Box>
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

export default EmployeeModal;
