import React from "react";
import {
  LayoutDashboard,
  Users,
  UserPlus,
  Mail,
  Target,
  Settings,
  X,
  TrendingUp,
} from "lucide-react";
import { NavLink } from "react-router";

const Sidebar = ({ setSelectedTab, isOpen, toggleSidebar }) => {
  
  return(
  
  <div
    className={`fixed lg:relative top-0 left-0 h-full bg-white border-r shadow-md p-4 space-y-4 transition-transform ${
      isOpen ? "translate-x-0" : "-translate-x-full"
    } lg:translate-x-0 w-64 z-50`}
  >
    {/* Close button for small screens */}
    <button className="lg:hidden absolute top-3 right-3" onClick={toggleSidebar}>
      <X size={22} />
    </button>

    {/* Profile Box with Image */}
    <div className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-red-200 to-white rounded-xl cursor-pointer hover:shadow-md transition">
        <img
          src="https://i.pravatar.cc/40?img=3"
          alt="Profile"
          className="w-10 h-10 rounded-full object-cover"
        />
        <div>
          <p className="text-sm font-semibold text-gray-800">Admin Name</p>
          <p className="text-xs text-gray-500">View Profile</p>
        </div>
      </div>

    {/* Navigation Links */}
    <ul className="mt-6 space-y-1">
      <NavLink
        to="DashboardPage"
        className={({ isActive }) =>
          `flex items-center gap-3 px-6 py-3 rounded-xl cursor-pointer hover:bg-gray-100 ${
            isActive ? "text-red-500 font-semibold bg-gray-100" : "text-gray-700"
          }`
        }
        onClick={() => setSelectedTab("dashboard")}
      >
        <LayoutDashboard size={18} />
        Dashboard
      </NavLink>

      <NavLink
        to="AllEmployees"
        className={({ isActive }) =>
          `flex items-center gap-3 px-6 py-3 rounded-xl cursor-pointer hover:bg-gray-100 ${
            isActive ? "text-red-500 font-semibold bg-gray-100" : "text-gray-700"
          }`
        }
        onClick={() => setSelectedTab("allEmployees")}
      >
        <Users size={18} />
        All Employees
      </NavLink>

      <NavLink
        to="user-create"
        className={({ isActive }) =>
          `flex items-center gap-3 px-6 py-3 rounded-xl cursor-pointer hover:bg-gray-100 ${
            isActive ? "text-red-500 font-semibold bg-gray-100" : "text-gray-700"
          }`
        }
        onClick={() => setSelectedTab("userCreate")}
      >
        <UserPlus size={18} />
        User Create
      </NavLink>

      <NavLink
        to="employee-target"
        className={({ isActive }) =>
          `flex items-center gap-3 px-6 py-3 rounded-xl cursor-pointer hover:bg-gray-100 ${
            isActive ? "text-red-500 font-semibold bg-gray-100" : "text-gray-700"
          }`
        }
        onClick={() => setSelectedTab("employeeTarget")}
      >
        <Target size={18} />
        Employee Target
      </NavLink>

      <NavLink
        to="leave-management"
        className={({ isActive }) =>
          `flex items-center gap-3 px-6 py-3 rounded-xl cursor-pointer hover:bg-gray-100 ${
            isActive ? "text-red-500 font-semibold bg-gray-100" : "text-gray-700"
          }`
        }
        onClick={() => setSelectedTab("leaveManagement")}
      >
        <Mail size={18} />
        Leave Management
      </NavLink>

      <NavLink
        to="StockDetailPage"
        className={({ isActive }) =>
          `flex items-center gap-3 px-6 py-3 rounded-xl cursor-pointer hover:bg-gray-100 ${
            isActive ? "text-red-500 font-semibold bg-gray-100" : "text-gray-700"
          }`
        }
        onClick={() => setSelectedTab("Stock")}
      >
       <TrendingUp/>
       Stock Detail
      </NavLink>

      <NavLink
        to="Setting"
        className={({ isActive }) =>
          `flex items-center gap-3 px-6 py-3 rounded-xl cursor-pointer hover:bg-gray-100 ${
            isActive ? "text-red-500 font-semibold bg-gray-100" : "text-gray-700"
          }`
        }
        onClick={() => setSelectedTab("Setting")}
      >
        <Settings size={18} />
        Settings
      </NavLink>
    </ul>
  </div>
);}

export default Sidebar;
