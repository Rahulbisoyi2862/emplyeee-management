import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
const SelectTarget = () => {
  const navigate = useNavigate();
  const [allemp, setAllEmp] = useState([]);
  const [loading, setLoading] = useState(true);
  // ✅ Employee Data (Example)

  // ✅ Search State
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    async function getUsers() {
      try {
        const response = await fetch("http://localhost:5000/api/user/data", {
          method: "GET",
          credentials: "include",
        });
        const data = await response.json();
        setAllEmp(data);
      } catch (error) {
        console.error("Error:", error.message);
      } finally {
        setLoading(false);
      }
    }

    getUsers();
  }, []);

  // ✅ Filter Employees
  const filteredEmployees = allemp.filter(
    (employee) =>
      employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.id.toString().includes(searchQuery)
  );

  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen flex flex-col items-center">
      <h1 className="text-2xl font-bold text-blue-400 mb-4">📋 Select Employee</h1>

      {/* ✅ Search Bar */}
      <input
        type="text"
        placeholder="🔍 Search by name or position..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="p-3 mb-6 border border-gray-600 rounded-lg w-full max-w-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
      />

      {/* ✅ Employee Table (Desktop) */}
      <div className="hidden sm:block w-full max-w-4xl">
        <table className="w-full bg-gray-800 border border-gray-700 rounded-lg shadow-md">
          <thead>
            <tr className="bg-blue-500 text-white">
              <th className="p-3">ID</th>
              <th className="p-3">Name</th>
              <th className="p-3">Position</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.length > 0 ? (
              filteredEmployees.map((employee) => (
                <tr key={employee.id} className="hover:bg-gray-700 transition">
                  <td className="p-3 border-b border-gray-700">{employee.id}</td>
                  <td className="p-3 border-b border-gray-700">{employee.name}</td>
                  <td className="p-3 border-b border-gray-700">{employee.email}</td>
                  <td className="p-3 border-b border-gray-700">
                    <button
                      onClick={() => navigate("TargetForm")}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition"
                    >
                      ➕ Add
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="p-3 text-center">❌ No employees found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ✅ Mobile View */}
      <div className="sm:hidden w-full max-w-md">
        {filteredEmployees.length > 0 ? (
          filteredEmployees.map((employee) => (
            <div key={employee.id} className="p-4 mb-4 bg-gray-800 rounded-lg shadow-md">
              <div className="flex justify-between">
                <span className="text-blue-400 font-semibold">ID:</span>
                <span>{employee.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-400 font-semibold">Name:</span>
                <span>{employee.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-400 font-semibold">email:</span>
                <span>{employee.email}</span>
              </div>
              <button
                onClick={() => navigate("TargetForm")}
                className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md transition"
              >
                ➕ Add
              </button>
            </div>
          ))
        ) : (
          <div className="text-center">❌ No employees found</div>
        )}
      </div>
    </div>
  );
};

export default SelectTarget;
