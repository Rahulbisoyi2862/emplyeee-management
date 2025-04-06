import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";

const UserCreate = () => {
  const [bmessage, setBmessage] = useState("");
  const [formData, setFormData] = useState({
    phone: "",
    name: "",
    email: "",
    panCard: "",
    adharCard: "",
    password: "",
    plBalance: "",
    clBalance: "",
    Position: "",
    otherFile: "",
    role: ""
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
    setBmessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:5000/api/user/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(formData),
    });

    const data = await response.json();
    if (response.status === 400) return toast.error(data.message);
    if (response.ok) {
      setFormData({
        phone: "",
        name: "",
        email: "",
        panCard: "",
        adharCard: "",
        password: "",
        plBalance: "",
        clBalance: "",
        Position: "",
        otherFile: "",
        role: ""
      });
      return toast.success(data.message);
    }
  };

  return (
    <div className="p-6 min-h-screen flex justify-center items-start overflow-x-hidden bg-white">
      <div className="w-full max-w-7xl">
        <h2 className="text-4xl font-extrabold text-red-700 mb-8 text-center drop-shadow">
          Create New User
        </h2>

        {bmessage && (
          <p className="text-center mb-4 p-2 text-white bg-red-600 rounded-md">
            {bmessage}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-6 bg-white p-10 rounded-lg shadow-xl border border-gray-200">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone"
              className="p-3 border border-red-300 bg-white text-gray-800 rounded-md w-full"
            />
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Name"
              className="p-3 border border-red-300 bg-white text-gray-800 rounded-md w-full"
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="p-3 border border-red-300 bg-white text-gray-800 rounded-md w-full"
            />
            <input
              type="file"
              name="panCard"
              onChange={handleChange}
              className="p-3 border border-red-300 bg-white text-gray-800 rounded-md w-full"
            />
            <input
              type="file"
              name="adharCard"
              onChange={handleChange}
              className="p-3 border border-red-300 bg-white text-gray-800 rounded-md w-full"
            />
            <input
              type="file"
              name="otherFile"
              onChange={handleChange}
              className="p-3 border border-red-300 bg-white text-gray-800 rounded-md w-full"
            />
            <input
              type="text"
              name="Position"
              value={formData.Position}
              onChange={handleChange}
              placeholder="Position"
              className="p-3 border border-red-300 bg-white text-gray-800 rounded-md w-full"
            />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="p-3 border border-red-300 bg-white text-gray-800 rounded-md w-full"
            />
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="p-3 border border-red-300 bg-white text-gray-800 rounded-md w-full"
            >
              <option value="">Select Role</option>
              <option value="employee">Employee</option>
              <option value="usbadmin">USB Admin</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <h3 className="text-lg font-bold mt-6 text-red-700">Leave Balance</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <input
              type="number"
              name="plBalance"
              value={formData.plBalance}
              onChange={handleChange}
              placeholder="PL Balance"
              className="p-3 border border-red-300 bg-white text-gray-800 rounded-md w-full"
            />
            <input
              type="number"
              name="clBalance"
              value={formData.clBalance}
              onChange={handleChange}
              placeholder="CL Balance"
              className="p-3 border border-red-300 bg-white text-gray-800 rounded-md w-full"
            />
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
      <ToastContainer />
    </div>
  );
};

export default UserCreate;
