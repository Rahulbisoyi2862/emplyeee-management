import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // ⬅️ navigate
import { toast } from "react-toastify"; // ⬅️ toast
import "react-toastify/dist/ReactToastify.css";
import jLogo from "../../assets/janos-venczak-EVR26myHl3A-unsplash.jpg";

const AddProgressPage = () => {
  const apiUrl =  import.meta.env.VITE_DOMIN
  console.log(apiUrl)

  const { id } = useParams();
  const navigate = useNavigate(); // ⬅️ for navigation

  const [formData, setFormData] = useState({
    date: "",
    gold: "",
    diamond: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${apiUrl}/api/target/add-daily-target/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.success) {
        toast.success("✅ Progress saved successfully!");
        setTimeout(() => navigate(-1), 1500); // go back after 1.5s
      } else {
        toast.error(data.message || "❌ Something went wrong");
      }
    } catch (err) {
      console.error(err);
      toast.error("❌ Server error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="bg-white shadow-2xl rounded-2xl overflow-hidden flex flex-col md:flex-row w-full max-w-5xl">
        {/* Left Image */}
        <div className="md:w-1/2 w-full h-64 md:h-auto">
          <img src={jLogo} alt="Jewelry" className="w-full h-full object-cover" />
        </div>

        {/* Form */}
        <div className="md:w-1/2 w-full p-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Add Progress</h2>

          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* Date */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Select Date</label>
              <div className="flex items-center border rounded-lg px-3 py-2 bg-white">
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full bg-transparent outline-none text-gray-800"
                  required
                />
              </div>
            </div>

            {/* Gold */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Gold</label>
              <div className="flex items-center border rounded-lg px-3 py-2 bg-white">
                <input
                  type="number"
                  name="gold"
                  value={formData.gold}
                  onChange={handleChange}
                  placeholder="Enter gold"
                  className="w-full bg-transparent outline-none text-gray-800"
                  required
                />
                <span className="ml-2 text-sm text-gray-500">gm</span>
              </div>
            </div>

            {/* Diamond */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Diamond</label>
              <div className="flex items-center border rounded-lg px-3 py-2 bg-white">
                <input
                  type="number"
                  name="diamond"
                  value={formData.diamond}
                  onChange={handleChange}
                  placeholder="Enter diamond"
                  className="w-full bg-transparent outline-none text-gray-800"
                  required
                />
                <span className="ml-2 text-sm text-gray-500">Carat</span>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="flex items-center justify-center gap-2 w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition-all"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
              </svg>
              Save Progress
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProgressPage;
