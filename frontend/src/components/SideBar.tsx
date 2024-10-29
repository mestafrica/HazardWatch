import { Link } from "react-router-dom";
import React from "react";
import adminDashboard from "../assets/images/adminDashboard.jpg";
import {
  FaHome,
  FaCalendarAlt,
  FaInbox,
  FaCog,
  FaBullhorn,
  FaSignOutAlt,
} from "react-icons/fa";

const Sidebar: React.FC = () => {
  return (
    <aside className="w-80 bg-[#F4F4F5] h-screen p-4 border-gray-200">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800  hover:bg-[#E8E8EA] active:bg-[#E8E8EA] focus:outline-none focus:ring focus:ring-[#E8E8EA]">
          Ghana Hazard Reporter
        </h1>
      </div>

      <div className="mt-auto pt-4">
        <div className="flex justify-center">
          <img
            className="w-[10vw] h-[30vh] rounded-full"
            src={adminDashboard}
            alt=""
            srcSet=""
          />
        </div>

        <div className="mt-[10%]">
          <h1 className="text-md font-medium text-gray-800">Erica</h1>
          <h1 className="text-md text-gray-500">erica@example.com</h1>
        </div>
      </div>

      <div className="flex flex-col space-y-4 ">
        <Link
          to="admin-dashboard"
          className="flex items-center text-gray-700 mt-[5%] p-2  hover:bg-[#E8E8EA] active:bg-[#E8E8EA] focus:outline-none focus:ring focus:ring-[#E8E8EA] rounded-md"
        >
          <FaHome className="mr-3" />
          Home
        </Link>
        <Link
          to="admin-dashboard/events"
          className="flex items-center text-gray-700 p-2  hover:bg-[#E8E8EA] active:bg-[#E8E8EA] focus:outline-none focus:ring focus:ring-[#E8E8EA] rounded-md"
        >
          <FaCalendarAlt className="mr-3" />
          Events
        </Link>
        <Link
          to="admin-dashboard/inbox"
          className="flex items-center text-gray-700  p-2  hover:bg-[#E8E8EA] active:bg-[#E8E8EA] focus:outline-none focus:ring focus:ring-[#E8E8EA] rounded-md"
        >
          <FaInbox className="mr-3" />
          Inbox
        </Link>
        <Link
          to="admin-dashboard/broadcasts"
          className="flex items-center text-gray-700  p-2  hover:bg-[#E8E8EA] active:bg-[#E8E8EA] focus:outline-none focus:ring focus:ring-[#E8E8EA] rounded-md"
        >
          <FaBullhorn className="mr-3" />
          Broadcasts
        </Link>
        <Link
          to="admin-dashboard/settings"
          className="flex items-center text-gray-700 p-2  hover:bg-[#E8E8EA] active:bg-[#E8E8EA] focus:outline-none focus:ring focus:ring-[#E8E8EA] rounded-md"
        >
          <FaCog className="mr-3" />
          Settings
        </Link>
      </div>

      <Link
        to="/login" //i will put the logout route here
        className="flex items-center text-gray-700 hover:bg-gray-100 p-2 mt-[10%] rounded-md"
      >
        <FaSignOutAlt className="mr-3" />
        Logout
      </Link>
    </aside>
  );
};

export default Sidebar;
