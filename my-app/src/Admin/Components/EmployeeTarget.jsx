import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";

const EmployeeTarget = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [targets, setTargets] = useState([]);
  const [search, setSearch] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [counter, setCounter] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTargets = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/target/get-allTarget");
        const data = await response.json();

        if (data.success) {
          const formattedTargets = data.targets.map((target) => ({
            ...target,
            date: new Date(target.date).toISOString().split("T")[0],
          }));
          setTargets(formattedTargets);
        }
      } catch (err) {
        console.error("Error fetching targets:", err);
      }
    };
    fetchTargets();
  }, []);

  const filteredTargets = targets.filter(
    (target) =>
      (target.email?.toLowerCase().includes(search.toLowerCase()) ||
        target.targetType?.toLowerCase().includes(search.toLowerCase())) &&
      (dateFilter === "" || target.date === dateFilter) &&
      (counter === "" || target.counterName === counter)
  );

  return (
    <div className="max-w-7xl mx-auto p-6 min-h-screen">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <h2 className="text-4xl font-bold text-red-700">Employee Target 🎯</h2>

        <div className="relative w-full sm:w-auto">
          <button
            className="w-full sm:w-auto px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md shadow"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            Add New Target
          </button>
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg z-10">
              <button
                className="w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                onClick={() => navigate("SelectTarget")}
              >
                Select Target
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by Email or Type"
          className="px-4 py-2 border border-red-300 rounded-md bg-white text-gray-800"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <input
          type="date"
          className="px-4 py-2 border border-red-300 rounded-md bg-white text-gray-800"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
        />
        {/* Counter select removed as per user request */}
      </div>

      <div className="border border-gray-200 rounded-lg p-4 max-h-[600px] overflow-y-auto shadow-md bg-white">
        {filteredTargets.length > 0 ? (
          filteredTargets.map((target, index) => (
            <div
              key={index}
              className="p-4 mb-3 border border-gray-100 rounded-md bg-gray-50 shadow-sm"
            >
              <div className="space-y-1 text-gray-700 mb-4">
                <p><strong>Employee:</strong> {target.email || "N/A"}</p>
                <p><strong>Type:</strong> {target.targetType?.toUpperCase() || "N/A"}</p>
                <p><strong>Counter:</strong> {target.counterName || "N/A"}</p>
                <p><strong>Value:</strong> {target.targetValue || "N/A"}</p>
                <p><strong>Archive:</strong> {target.archive ? `${target.archive}%` : "N/A"}</p>
                <p><strong>Date:</strong> {target.date || "N/A"}</p>
              </div>
              <div className="text-right">
                <button
                  className="w-full sm:w-auto px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-md"
                  onClick={() => navigate(`/employee-target/${target.email}`)}
                >
                  Edit
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center">No targets found.</p>
        )}
      </div>
    </div>
  );
};

export default EmployeeTarget;
