import React, { useState, useEffect } from 'react';
import { data, Outlet } from 'react-router';
import ErrorPage from '../Admin/Components/ErrorPage';
import Sidebar from './Components/Sidebar';
import Header from './Components/Header';
import { Menu } from 'lucide-react';

const ParentEmployee = () => {
    const [loading, setLoading] = useState(true);
    const [unauthorized, setUnauthorized] = useState(false); // 🔥 added
    const [users, setUsers] = useState(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Sidebar open state

    // Toggle Sidebar for mobile view
    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

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
                    console.log(data)
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

    if (loading || unauthorized) return <ErrorPage />;

    return (
        <div className="flex flex-col h-screen bg-white text-black">
            {/* 🔹 Fixed Header */}
            <Header />

            {/* 🔹 Sidebar + Content Container */}
            <div className="flex flex-1 pt-16 overflow-hidden relative"> {/* Added pt-16 to prevent overlap */}
                {/* Mobile sidebar toggle */}
                <button
                    className="lg:hidden fixed top-4 left-4 z-50 bg-red-700 text-white p-2 rounded-xl shadow-md"
                    onClick={toggleSidebar}
                >
                    <Menu size={22} />
                </button>

                {/* Sidebar */}
                <Sidebar
                    context={{ users,data:users.user }}
                    isOpen={isSidebarOpen}
                    toggleSidebar={toggleSidebar}
                />

                {/* 🔹 Scrollable Content */}
                <main className=" flex-1 overflow-auto bg-white  shadow-md">
                    <Outlet context={{ users, target: users?.target }} />
                </main>
            </div>
        </div>
    );
};

export default ParentEmployee;
