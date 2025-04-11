import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Calendar, FileText } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";

const TargetForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    targetType: "monthly",
    targetGold: "",
    targetDiamond: "",
    month: "",
    year: "",
    counter: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { targetType, targetGold, targetDiamond, month, year, counter } = formData;

    if (!targetType || !targetGold || !targetDiamond || !month || !year || !counter) {
      toast.error("⚠️ Please fill in all fields.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/target/employee/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          targetType,
          targetGold: parseFloat(targetGold),
          targetDiamond: parseFloat(targetDiamond),
          counter,
          month,
          year,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.error || "❌ Something went wrong.");
        return;
      }

      toast.success("✅ Target created successfully!");
      navigate("/employee-target");

    } catch (error) {
      console.error("❌ Error:", error);
      toast.error("❌ Server error. Please try again.");
    }
  };

  return (
    <div className="p-6 min-h-screen flex flex-col items-center bg-white text-gray-800">
      <style>{`
        input[type=number]::-webkit-inner-spin-button,
        input[type=number]::-webkit-outer-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
        input[type=number] {
          -moz-appearance: textfield;
        }
      `}</style>

      <h1 className="text-3xl font-bold text-red-700 mb-6 shadow-md p-4 rounded-lg">🎯 Create Target</h1>

      <form onSubmit={handleSubmit} className="bg-gray-100 p-8 rounded-3xl shadow-md w-full max-w-2xl space-y-5">

        <div className="relative">
          <select
            name="targetType"
            value={formData.targetType}
            onChange={handleChange}
            className="p-3 pl-10 border border-gray-300 rounded-lg w-full"
            required
          >
            <option value="monthly">Monthly</option>
          </select>
          <div className="absolute left-3 top-3 text-gray-500">
            <Calendar size={20} />
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="number"
            name="targetGold"
            value={formData.targetGold}
            onChange={handleChange}
            placeholder="Enter Gold Target"
            className="p-3 border border-gray-300 rounded-lg w-full"
            required
          />
          <span className="text-gray-600 font-semibold">gm</span>
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="number"
            name="targetDiamond"
            value={formData.targetDiamond}
            onChange={handleChange}
            placeholder="Enter Diamond Target"
            className="p-3 border border-gray-300 rounded-lg w-full"
            required
          />
          <span className="text-gray-600 font-semibold">carat</span>
        </div>

        <div className="relative">
          <select
            name="counter"
            value={formData.counter}
            onChange={handleChange}
            className="p-3 pl-10 border border-gray-300 rounded-lg w-full"
            required
          >
            <option value="">Select Counter</option>
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

        <div className="flex gap-4">
          <select
            name="month"
            value={formData.month}
            onChange={handleChange}
            className="p-3 border border-gray-300 rounded-lg w-full"
            required
          >
            <option value="">Month</option>
            {[
              { value: "01", label: "January" },
              { value: "02", label: "February" },
              { value: "03", label: "March" },
              { value: "04", label: "April" },
              { value: "05", label: "May" },
              { value: "06", label: "June" },
              { value: "07", label: "July" },
              { value: "08", label: "August" },
              { value: "09", label: "September" },
              { value: "10", label: "October" },
              { value: "11", label: "November" },
              { value: "12", label: "December" },
            ].map((month) => (
              <option key={month.value} value={month.value}>
                {month.label}
              </option>
            ))}
          </select>

          <select
            name="year"
            value={formData.year}
            onChange={handleChange}
            className="p-3 border border-gray-300 rounded-lg w-full"
            required
          >
            <option value="">Year</option>
            {Array.from({ length: 11 }, (_, i) => 2025 + i).map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="mt-6 p-3 bg-red-700 hover:bg-red-800 text-white rounded-lg w-full"
        >
          ✅ Create Target
        </button>
      </form>

      <ToastContainer />
    </div>
  );
};

export default TargetForm;
