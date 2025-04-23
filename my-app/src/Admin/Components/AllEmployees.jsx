import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AllEmployees = () => {
  const apiUrl = import.meta.env.VITE_DOMIN;

  const [allemp, setAllEmp] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    async function getUsers() {
      try {
        const response = await fetch(`${apiUrl}/api/user/data`, {
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

  const handleDelete = (id) => {
    setDeleteId(id);
    setIsModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      const res = await fetch(`${apiUrl}/api/user/delete/${deleteId}`, {
        method: "DELETE",
        credentials: "include",
      });

      const result = await res.json();

      if (res.ok) {
        setAllEmp((prev) => prev.filter((emp) => emp.id !== deleteId));
        toast.success("Employee deleted successfully");
      } else {
        toast.error(result.message || "Error deleting employee");
      }
    } catch (err) {
      console.error("Delete error:", err.message);
      toast.error("Something went wrong");
    } finally {
      setIsModalOpen(false);
      setDeleteId(null);
    }
  };

  const filteredEmployees = allemp.filter(
    (employee) =>
      employee?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee?.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee?.id?.toString().includes(searchQuery)
  );

  return (
    <div className="p-4 min-h-screen bg-white text-gray-900 relative">
      <ToastContainer />

      <h1 className="text-3xl font-semibold mb-6 text-red-700">All Employees</h1>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by name, email, or ID..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="p-3 border border-gray-400 bg-white text-gray-900 rounded-lg w-full max-w-md placeholder:text-gray-600"
        />
      </div>

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

          {/* Desktop View */}
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
                    <tr key={employee.id} className="hover:bg-gray-100 transition duration-200">
                      <td className="p-3 border border-red-700">{employee.id}</td>
                      <td className="p-3 border border-red-700">{employee.name}</td>
                      <td className="p-3 border border-red-700">{employee.email}</td>
                      <td className="p-3 border border-red-700">
                        <div className="flex gap-2">
                          <button
                            onClick={() => navigate(`/admin/AllEmployees/${employee.id}`)}
                            className="bg-red-700 text-white font-semibold px-4 py-2 rounded-md transition hover:bg-red-800"
                          >
                            View
                          </button>
                          <button
                            onClick={() => navigate(`/admin/edit-employee/${employee.id}`)}
                            className="bg-green-600 text-white px-4 py-2 rounded-md transition hover:bg-green-700"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(employee.id)}
                            className="bg-gray-800 text-white px-4 py-2 rounded-md transition hover:bg-black"
                          >
                            Delete
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

      {/* 🔴 Delete Confirmation Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-sm">
            <h2 className="text-xl font-bold mb-4 text-red-700">Confirm Delete</h2>
            <p className="mb-6">Are you sure you want to delete this employee?</p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="px-4 py-2 bg-red-700 text-white rounded hover:bg-red-800"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllEmployees;
