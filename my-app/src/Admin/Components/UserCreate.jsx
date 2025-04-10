import React, { useState, useRef } from "react";
import { toast, ToastContainer } from "react-toastify";

const MAX_FILE_SIZE = 150 * 1024; // 150KB

const UserCreate = () => {
  const panRef = useRef();
  const adharRef = useRef();
  const otherRef = useRef();

  const [formData, setFormData] = useState({
    phone: "",
    name: "",
    email: "",
    panCard: null,
    adharCard: null,
    password: "",
    plBalance: "",
    clBalance: "",
    Position: "",
    otherFile: [],
    role: "",
    selectedPage: "",
  });

  const [preview, setPreview] = useState({
    panCard: null,
    adharCard: null,
    otherFile: [],
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files) {
      if (name === "otherFile") {
        const validFiles = [];
        const previews = [];

        for (let file of files) {
          if (file.size > MAX_FILE_SIZE) {
            toast.error(`${file.name} is too large (max 150KB)`);
          } else {
            validFiles.push(file);
            previews.push(URL.createObjectURL(file));
          }
        }

        setFormData((prev) => ({ ...prev, [name]: validFiles }));
        setPreview((prev) => ({ ...prev, otherFile: previews }));
      } else {
        const file = files[0];
        if (file && file.size > MAX_FILE_SIZE) {
          toast.error(`${file.name} is too large (max 150KB)`);
          return;
        }
        setFormData((prev) => ({ ...prev, [name]: file }));
        setPreview((prev) => ({ ...prev, [name]: URL.createObjectURL(file) }));
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      if (key === "otherFile" && value?.length > 0) {
        for (let file of value) {
          form.append("otherFile", file);
        }
      } else {
        form.append(key, value);
      }
    });

    try {
      const response = await fetch("http://localhost:5000/api/user/create", {
        method: "POST",
        credentials: "include",
        body: form,
      });

      const data = await response.json();
      if (response.status === 400) return toast.error(data.message);

      if (response.ok) {
        setFormData({
          phone: "",
          name: "",
          email: "",
          panCard: null,
          adharCard: null,
          password: "",
          plBalance: "",
          clBalance: "",
          Position: "",
          otherFile: [],
          role: "",
          selectedPage: "",
        });

        setPreview({
          panCard: null,
          adharCard: null,
          otherFile: [],
        });

        panRef.current.value = "";
        adharRef.current.value = "";
        otherRef.current.value = "";

        return toast.success(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong.");
    }
  };

  return (
    <div className="p-6 min-h-screen flex justify-center items-start overflow-x-hidden bg-white">
      <div className="w-full max-w-7xl">
        <h2 className="text-4xl font-extrabold text-red-700 mb-8 text-center drop-shadow">
          Create New User
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-6 bg-white p-10 rounded-lg shadow-xl border border-gray-200"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <div>
              <label className="block mb-1 font-medium text-red-700">Phone</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone"
                className="p-3 border border-red-300 bg-white text-gray-800 rounded-md w-full"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium text-red-700">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name"
                className="p-3 border border-red-300 bg-white text-gray-800 rounded-md w-full"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium text-red-700">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="p-3 border border-red-300 bg-white text-gray-800 rounded-md w-full"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium text-red-700">PAN Card</label>
              <input
                type="file"
                name="panCard"
                ref={panRef}
                onChange={handleChange}
                className="p-3 border border-red-300 bg-white text-gray-800 rounded-md w-full"
              />
              {preview.panCard && (
                <img
                  src={preview.panCard}
                  alt="PAN Preview"
                  className="mt-2 w-32 h-20 object-cover border"
                />
              )}
            </div>

            <div>
              <label className="block mb-1 font-medium text-red-700">Aadhaar Card</label>
              <input
                type="file"
                name="adharCard"
                ref={adharRef}
                onChange={handleChange}
                className="p-3 border border-red-300 bg-white text-gray-800 rounded-md w-full"
              />
              {preview.adharCard && (
                <img
                  src={preview.adharCard}
                  alt="Aadhaar Preview"
                  className="mt-2 w-32 h-20 object-cover border"
                />
              )}
            </div>

            <div>
              <label className="block mb-1 font-medium text-red-700">Other Files</label>
              <input
                type="file"
                name="otherFile"
                ref={otherRef}
                onChange={handleChange}
                multiple
                className="p-3 border border-red-300 bg-white text-gray-800 rounded-md w-full"
              />
              <div className="flex flex-wrap gap-2 mt-2">
                {preview.otherFile.map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt={`Other ${i}`}
                    className="w-20 h-16 object-cover border"
                  />
                ))}
              </div>
            </div>

            <div>
              <label className="block mb-1 font-medium text-red-700">Position</label>
              <input
                type="text"
                name="Position"
                value={formData.Position}
                onChange={handleChange}
                placeholder="Position"
                className="p-3 border border-red-300 bg-white text-gray-800 rounded-md w-full"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium text-red-700">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                className="p-3 border border-red-300 bg-white text-gray-800 rounded-md w-full"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium text-red-700">Role</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="p-3 border border-red-300 bg-white text-gray-800 rounded-md w-full"
              >
                <option value="">Select Role</option>
                <option value="user">user</option>
                <option value="subadmin">SUB Admin</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            {formData.role === "subadmin" && (
              <div>
                <label className="block mb-1 font-medium text-red-700">Select Page</label>
                <select
                  name="selectedPage"
                  value={formData.selectedPage}
                  onChange={handleChange}
                  className="p-3 border border-red-300 bg-white text-gray-800 rounded-md w-full"
                >
                  <option value="">Select Page</option>
                  <option value="dashboard">Dashboard</option>
                  <option value="allEmployees">All Employees</option>
                  <option value="leaveManagement">Leave Management</option>
                  <option value="employeeTarget">Employee Target</option>
                </select>
              </div>
            )}
          </div>

          {formData.role === "user" && (
            <>
              <h3 className="text-lg font-bold mt-6 text-red-700">Leave Balance</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block mb-1 font-medium text-red-700">PL Balance</label>
                  <input
                    type="number"
                    name="plBalance"
                    value={formData.plBalance}
                    onChange={handleChange}
                    placeholder="PL Balance"
                    className="p-3 border border-red-300 bg-white text-gray-800 rounded-md w-full"
                  />
                </div>

                <div>
                  <label className="block mb-1 font-medium text-red-700">CL Balance</label>
                  <input
                    type="number"
                    name="clBalance"
                    value={formData.clBalance}
                    onChange={handleChange}
                    placeholder="CL Balance"
                    className="p-3 border border-red-300 bg-white text-gray-800 rounded-md w-full"
                  />
                </div>
              </div>
            </>
          )}

          <div className="flex justify-center">
            <button
              type="submit"
              className="mt-6 p-3 bg-green-600 text-white font-bold rounded-md w-full sm:w-auto px-10 hover:bg-green-700 transition"
            >
              Create User
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default UserCreate;
