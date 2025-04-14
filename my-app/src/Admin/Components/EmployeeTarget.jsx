import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";

const EmployeeTarget = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [targets, setTargets] = useState([]);
  const [search, setSearch] = useState("");
  const [dateFilter, setDateFilter] = useState({ year: "", month: "" });
  const [counter, setCounter] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [targetToDelete, setTargetToDelete] = useState(null);
  const navigate = useNavigate();

  const apiUrl =  import.meta.env.VITE_DOMIN
  console.log(apiUrl)

  const fetchTargets = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/target/get-allTarget`);
      const data = await response.json();
      if (data.success) {
        const sortedTargets = data.targets.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setTargets(sortedTargets);
      }
    } catch (err) {
      console.error("Error fetching targets:", err);
    }
  };

  useEffect(() => {
    fetchTargets();
  }, []);

  const confirmDelete = (id) => {
    setTargetToDelete(id);
    setModalOpen(true);
  };

  const handleDelete = async () => {
    try {
      const res = await fetch(`${apiUrl}/api/editRow/delete/${targetToDelete}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        setTargets((prev) => prev.filter((t) => t._id !== targetToDelete));
        setModalOpen(false);
        setTargetToDelete(null);
      } else {
        console.error("Delete failed:", data.message);
      }
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  const filteredTargets = targets.filter((target) => {
    const targetYear = target.year?.toString();
    const targetMonth = target.month?.toString().padStart(2, "0");
    const searchLower = search.toLowerCase();

    return (
      (
        target.name?.toLowerCase().includes(searchLower) ||
        target.id?.toLowerCase().includes(searchLower) ||
        target.counter?.toLowerCase().includes(searchLower) ||
        target.targetType?.toLowerCase().includes(searchLower)
      ) &&
      (dateFilter.year === "" || dateFilter.year === targetYear) &&
      (dateFilter.month === "" || dateFilter.month === targetMonth) &&
      (counter === "" || target.counter === counter)
    );
  });

  return (
    <div className="max-w-7xl mx-auto p-6 min-h-screen">
      {/* Header & Filters */}
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

      {/* Filters */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by Id, Counter or Type"
          className="px-4 py-2 border border-red-300 rounded-md bg-white text-gray-800"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="px-4 py-2 border border-red-300 rounded-md bg-white text-gray-800"
          value={dateFilter.year}
          onChange={(e) => setDateFilter({ ...dateFilter, year: e.target.value })}
        >
          <option value="">All Years</option>
          {Array.from({ length: 11 }, (_, i) => 2025 + i).map((year) => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>

        <select
          className="px-4 py-2 border border-red-300 rounded-md bg-white text-gray-800"
          value={dateFilter.month}
          onChange={(e) => setDateFilter({ ...dateFilter, month: e.target.value })}
        >
          <option value="">All Months</option>
          {[...Array(12).keys()].map((m) => {
            const val = (m + 1).toString().padStart(2, "0");
            return <option key={val} value={val}>{val}</option>;
          })}
        </select>
      </div>

      {/* Target List */}
      <div className="border border-gray-200 rounded-lg p-4 max-h-[600px] overflow-y-auto shadow-md bg-white">
        {filteredTargets.length > 0 ? (
          filteredTargets.map((target, index) => {
            const goldSum = target.archives?.reduce((sum, item) => sum + (item.archiveGold || 0), 0) || 0;
            const diamondSum = target.archives?.reduce((sum, item) => sum + (item.archiveDiamond || 0), 0) || 0;

            return (
              <div
                key={index}
                className="p-4 mb-3 border border-gray-100 rounded-md bg-gray-50 shadow-sm"
              >
                <div className="space-y-1 text-gray-700 mb-4">
                  <p><strong>Name:</strong> {target.name || "N/A"}</p>
                  <p><strong>Id:</strong> {target.id || "N/A"}</p>
                  <p><strong>Type:</strong> {target.targetType || "N/A"}</p>
                  <p><strong>Counter:</strong> {target.counter || "N/A"}</p>
                  <p><strong>Gold Target:</strong> {target.targetGold || 0} gm</p>
                  <p><strong>Diamond Target:</strong> {target.targetDiamond || 0} carat</p>
                  <p><strong>Achieve Gold:</strong> {goldSum} gm</p>
                  <p><strong>Achieve Diamond:</strong> {diamondSum} carat</p>
                  <p><strong>Month:</strong> {target.month || "N/A"}</p>
                  <p><strong>Year:</strong> {target.year || "N/A"}</p>
                </div>

                <div className="flex justify-end gap-2">
                  <button
                    className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-md"
                    onClick={() => navigate(`/employee-target/${target._id}`)}
                  >
                    Edit
                  </button>
                  <button
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-md"
                    onClick={() => confirmDelete(target._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-gray-500 text-center">No targets found.</p>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-md">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Are you sure?</h2>
            <p className="mb-6 text-gray-600">Do you really want to delete this target? This process cannot be undone.</p>
            <div className="flex justify-end gap-4">
              <button
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
                onClick={() => setModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                onClick={handleDelete}
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeTarget;
