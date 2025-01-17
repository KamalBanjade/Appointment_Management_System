import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { toggleEmployeePanel } from "../Redux/EmployeeSlice";
import '../App.css'

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const isPanelOpen = useSelector((state) => state.employees.isEmployeePanelOpen);
  const location = useLocation();

  const toggleMenu = () => {
    dispatch(toggleEmployeePanel());
  };

  // Determine the border color based on the current route
  const getBorderColor = () => {
    if (location.pathname === "/") {
      return "gradient-border"; // Multicolored gradient for home page
    } else if (location.pathname === "/visitors") {
      return "border-blue-600"; // Blue for visitors page
    } else if (location.pathname === "/appointments") {
      return "border-green-600"; // Green for appointments page
    } else if (location.pathname === "/employees") {
      return "border-purple-600"; // Purple for employees page
    } else {
      return "border-green-600"; // Default color
    }
  };

  return (
    <nav className={`w-full py-2 bg-white border-b-4 ${getBorderColor()} shadow-lg relative z-50`}>
      <div className="container mx-auto px-2 flex items-center justify-between">
        {/* Logo Section */}
        <NavLink
          to="/"
          className="text-xl font-bold flex items-center hover:scale-105 transition-transform duration-300"
        >
          <img
            src="/clock.jpg" // Replace with the actual path to your logo
            alt="Logo"
            className="h-13 w-14 mr-3 rounded-lg shadow-sm"
          />
        </NavLink>

        {/* Navigation and Hamburger Menu */}
        <div className="flex items-center space-x-6">
          {/* Desktop Navigation */}
          <ul className="hidden md:flex md:space-x-8">
            <li>
              <NavLink
                to="/visitors"
                className={({ isActive }) =>
                  isActive
                    ? "text-blue-600 font-semibold block px-4 border-b-2 border-blue-600 hover:text-blue-700 transition-all duration-300"
                    : "text-gray-700 font-medium block px-4 hover:text-blue-600 hover:border-b-2 hover:border-blue-600 transition-all duration-300"
                }
              >
                Visitors
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/appointments"
                className={({ isActive }) =>
                  isActive
                    ? "text-green-600 font-semibold block px-4 border-b-2 border-green-600 hover:text-green-700 transition-all duration-300"
                    : "text-gray-700 font-medium block px-4 hover:text-green-600 hover:border-b-2 hover:border-green-600 transition-all duration-300"
                }
              >
                Appointments
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/employees"
                className={({ isActive }) =>
                  isActive
                    ? "text-purple-600 font-semibold block px-4 border-b-2 border-purple-600 hover:text-purple-700 transition-all duration-300"
                    : "text-gray-700 font-medium block px-4 hover:text-purple-600 hover:border-b-2 hover:border-purple-600 transition-all duration-300"
                }
              >
                Employees
              </NavLink>
            </li>
          </ul>

          <button
            onClick={toggleMenu}
            className="text-gray-700 hover:text-green-600 transition-all duration-300"
          >
            {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Header;