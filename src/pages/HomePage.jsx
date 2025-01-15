import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // Import default styles
import Clock from "react-clock"; // Import the analog clock component
import "react-clock/dist/Clock.css"; // Import the default clock styles
import { Link } from "react-router-dom";
import { formatDate, formatTime } from "../utils/dateUtils";

const HomePage = () => {
    const visitors = useSelector((state) => state.visitors.list);
    const visitorsToday = visitors.length; // Total number of visitors
    const appointments = useSelector((state) => state.appointments.list);
    const employees = useSelector((state) => state.employees.list);
    const activeEmployees = employees.length;
    const latestVisitorName = useSelector((state) => state.visitors.latestVisitorName);

    // Get the latest employee
    const latestEmployee = employees.length > 0 ? employees[employees.length - 1] : null;

    const [recentActivities, setRecentActivities] = useState([]);

    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState(new Date().toLocaleTimeString());

    // Update the clock every second
    useEffect(() => {
        const timer = setInterval(() => {
            setTime(new Date().toLocaleTimeString());
        }, 1000);

        return () => clearInterval(timer); // Cleanup on component unmount
    }, []);

    // Update recent activities whenever the latest visitor, latest appointment, or latest employee changes
    useEffect(() => {
        const activities = [];
    
        // Add visitor activity first
        if (latestVisitorName) {
            activities.push(
                <span key="latestVisitor">
                    A new visitor,{" "}
                    <Link
                        to="/visitors"
                        className="text-blue-500 font-bold hover:underline"
                    >
                        {latestVisitorName}
                    </Link>{" "}
                    , has just checked in!
                </span>
            );
        }
    
        // Add appointment activity second
        if (appointments.length > 0) {
            const latestAppointment = appointments[appointments.length - 1];
            const appointmentDate = new Date(latestAppointment.date);
            const formattedDate = formatDate(appointmentDate);
            const formattedTime = formatTime(appointmentDate);
    
            activities.push(
                <span key={`appointment-${latestAppointment.id}`}>
                    An appointment is set with{" "}
                    <Link
                        to="/appointments"
                        className="text-green-500 font-bold hover:underline"
                    >
                        {latestAppointment.appointmentWith}
                    </Link>{" "}
                    for {formattedDate} at {formattedTime}
                </span>
            );
        }
    
        // Add employee activity last
        if (latestEmployee) {
            activities.push(
                <span key="latestEmployee">
                    New team member on board:{" "}
                    <Link
                        to="/employees"
                        className="text-purple-500 font-bold hover:underline"
                    >
                        {latestEmployee.name} 🎊🎊
                    </Link>
                </span>
            );
        }
    
        setRecentActivities(activities);
    }, [latestVisitorName, appointments, latestEmployee]);
    

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            {/* Dashboard Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="bg-white shadow rounded-lg p-4">
                    <h3 className="text-xl font-bold text-gray-700">Visitors Today</h3>
                    <p className="text-3xl font-semibold text-blue-500 mt-2">{visitorsToday}</p>
                </div>
                <div className="bg-white shadow rounded-lg p-4">
                    <h3 className="text-xl font-bold text-gray-700">Upcoming Appointments</h3>
                    <p className="text-3xl font-semibold text-green-500 mt-2">{appointments.length}</p>
                </div>
                <div className="bg-white shadow rounded-lg p-4">
                    <h3 className="text-xl font-bold text-gray-700">Active Employees</h3>
                    <p className="text-3xl font-semibold text-purple-500 mt-2">{activeEmployees}</p>
                </div>
            </div>

            {/* Recent Activities */}
            <div className="bg-white shadow rounded-lg p-6 mb-6">
                <h2 className="text-2xl font-bold text-gray-700 mb-4">Recent Activities</h2>

                <ul className="space-y-2">
                    {recentActivities.map((activity, index) => (
                        <li key={index} className="text-gray-600">
                            • {activity}
                        </li>
                    ))}
                </ul>
            </div>

            {/* Layout for Calendar and Analog Clock */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white shadow-lg rounded-lg p-6 transition-transform transform hover:scale-105 hover:shadow-2xl hover:bg-gray-50 duration-300">
                    <h2 className="text-2xl font-bold text-gray-700 mb-4">Calendar</h2>
                    <Calendar
                        onChange={setDate}
                        value={date}
                        className="react-calendar rounded-lg shadow-md transition-all duration-300 hover:scale-105"
                    />
                    <div className="flex items-center mt-4 text-gray-600 font-medium">
                        <span className="text-blue-600 mr-2">Current Date:</span>
                        <span>{date.toDateString()}</span>
                    </div>
                </div>

                {/* Analog Clock */}
                <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col justify-center text-left items-center transition-transform transform hover:scale-105 hover:shadow-2xl hover:bg-gray-50 duration-300">
                    <h2 className="text-2xl font-bold text-gray-700 text-left mb-4">Clock</h2>
                    <Clock value={new Date()} size={200} renderNumbers={true} />
                    <div className="flex items-center mt-4 text-gray-600 font-medium">
                        <span className="text-blue-600 mr-2">Current Time:</span>
                        <span>{time}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
