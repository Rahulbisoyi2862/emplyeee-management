import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AllEmployees = () => {
  const [allemp, setAllEmp] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();

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

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this employee?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`http://localhost:5000/api/user/delete/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      const result = await res.json();

      if (res.ok) {
        setAllEmp((prev) => prev.filter((emp) => emp.id !== id));
        alert("Employee deleted successfully");
      } else {
        alert(result.message || "Error deleting employee");
      }
    } catch (err) {
      console.error("Delete error:", err.message);
    }
  };

  const filteredEmployees = allemp.filter(
    (employee) =>
      employee?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee?.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee?.id?.toString().includes(searchQuery)
  );

  return (
    <div className="p-4 min-h-screen bg-white text-gray-900">
      <h1 className="text-3xl font-semibold mb-6 text-red-700">All Employees</h1>

      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by name, email, or ID..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="p-3 border border-gray-400 bg-white text-gray-900 rounded-lg w-full max-w-md placeholder:text-gray-600"
        />
      </div>

      {/* Loading */}
      {loading ? (
        <div className="flex justify-center items-center min-h-[50vh]">
          <div className="animate-spin h-8 w-8 border-4 border-green-500 border-t-transparent rounded-full"></div>
        </div>
      ) : (
        <div className="w-full overflow-x-auto">
          {/* Mobile View */}
          <div className="sm:hidden">
            {filteredEmployees.length > 0 ? (
              filteredEmployees.map((employee) => (
                <div
                  key={employee.id}
                  className="border border-red-500 bg-white rounded-xl px-4 py-2 mb-4 shadow-md"
                >
                  <p><strong>ID:</strong> {employee.id}</p>
                  <p><strong>Name:</strong> {employee.name}</p>
                  <p><strong>Email:</strong> {employee.email}</p>
                  <div className="flex gap-2 mt-3">
                    <button
                      onClick={() => navigate(`/AllEmployees/${employee.id}`)}
                      className="bg-red-700 text-white font-semibold px-4 py-2 rounded-lg w-full hover:bg-red-800 transition"
                    >
                      View
                    </button>
                    <button
                      onClick={() => navigate(`/edit-employee/${employee.id}`)}
                      className="bg-green-600 text-white px-4 py-2 rounded-lg w-full hover:bg-green-700 transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(employee.id)}
                      className="bg-gray-800 text-white px-4 py-2 rounded-lg w-full hover:bg-black transition"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center">No employees found</p>
            )}
          </div>

          {/* Desktop Table */}
          <div className="hidden sm:block">
            <table className="w-full border-collapse border border-red-700">
              <thead className="bg-red-700 text-white">
                <tr>
                  <th className="p-3 border border-red-700 text-left">ID</th>
                  <th className="p-3 border border-red-700 text-left">Name</th>
                  <th className="p-3 border border-red-700 text-left">Email</th>
                  <th className="p-3 border border-red-700 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredEmployees.length > 0 ? (
                  filteredEmployees.map((employee) => (
                    <tr
                      key={employee.id}
                      className="hover:bg-gray-100 transition duration-200"
                    >
                      <td className="p-3 border border-red-700">{employee.id}</td>
                      <td className="p-3 border border-red-700">{employee.name}</td>
                      <td className="p-3 border border-red-700">{employee.email}</td>
                      <td className="p-3 border border-red-700">
                        <div className="flex gap-2">
                          <button
                            onClick={() => navigate(`/AllEmployees/${employee.id}`)}
                            className="bg-red-700 text-white font-semibold px-4 py-2 rounded-md transition hover:bg-red-800"
                          >
                            View
                          </button>
                          <button
                            onClick={() => navigate(`/edit-employee/${employee.id}`)}
                            className="bg-green-600 text-white px-4 py-2 rounded-md transition hover:bg-green-700"
                          >
                            Edit
                          </button>
                      
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="p-3 text-center">
                      No employees found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllEmployees;
