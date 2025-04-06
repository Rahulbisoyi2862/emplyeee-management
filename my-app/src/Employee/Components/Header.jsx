import React from 'react';

const Header = ({ darkMode, setDarkMode }) => {
    return (
        <div className={`w-full p-4 relative text-xl font-bold flex items-center justify-center ${darkMode ? 'bg-gray-800 text-white' : 'bg-blue-900 text-white'}`}>
            <span className="absolute left-1/2 transform -translate-x-1/2">Employee Management</span>
            <button
                onClick={() => setDarkMode(!darkMode)}
                className="absolute right-4 p-2 rounded hover:bg-gray-600"
            >
                {darkMode ? <Sun size={24} /> : <Moon size={24} />}
            </button>
        </div>
    )


};

export default Header;
