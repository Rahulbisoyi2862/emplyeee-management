import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";

const SelectTarget = () => {
  const navigate = useNavigate();
  const [allemp, setAllEmp] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const filteredEmployees = allemp.filter(
    (employee) =>
      employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.Position.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.id.toString().includes(searchQuery)
  );

  return (
    <div className="p-6 bg-white text-gray-800 min-h-screen flex flex-col items-center">
      <h1 className="text-3xl font-bold text-red-700 mb-6 shadow-md p-4 rounded-lg">📋 Select Employee</h1>

      {/* ✅ Search Bar */}
      <input
        type="text"
        placeholder="🔍 Search by name or position..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="p-3 mb-6 border border-gray-300 rounded-lg w-full max-w-md bg-white text-gray-800 shadow-md focus:outline-none focus:ring-2 focus:ring-red-700 transition"
      />

      {/* ✅ Employee Table (Desktop) */}
      <div className="hidden sm:block w-full max-w-4xl">
        <table className="w-full bg-white border border-gray-300 rounded-lg shadow-md">
          <thead>
            <tr className="bg-red-700 text-white">
              <th className="p-3">ID</th>
              <th className="p-3">Name</th>
              <th className="p-3">Position</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.length > 0 ? (
              filteredEmployees.map((employee) => (
                <tr key={employee.id} className="hover:bg-gray-100 transition">
                  <td className="p-3 border-b border-gray-300">{employee.id}</td>
                  <td className="p-3 border-b border-gray-300">{employee.name}</td>
                  <td className="p-3 border-b border-gray-300">{employee.email}</td>
                  <td className="p-3 border-b border-gray-300">
                    <button
                      onClick={() => navigate(`/employee-target/SelectTarget/TargetForm/${employee.id}`)} // Navigate with employee ID
                      className="bg-red-700 hover:bg-red-800 text-white px-4 py-2 rounded-md shadow-md transition"
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
            <div key={employee.id} className="p-4 mb-4 bg-white rounded-lg shadow-md">
              <div className="flex justify-between">
                <span className="text-red-700 font-semibold">ID:</span>
                <span>{employee.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-red-700 font-semibold">Name:</span>
                <span>{employee.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-red-700 font-semibold">Email:</span>
                <span>{employee.email}</span>
              </div>
              <button
                onClick={() => navigate(`/employee-target/SelectTarget/TargetForm/${employee.id}`)} // Navigate with employee ID
                className="mt-4 w-full bg-red-700 hover:bg-red-800 text-white py-2 rounded-md shadow-md transition"
              >
                ➕ Add
              </button>
            </div>
          ))
        ) : (
          <div className="text-center text-red-700">❌ No employees found</div>
        )}
      </div>
    </div>
  );
};

export default SelectTarget;
