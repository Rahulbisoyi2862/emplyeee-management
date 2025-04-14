import React from "react";
import logo from "../../assets/Logo.png";
import { useNavigate } from "react-router";

const Header = () => {
  const apiUrl =  import.meta.env.VITE_DOMIN
  console.log(apiUrl)
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      // Logout API call
      const response = await fetch(`${apiUrl}/api/auth/logout/admin`, {
        method: "GET",
        credentials: "include", // Include cookies with the request
      });

      if (response.ok) {
        // Clear the local state or redirect to login page
        navigate("/login");  // Redirect to the login page after logout
      } else {
        console.error("Logout failed!");
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };


  return (
    <header className="w-full h-16 bg-white shadow-sm border-b">
      <div className=" max-w-7xl mx-auto h-full px-4 sm:px-6 flex items-center justify-between lg:justify-start">
        {/* Menu Button (only visible on mobile) */}
        <button className="lg:hidden mr-2">
          <img src="/menu.svg" alt="Menu" className="h-6 w-6" />
        </button>

        {/* Centered Logo & Name */}
        <div className="absolute left-1/2 transform -translate-x-1/2 lg:static lg:translate-x-0 flex items-center gap-3">
          <img
            src={logo}
            alt="Company Logo"
            className="h-9 w-9 object-contain rounded-md"
          />
          <span className="text-lg font-semibold text-gray-800 whitespace-nowrap">
            Your Company
          </span>
        </div>

        {/* Logout Button */}
        <div className="ml-auto lg:ml-4">
          <button onClick={handleLogout} className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-all">
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
