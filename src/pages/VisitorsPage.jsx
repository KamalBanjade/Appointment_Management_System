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
import { toastConfig } from '../../src/toastConfig'; 

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
      toast.success("Visitor updated successfully!" , toastConfig);
    } else {
      dispatch(addVisitor({ ...visitor, id: Date.now() }));
      toast.success("Visitor added successfully!", toastConfig);
    }
    setModalOpen(false);
    setVisitorToEdit(null);
  };

  const handleDeleteVisitor = (id) => {
    dispatch(deleteVisitor(id));
    toast.error("Visitor deleted successfully!" , toastConfig);
  };

  const formattedDate = (date) => {
    return format(new Date(date), "MMM dd, yyyy (HH:mm)");
  };

  return (
    <PageLayout
    title={<span className="text-sm lg:text-lg">Visitor's List:</span>}
      onAddClick={() => openModal()}
      addButtonText="Add Visitor"
      buttonStyle="text-xs lg:text-lg bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-2 rounded-lg shadow-md hover:from-blue-600 hover:to-blue-700 transition-all duration-300"
    >
      {/* Responsive Table Container */}
      <div className="overflow-x-auto">
        <table className="min-w-full text-xs lg:text-sm text-gray-700 shadow-lg rounded-lg overflow-hidden">
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
                className="hover:bg-gradient-to-r from-gray-50 to-gray-100 transition-all duration-300 transform hover:scale-100 hover:shadow-lg"
              >
                <td className="border border-gray-200 px-4 py-2 text-gray-700 text-center">
                  {index + 1}
                </td>
                <td className="border border-gray-200 px-4 py-2 text-gray-800 font-medium ">
                <span className="inline-block px-3 py-1 text-xs lg:text-sm">{visitor.visitorName}</span>
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
                <span className="inline-block px-3 py-1 text-xs lg:text-sm">{visitor.visitReason}</span>
                </td>
                <td className="border border-gray-200 px-4 py-2 text-gray-700">
                <span className="inline-block px-3 py-1 text-xs lg:text-sm">{formattedDate(visitor.visitDate)}</span>
                </td>
                <td className="border border-gray-200 px-4 py-2 text-center font-medium text-gray-700">
                <span className="inline-block px-3 py-1 text-xs lg:text-sm">{visitor.appointmentWith}</span>
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
      </div>

      {/* Modal */}
      {isModalOpen && (
        <VisitorModal
          isOpen={isModalOpen}
          onClose={() => setModalOpen(false)}
          onSave={handleSaveVisitor}
          visitorToEdit={visitorToEdit}
        />
      )}

      {/* Toast Container */}
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