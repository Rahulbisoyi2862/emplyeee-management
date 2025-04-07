import React, { useState, useEffect } from "react";
import { Menu } from "lucide-react";
import Header from "../Admin/Components/Header";
import Sidebar from "../Admin/Components/Sidebar";
import { Outlet } from "react-router";
import ErrorPage from "./Components/ErrorPage";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Parent = () => {
  const [selectedTab, setSelectedTab] = useState("employeeTarget");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [unauthorized, setUnauthorized] = useState(false);
  const [darkMode] = useState(false); // dark/light mode disabled as per request

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  useEffect(() => {
    async function getUsers() {
      try {
        const response = await fetch("http://localhost:5000/api/auth/admin", {
          method: "GET",
          credentials: "include",
        });
        const data = await response.json();

        if (!response.ok) {
          console.log(data);
          setUnauthorized(true);
        }
      } catch (error) {
        console.error("Error:", error);
        toast.error("Internal Server Error");
        setUnauthorized(true);
      } finally {
        setLoading(false);
      }
    }

    getUsers();
  }, []);

  if (loading || unauthorized) return <ErrorPage />;

  return (
    <div className="flex flex-col h-screen bg-gray-100 text-black">
      {/* Header */}
      <Header />

      {/* Main layout */}
      <div className="flex flex-1 overflow-hidden relative">
        {/* Mobile sidebar toggle */}
        <button
          className="lg:hidden fixed top-4 left-4 z-50 bg-red-700 text-white p-2 rounded-xl shadow-md"
          onClick={toggleSidebar}
        >
          <Menu size={22} />
        </button>

        {/* Sidebar */}
        <Sidebar
          setSelectedTab={setSelectedTab}
          isOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
        />

        {/* Main Content */}
        <main className="flex-1 overflow-auto bg-white  shadow-md">
          <Outlet />
          <ToastContainer />
        </main>
      </div>
    </div>
  );
};

export default Parent;
