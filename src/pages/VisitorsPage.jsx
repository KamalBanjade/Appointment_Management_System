import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addVisitor, editVisitor, deleteVisitor } from "../Redux/VisitorSlice";
import VisitorModal from "../components/VisitorModal";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { format } from "date-fns";
import PageLayout from "../utils/PageLayout";

const VisitorPage = () => {
  const visitors = useSelector((state) => state.visitors.list);
  const dispatch = useDispatch();
  const [isModalOpen, setModalOpen] = useState(false);
  const [visitorToEdit, setVisitorToEdit] = useState(null);

  const openModal = (visitor = null) => {
    setVisitorToEdit(visitor);
    setModalOpen(true);
  };

  const handleSaveVisitor = (visitor) => {
    if (visitorToEdit) {
      dispatch(editVisitor(visitor));
      toast.success("Visitor updated successfully!");
    } else {
      dispatch(addVisitor({ ...visitor, id: Date.now() }));
      toast.success("Visitor added successfully!");
    }
    setModalOpen(false);
    setVisitorToEdit(null);
  };

  const handleDeleteVisitor = (id) => {
    dispatch(deleteVisitor(id));
    toast.error("Visitor deleted successfully!");
  };

  const formattedDate = (date) => {
    return format(new Date(date), "MMM dd, yyyy (HH:mm)");
  };

  return (
    <PageLayout
      title="Visitor's List"
      onAddClick={() => openModal()}
      addButtonText="Add Visitor"
      buttonStyle="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600"
    >
      <table className="w-full text-sm text-gray-700 shadow-lg rounded-lg overflow-hidden text-center">
        <thead>
          <tr className="bg-gradient-to-r from-gray-200 to-gray-300 text-black">
            <th className="border border-gray-300 px-4 py-3 text-center font-semibold">SN</th>
            <th className="border border-gray-300 px-4 py-3 text-center font-semibold">Visitor Name</th>
            <th className="border border-gray-300 px-4 py-3 text-center font-semibold">Phone Number</th>
            <th className="border border-gray-300 px-4 py-3 text-center font-semibold">Reason</th>
            <th className="border border-gray-300 px-4 py-3 text-center font-semibold">Date (Time)</th>
            <th className="border border-gray-300 px-4 py-3 text-center font-semibold">Visit with (Department)</th>
            <th className="border border-gray-300 px-4 py-3 text-center font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody>
          {visitors.map((visitor, index) => (
            <tr
              key={visitor.id}
              className="hover:bg-gradient-to-r from-gray-50 to-gray-100 transition-all duration-300 transform hover:scale-105 hover:shadow-md"
            >
              <td className="border border-gray-200 px-4 py-2 text-gray-700 text-center">
                {index + 1}
              </td>
              <td className="border border-gray-200 px-4 py-2 text-gray-800 font-medium">
                {visitor.name}
              </td>
              <td className="border border-gray-200 px-4 py-2 text-gray-700">
                <a
                  href={`tel:${visitor.phoneNumber}`}
                  className="text-blue-500 hover:underline hover:text-blue-700 transition-all duration-300"
                >
                  {visitor.phoneNumber}
                </a>
              </td>
              <td className="border border-gray-200 px-4 py-2 text-gray-800">
                {visitor.visitReason}
              </td>
              <td className="border border-gray-200 px-4 py-2 text-gray-700">
                {formattedDate(visitor.visitDate)}
              </td>
              <td className="border border-gray-200 px-4 py-2 font-medium text-gray-700">
                {visitor.appointmentWith}
              </td>
              <td className="border border-gray-200 px-4 py-2 flex justify-center space-x-2">
                <IconButton
                  onClick={() => openModal(visitor)}
                  color="success"
                  sx={{
                    backgroundColor: "#3B82F6",
                    color: "white",
                    borderRadius: "8px",
                    padding: "8px",
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                    transition: "transform 0.15s ease-in-out, box-shadow 0.15s ease-in-out",
                    "&:hover": {
                      backgroundColor: "#3B82F6",
                      transform: "scale(1.05)",
                      boxShadow: "0 6px 8px rgba(0, 0, 0, 0.15)",
                    },
                  }}
                >
                  <EditIcon fontSize="small" />
                </IconButton>
                <IconButton
                  onClick={() => handleDeleteVisitor(visitor.id)}
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

      {isModalOpen && (
        <VisitorModal
          isOpen={isModalOpen}
          onClose={() => setModalOpen(false)}
          onSave={handleSaveVisitor}
          visitorToEdit={visitorToEdit}
        />
      )}

      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </PageLayout>
  );
};

export default VisitorPage;