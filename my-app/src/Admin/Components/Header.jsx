import React from "react";
import logo from "../../assets/Logo.png"
const Header = () => {
  return (
    <header className="w-full h-16 bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 flex items-center justify-between lg:justify-start">
        {/* Menu Button (only visible on mobile) */}
        <button className="lg:hidden mr-2">
          <img src="/menu.svg" alt="Menu" className="h-6 w-6" />
        </button>

        {/* Centered Logo & Name */}
        <div className="absolute left-1/2 transform -translate-x-1/2 lg:static lg:translate-x-0 flex items-center gap-3">
          <img
            src={logo} // 👈 apna logo path yahan update karo
            alt="Company Logo"
            className="h-9 w-9 object-contain rounded-md"
          />
          <span className="text-lg font-semibold text-gray-800 whitespace-nowrap">
            Your Company
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;
