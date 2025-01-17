import React from "react";
import { useSelector } from "react-redux";

const PageLayout = ({ children, title, onAddClick, addButtonText, buttonStyle }) => {
  const isMenuOpen = useSelector((state) => state.employees.isEmployeePanelOpen);

  return (
    <div className="container mx-auto px-4 py-8">
      <div
        className={`transition-all duration-300 ease-in-out bg-white rounded-lg shadow-sm ${
          isMenuOpen ? "w-auto md:w-3/4 lg:w-3/4" : "w-auto"
        }`}
      >
        <div className="flex items-center justify-between mb-6 p-6">
          <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
          <button
            onClick={onAddClick}
            className={buttonStyle} // Apply custom button styles
          >
            {addButtonText}
          </button>
        </div>
      </div>

      <div
        className={`mt-6 transition-all duration-300 ease-in-out bg-white rounded-lg shadow-lg ${
          isMenuOpen ? "w-auto md:w-3/4 lg:w-3/4" : "w-auto"
        }`}
      >
        {children}
      </div>
    </div>
  );
};

export default PageLayout;