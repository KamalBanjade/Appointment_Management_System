import React from 'react';
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import AppointmentsPage from "./pages/AppointmentsPage";
import VisitorsPage from "./pages/VisitorsPage";
import EmployeesPage from "./pages/EmployeesPage";
import EmployeePanel from './pages/EmployeePanel';

const MyRoutes = () => {
  return (
    <>
      <Header />
      <EmployeePanel />
      <Routes>
        
        <Route path="/appointments" element={<AppointmentsPage />} />
        <Route path="/visitors" element={<VisitorsPage />} />
        <Route path="/employees" element={<EmployeesPage />} />
      </Routes>
    </>
  );
};

export default MyRoutes;
