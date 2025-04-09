import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Calendar, Target, FileText } from "lucide-react";  // Icons imported from lucide-react
import { ToastContainer, toast } from "react-toastify"; // Import Toastify components
import { useParams } from 'react-router-dom';
const TargetForm = () => {

  const { id } = useParams();


  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    targetType: "",
    targetValue: "",
    date: "",
    counter: "",  // New itemType field for Bangle, Chain, Necklace, PR, Diamond
  });

  const [error, setError] = useState(""); // Error state for backend messages

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation for required fields
    if (!formData.targetType || !formData.targetValue || !formData.date || !formData.counter) {
      toast.error("⚠️ Please fill in all fields."); // Show error toast
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/target/employee/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json(); // Parse the JSON response
      console.log(data);

      if (!response.ok) {
        toast.error(data.message || "❌ Something went wrong."); // Show error toast
        return;
      }

      // On success, navigate to the employee-target page and show success toast
      toast.success("✅ Target created successfully!");
      navigate("/employee-target");

    } catch (err) {
      console.error("❌ Error Adding Target:", err);
      toast.error("❌ Failed to add target. Try again."); // Show error toast
    }
  };

  return (
    <div className="p-6 min-h-screen flex flex-col items-center bg-white text-gray-800">
      <h1 className="text-3xl font-bold text-red-700 mb-6 shadow-md p-4 rounded-lg">🎯 Create Target</h1>

      <form onSubmit={handleSubmit} className="bg-gray-100 p-8 rounded-3xl shadow-md w-full max-w-2xl space-y-5">

        {/* Target Type Dropdown */}
        <div className="relative">
          <select
            name="targetType"
            value={formData.targetType}
            onChange={handleChange}
            className="p-3 pl-10 border border-gray-300 rounded-lg w-full bg-white text-gray-800 focus:ring-2 focus:ring-red-700"
            required
          >
            <option value=""> Selecte</option>
            <option value="monthly"> Monthly</option>
          </select>
          <div className="absolute left-3 top-3 text-gray-500">
            <Calendar size={20} />
          </div>
        </div>

        {/* Target Value Input */}
        <div className="relative">
          <input
            type="number"
            name="targetValue"
            value={formData.targetValue}
            onChange={handleChange}
            placeholder=" Enter Target Value"
            className="p-3 pl-10 border border-gray-300 rounded-lg w-full bg-white text-gray-800 focus:ring-2 focus:ring-red-700"
            required
          />
          <div className="absolute left-3 top-3 text-gray-500">
            <Target size={20} />
          </div>
        </div>

        {/* Counter Dropdown (Bangle, Chain, Necklace, PR, Diamond) */}
        <div className="relative">
          <select
            name="counter"
            value={formData.counter}
            onChange={handleChange}
            className="p-3 pl-10 border border-gray-300 rounded-lg w-full bg-white text-gray-800 focus:ring-2 focus:ring-red-700"
            required
          >
            <option value=""> Select Counter</option>
            <option value="Bangle">Bangle</option>
            <option value="Chain">Chain</option>
            <option value="Necklace">Necklace</option>
            <option value="PR">PR</option>
            <option value="Diamond">Diamond</option>
          </select>
          <div className="absolute left-3 top-3 text-gray-500">
            <FileText size={20} />
          </div>
        </div>

        {/* Date Input */}
        <div className="relative">
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="p-3 pl-10 border border-gray-300 rounded-lg w-full bg-white text-gray-800 focus:ring-2 focus:ring-red-700"
            required
          />
          <div className="absolute left-3 top-3 text-gray-500">
            <Calendar size={20} />
          </div>
        </div>

        {/* Display error messages */}
        {error && <p className="text-red-400 text-sm text-center">{error}</p>}

        {/* Submit Button */}
        <button
          type="submit"
          className="mt-6 p-3 bg-red-700 hover:bg-red-800 text-white rounded-lg w-full transition"
        >
          ✅ Create Target
        </button>
      </form>

      {/* ToastContainer to display the notifications */}
      <ToastContainer />
    </div>
  );
};

export default TargetForm;
