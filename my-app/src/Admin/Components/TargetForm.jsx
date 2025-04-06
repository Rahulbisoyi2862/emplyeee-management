import React, { useState } from "react";
import { useNavigate } from "react-router";

const TargetForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    targetType: "",
    targetValue: "",
    archive: "",
    date: "",
    email: "",
  });

  const [error, setError] = useState(""); // 🔴 For showing error from backend

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError("")
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.targetType || !formData.targetValue || !formData.archive || !formData.date || !formData.email) {
      setError("⚠️ Please fill in all fields.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/target/employee", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json(); // Always parse JSON response
      console.log(data);

      if (!response.ok) {
        // 🔴 Show backend error message
        setError(data.message || "❌ Something went wrong.");
        return;
      }

      // ✅ Success
      navigate("/employee-target");

    } catch (err) {
      console.error("❌ Error Adding Target:", err);
      setError("❌ Failed to add target. Try again.");
    }
  };

  return (
    <div className="p-6 min-h-screen flex flex-col items-center bg-gray-900 text-white">
      <h1 className="text-2xl font-bold text-blue-400 mb-4">🎯 Create Target</h1>

      <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-md space-y-3">
        <select
          name="targetType"
          value={formData.targetType}
          onChange={handleChange}
          className="p-3 border border-gray-600 rounded-md w-full bg-gray-700 text-white focus:ring-2 focus:ring-blue-500"
          required
        >
          <option value="">📌 Select Target Type</option>
          <option value="daily">📆 Daily</option>
          <option value="monthly">📅 Monthly</option>
        </select>

        <input
          type="number"
          name="targetValue"
          value={formData.targetValue}
          onChange={handleChange}
          placeholder="🎯 Enter Target Value"
          className="p-3 border border-gray-600 rounded-md w-full bg-gray-700 text-white focus:ring-2 focus:ring-blue-500"
          required
        />

        <input
          type="text"
          name="archive"
          value={formData.archive}
          onChange={handleChange}
          placeholder="📂 Enter Archive Value"
          className="p-3 border border-gray-600 rounded-md w-full bg-gray-700 text-white focus:ring-2 focus:ring-blue-500"
          required
        />

        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="📧 Enter Your Email"
          className="p-3 border border-gray-600 rounded-md w-full bg-gray-700 text-white focus:ring-2 focus:ring-blue-500"
          required
        />

        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="p-3 border border-gray-600 rounded-md w-full bg-gray-700 text-white focus:ring-2 focus:ring-blue-500"
          required
        />

        {/* 🔴 Show error from backend or frontend */}
        {error && <p className="text-red-400 text-sm">{error}</p>}

        <button
          type="submit"
          className="mt-4 p-3 bg-blue-500 hover:bg-blue-600 text-white rounded-md w-full transition"
        >
          ✅ Create Target
        </button>
      </form>
    </div>
  );
};

export default TargetForm;
