import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { UserPlus, Target, CalendarDays, MessageCircle, Menu, X } from "lucide-react";

const Sidebar = ({ darkMode }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      {/* Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className={`md:hidden p-3 fixed top-2 left-2 z-50 
        ${darkMode ? "text-white bg-gray-800" : "text-white bg-blue-900"}`}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <div 
        className={`fixed md:relative top-0 left-0 h-full p-5 transition-all duration-300 w-64 
        ${darkMode ? "bg-gray-800 text-white" : "bg-blue-900 text-white"}
        ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 z-40`}
      >
        <nav>
          <ul className="space-y-2 mt-10">
            <NavLink to="Leaderboard" className="block">
              <li className="flex items-center space-x-3 hover:bg-gray-700 p-3">
                <UserPlus /> <span>Leaderboard</span>
              </li>
            </NavLink>
            <NavLink to="mydetails" className="block">
              <li className="flex items-center space-x-3 hover:bg-gray-700 p-3">
                <UserPlus /> <span>My Details</span>
              </li> 
            </NavLink>
            <NavLink to="Mytarget" className="block">
              <li className="flex items-center space-x-3 hover:bg-gray-700 p-3">
                <Target /> <span>My Target</span>
              </li> 
            </NavLink>
            <NavLink to="leavetarget" className="block">
              <li className="flex items-center space-x-3 hover:bg-gray-700 p-3">
                <CalendarDays /> <span>Leave Target</span>
              </li> 
            </NavLink>
         
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
