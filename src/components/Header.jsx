import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { toggleEmployeePanel } from "../Redux/EmployeeSlice";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const isPanelOpen = useSelector((state) => state.employees.isEmployeePanelOpen);

  const toggleMenu = () => {
    dispatch(toggleEmployeePanel());
  };


  return (
    <nav className="bg-white border-b-4 border-green-600 shadow-sm relative z-50">
      <div className="container mx-auto px-4 py-2 flex items-center justify-between">
        {/* Logo Section */}
        <NavLink to="/" className="text-xl font-bold flex items-center">
          <img
            src="/OIP (5).jpeg" // Replace with the actual path to your logo
            alt="Logo"
            className="h-10 w-10"
          />
        </NavLink>

        {/* Navigation and Hamburger Menu */}
        <div className="flex items-center space-x-6">
          <ul className="hidden md:flex md:space-x-6">
            <li>
              <NavLink
                to="/visitors"
                className={({ isActive }) =>
                  isActive
                    ? "text-green-600 font-medium block py-2 px-4"
                    : "hover:text-green-600 font-medium block py-2 px-4"
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
                    ? "text-green-600 font-medium block py-2 px-4"
                    : "hover:text-green-600 font-medium block py-2 px-4"
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
                    ? "text-green-600 font-medium block py-2 px-4"
                    : "hover:text-green-600 font-medium block py-2 px-4"
                }
              >
                Employees
              </NavLink>
            </li>
          </ul>

          {/* Hamburger Menu */}
          <button onClick={toggleMenu}>
            {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Header;
