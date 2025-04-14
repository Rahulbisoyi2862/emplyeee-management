import React from "react";
import logo from "../../assets/Logo.png";
import { useNavigate } from "react-router-dom";
const Header = () => {

  const apiUrl =  import.meta.env.VITE_DOMIN
  console.log(apiUrl)

  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      // Logout API call
      const response = await fetch(`${apiUrl}/api/auth/logout/user`, {
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
    <header className="w-full h-16 bg-white shadow-sm border-b fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 flex items-center justify-between">
        {/* Menu Button (only visible on mobile) */}
        <button className="lg:hidden mr-2">
          <img src="/menu.svg" alt="Menu" className="h-6 w-6" />
        </button>

        {/* Centered Logo & Name */}
        <div className="flex-1 flex items-center justify-center lg:justify-start gap-3">
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
        <div className="ml-auto">
          <button onClick={handleLogout} className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-all">
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
