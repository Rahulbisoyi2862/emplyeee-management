import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router';
import ErrorPage from '../Admin/Components/ErrorPage';
import Sidebar from './Components/Sidebar';
import { Sun, Moon } from 'lucide-react';

const ParentEmployee = () => {
    const [loading, setLoading] = useState(true);
    const [unauthorized, setUnauthorized] = useState(false); // 🔥 added
    const [users, setUsers] = useState(null);
    const [darkMode, setDarkMode] = useState(() => {
        return localStorage.getItem("theme") === "dark";
    });

    useEffect(() => {
        async function getUsers() {
            try {
                const response = await fetch("http://localhost:5000/api/auth/user", {
                    method: "GET",
                    credentials: "include",
                });
                const data = await response.json();

                if (!response.ok) {
                    setUnauthorized(true); // ❌ no navigate
                } else {
                    setUsers(data);
                }
            } catch (error) {
                console.error("Error:", error.message);
                setUnauthorized(true);
            } finally {
                setLoading(false);
            }
        }

        getUsers();
    }, []);

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    }, [darkMode]);

    if (loading || unauthorized) return <ErrorPage />;

    return (
        <div className={`flex flex-col min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'}`}>

            {/* 🔹 Fixed Header */}
            <div className={`w-full p-4 flex justify-center items-center text-xl font-bold ${darkMode ? 'bg-gray-800 text-white' : 'bg-blue-900 text-white'} fixed top-0 left-0 right-0 z-50`}>
                <span className='flex justify-center'>Employee Management</span>
                <button
                    onClick={() => setDarkMode(!darkMode)}
                    className="ml-4 p-2 rounded hover:bg-gray-600"
                >
                    {darkMode ? <Sun size={24} /> : <Moon size={24} />}
                </button>
            </div>

            {/* 🔹 Sidebar + Content Container */}
            <div className="flex flex-1 pt-16">  {/* pt-16 to push below fixed header */}
                {/* Sidebar */}
                <Sidebar darkMode={darkMode} />

                {/* 🔹 Scrollable Content */}
                <div className="flex-1 p-5 overflow-auto h-[calc(100vh-4rem)]">
                    <Outlet context={{ users, target: users?.target }} />
                </div>
            </div>
        </div>
    );
};

export default ParentEmployee;
