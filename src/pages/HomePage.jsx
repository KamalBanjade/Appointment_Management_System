import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Clock from "react-clock";
import "react-clock/dist/Clock.css";
import { Link } from "react-router-dom";
import { formatDate, formatTime } from "../utils/dateUtils";
import { motion } from "framer-motion";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import EventNoteIcon from "@mui/icons-material/EventNote";
import GroupIcon from "@mui/icons-material/Group";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import TodayIcon from "@mui/icons-material/Today";
import ActivityFeedIcon from "@mui/icons-material/ListAlt";

const HomePage = () => {
  const visitors = useSelector((state) => state.visitors.list);
  const visitorsToday = visitors.length;
  const appointments = useSelector((state) => state.appointments.list);
  const employees = useSelector((state) => state.employees.list);
  const activeEmployees = employees.length;
  const latestVisitorName = useSelector(
    (state) => state.visitors.latestVisitorName
  );
  const latestEmployee =
    employees.length > 0 ? employees[employees.length - 1] : null;
  const [recentActivities, setRecentActivities] = useState([]);
  const [activityFilter, setActivityFilter] = useState("all");
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const activities = [];
    if (latestVisitorName) {
      activities.push(
        <span key="latestVisitor">
          A new visitor,{" "}
          <Link
            to="/visitors"
            className="text-blue-500 font-bold hover:underline"
          >
            {latestVisitorName}
          </Link>
          , has just checked in!
        </span>
      );
    }
    if (appointments.length > 0) {
      const latestAppointment = appointments[appointments.length - 1];
      activities.push(
        <span key={`appointment-${latestAppointment.id}`}>
          An appointment is set with{" "}
          <Link
            to="/appointments"
            className="text-green-500 font-bold hover:underline"
          >
            {latestAppointment.appointmentWith}
          </Link>{" "}
          on {formatDate(new Date(latestAppointment.date))} at{" "}
          {formatTime(new Date(latestAppointment.date))}.
        </span>
      );
    }
    if (latestEmployee) {
      activities.push(
        <span key="latestEmployee">
          New team member onboard:{" "}
          <Link
            to="/employees"
            className="text-purple-500 font-bold hover:underline"
          >
            {latestEmployee.name}
          </Link>{" "}
          🎊🎊
        </span>
      );
    }
    setRecentActivities(activities);
  }, [latestVisitorName, appointments, latestEmployee]);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning!";
    if (hour < 18) return "Good Afternoon!";
    return "Good Evening!";
  };

  const filteredActivities = recentActivities.filter((activity) => {
    if (activityFilter === "all") return true;
    return activity.key.includes(activityFilter);
  });

  return (
    <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg rounded-lg p-6 mb-6 text-center text-white">
          <h1 className="text-4xl font-bold">{getGreeting()}</h1>
          <p className="text-lg mt-2">
            Welcome back! Here's a quick summary of your day.
          </p>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {/* Visitors Today Card */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-white shadow-lg rounded-lg p-6 transition-transform transform hover:shadow-2xl"
        >
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-blue-100 rounded-full">
              <PeopleAltIcon fontSize="large" className="text-blue-500" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-700">Visitors Today</h3>
              <p className="text-3xl font-semibold text-blue-500 mt-2">
                {visitorsToday}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Upcoming Appointments Card */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-white shadow-lg rounded-lg p-6 transition-transform transform hover:shadow-2xl"
        >
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-green-100 rounded-full">
              <EventNoteIcon fontSize="large" className="text-green-500" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-700">
                Upcoming Appointments
              </h3>
              <p className="text-3xl font-semibold text-green-500 mt-2">
                {appointments.length}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Active Employees Card */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-white shadow-lg rounded-lg p-6 transition-transform transform hover:shadow-2xl"
        >
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-purple-100 rounded-full">
              <GroupIcon fontSize="large" className="text-purple-500" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-700">
                Active Employees
              </h3>
              <p className="text-3xl font-semibold text-purple-500 mt-2">
                {activeEmployees}
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Recent Activities Section */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white shadow-lg rounded-lg p-6 mb-6"
      >
        <div className="flex items-center space-x-2 mb-4">
          <ActivityFeedIcon className="text-gray-700" fontSize="large" />
          <h2 className="text-2xl font-bold text-gray-700">Recent Activities</h2>
        </div>
        {filteredActivities.length > 0 ? (
          <ul className="list-disc pl-5 space-y-2">
            {filteredActivities.map((activity, index) => (
              <li key={index} className="text-gray-600">
                {activity}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No activities found for the selected filter.</p>
        )}
      </motion.div>

      {/* Calendar and Clock Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Calendar Card */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white shadow-lg rounded-lg p-6 transition-transform transform hover:shadow-2xl"
        >
          <div className="flex items-center space-x-2 mb-4">
            <TodayIcon className="text-gray-700" fontSize="large" />
            <h2 className="text-2xl font-bold text-gray-700">Calendar</h2>
          </div>
          <Calendar
            onChange={setDate}
            value={date}
            className="react-calendar rounded-lg shadow-md"
          />
          <div className="flex items-center mt-4 text-gray-600 font-medium">
            <span className="text-blue-600 mr-2">Current Date:</span>
            <span>{date.toDateString()}</span>
          </div>
        </motion.div>

        {/* Clock Card */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white shadow-lg rounded-lg p-6 flex flex-col justify-center items-center transition-transform transform hover:shadow-2xl"
        >
          <div className="flex items-center space-x-2 mb-4">
            <AccessTimeIcon className="text-gray-700" fontSize="large" />
            <h2 className="text-2xl font-bold text-gray-700">Clock</h2>
          </div>
          <Clock value={new Date()} size={200} renderNumbers={true} />
          <div className="flex items-center mt-4 text-gray-600 font-medium">
            <span className="text-blue-600 mr-2">Current Time:</span>
            <span>{time}</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HomePage;