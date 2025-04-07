// Sidebar.jsx
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../../assets/Logo.png"
import { UserPlus, Target, CalendarDays, LayoutDashboard, X } from "lucide-react";
import ProfileModal from "./ProfileModal"; // ProfileModal ko import kar rahe hain

const Sidebar = ({ context, isOpen, toggleSidebar }) => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal open/close state

  const imgPath = context.users.user.profileImg;
  const user = context.users.user;
  const uName = context.users.user.name

  // Modal ko toggle karne ke liye function
  const toggleModal = () => setIsModalOpen(!isModalOpen);

  return (
    <div
      className={`fixed lg:relative top-0 left-0 h-full bg-white border-r shadow-md p-4 space-y-4 transition-transform ${isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 w-64 z-50`}
    >
      {/* Close button for small screens */}
      <button className="lg:hidden absolute top-3 right-3" onClick={toggleSidebar}>
        <X size={22} />
      </button>

      {/* Profile Box with Image */}
      <div
        onClick={toggleModal} // Profile image pe click karne par modal open hoga
        className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-red-200 to-white rounded-xl cursor-pointer hover:shadow-md transition mb-6"
      >
        <img
          src={imgPath && imgPath.trim() !== "" ? `http://localhost:5000/uploads/${imgPath}` : logo}
          alt="Profile"
          className="w-10 h-10 rounded-full object-cover"
        />

        <div>
          <p className="text-sm font-semibold text-gray-800">{uName}</p>
          <p className="text-xs text-gray-500">View Profile</p>
        </div>
      </div>

      {/* Navigation Links */}
      <nav>
        <ul className="space-y-4 mt-10">
          <NavLink
            to="Dashboard"
            className={({ isActive }) =>
              `flex items-center gap-4 px-6 py-3 rounded-xl cursor-pointer hover:bg-gray-100 ${isActive ? "text-red-500 font-semibold bg-gray-100" : "text-gray-700"
              }`
            }
          >
            <LayoutDashboard size={20} />
            Dashboard
          </NavLink>

          <NavLink
            to="Leaderboard"
            className={({ isActive }) =>
              `flex items-center gap-4 px-6 py-3 rounded-xl cursor-pointer hover:bg-gray-100 ${isActive ? "text-red-500 font-semibold bg-gray-100" : "text-gray-700"
              }`
            }
          >
            <UserPlus size={20} />
            Leaderboard
          </NavLink>

          <NavLink
            to="mydetails"
            className={({ isActive }) =>
              `flex items-center gap-4 px-6 py-3 rounded-xl cursor-pointer hover:bg-gray-100 ${isActive ? "text-red-500 font-semibold bg-gray-100" : "text-gray-700"
              }`
            }
          >
            <UserPlus size={20} />
            My Details
          </NavLink>

          <NavLink
            to="Mytarget"
            className={({ isActive }) =>
              `flex items-center gap-4 px-6 py-3 rounded-xl cursor-pointer hover:bg-gray-100 ${isActive ? "text-red-500 font-semibold bg-gray-100" : "text-gray-700"
              }`
            }
          >
            <Target size={20} />
            My Target
          </NavLink>

          <NavLink
            to="leavetarget"
            className={({ isActive }) =>
              `flex items-center gap-4 px-6 py-3 rounded-xl cursor-pointer hover:bg-gray-100 ${isActive ? "text-red-500 font-semibold bg-gray-100" : "text-gray-700"
              }`
            }
          >
            <CalendarDays size={20} />
            Leave Target
          </NavLink>
        </ul>
      </nav>

      {/* Profile Modal */}
      <ProfileModal isOpen={isModalOpen} toggleModal={toggleModal} user={user} />
    </div>
  );
};

export default Sidebar;
