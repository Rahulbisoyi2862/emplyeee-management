import React, { useState, useRef } from "react";
import { toast, ToastContainer } from "react-toastify";
import logo from "../../assets/leav.jpg"; // Ensure this path is correct

const MAX_FILE_SIZE = 150 * 1024; // 150KB

const UserCreate = () => {

  const apiUrl =  import.meta.env.VITE_DOMIN
  console.log(apiUrl)
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
      const response = await fetch(`${apiUrl}/api/user/create`, {
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
    <div className="p-6 min-h-screen flex justify-center items-center bg-gray-50">
      <div className="w-full max-w-screen-xl flex gap-10">
        {/* Left Side for Static Image (logo.png) */}
        <div className="w-[35%] hidden sm:flex justify-center items-center bg-gray-100 rounded-lg shadow-lg">
          <img
            src={logo} // Replace with the actual path to your logo
            alt="Logo"
            className="w-full h-full object-cover rounded-sm" // Makes image responsive and fills the height
          />
        </div>

        {/* Right Side for Form */}
        <div className="w-full sm:w-2/3 bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-4xl font-bold text-center text-gray-700 mb-8">
            Create New User
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block mb-1 font-medium text-gray-700">Phone</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Phone"
                  className="p-3 border border-gray-300 rounded-md w-full focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block mb-1 font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Name"
                  className="p-3 border border-gray-300 rounded-md w-full focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block mb-1 font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  className="p-3 border border-gray-300 rounded-md w-full focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block mb-1 font-medium text-gray-700">PAN Card</label>
                <input
                  type="file"
                  name="panCard"
                  ref={panRef}
                  onChange={handleChange}
                  className="p-3 border border-gray-300 rounded-md w-full focus:ring-2 focus:ring-blue-500"
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
                <label className="block mb-1 font-medium text-gray-700">Aadhaar Card</label>
                <input
                  type="file"
                  name="adharCard"
                  ref={adharRef}
                  onChange={handleChange}
                  className="p-3 border border-gray-300 rounded-md w-full focus:ring-2 focus:ring-blue-500"
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
                <label className="block mb-1 font-medium text-gray-700">Other Files</label>
                <input
                  type="file"
                  name="otherFile"
                  ref={otherRef}
                  onChange={handleChange}
                  multiple
                  className="p-3 border border-gray-300 rounded-md w-full focus:ring-2 focus:ring-blue-500"
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
                <label className="block mb-1 font-medium text-gray-700">Position</label>
                <input
                  type="text"
                  name="Position"
                  value={formData.Position}
                  onChange={handleChange}
                  placeholder="Position"
                  className="p-3 border border-gray-300 rounded-md w-full focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block mb-1 font-medium text-gray-700">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password"
                  className="p-3 border border-gray-300 rounded-md w-full focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block mb-1 font-medium text-gray-700">Role</label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="p-3 border border-gray-300 rounded-md w-full focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Role</option>
                  <option value="user">User</option>
                  <option value="subadmin">Sub Admin</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              {formData.role === "subadmin" && (
                <div>
                  <label className="block mb-1 font-medium text-gray-700">Select Page</label>
                  <select
                    name="selectedPage"
                    value={formData.selectedPage}
                    onChange={handleChange}
                    className="p-3 border border-gray-300 rounded-md w-full focus:ring-2 focus:ring-blue-500"
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
      </div>
      <ToastContainer />
    </div>

  );
};

export default UserCreate;
