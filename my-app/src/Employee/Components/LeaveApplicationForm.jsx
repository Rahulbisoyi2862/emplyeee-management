import React, { useState, useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import leaveImage from '../../assets/leav.jpg'; // Replace with your image path

const LeaveApplicationForm = () => {
  const navigate = useNavigate();
  const context = useOutletContext();

  const user = context.users.user;
  const cl = user.clBalance;
  const pl = user.plBalance;

  const [formData, setFormData] = useState({
    leaveType: "CL",
    id: user.id || "",
    fromDate: "",
    toDate: "",
    days: "",
  });

  useEffect(() => {
    setFormData((prev) => ({ ...prev, id: user.id || "" }));
  }, [user.id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { leaveType, days } = formData;
    const appliedDays = parseInt(days);

    let updatedCl = cl;
    let updatedPl = pl;

    if (leaveType === "CL" && appliedDays > cl) {
      toast.error(`❌ You only have ${cl} Casual Leaves left.`);
      return;
    }
    if (leaveType === "PL" && appliedDays > pl) {
      toast.error(`❌ You only have ${pl} Privilege Leaves left.`);
      return;
    }

    if (leaveType === "CL") updatedCl -= appliedDays;
    else updatedPl -= appliedDays;

    try {
      const response = await fetch("http://localhost:5000/api/leave/status", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          updatedCl,
          updatedPl,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message || "❌ Failed to apply leave.");
        return;
      }

      toast.success("✅ Leave Applied Successfully!");

      setTimeout(() => {
        navigate("/employee/leavetarget");
      }, 1500);
    } catch (error) {
      console.error("Error:", error);
      toast.error("🚨 Something went wrong!");
    }
  };

  return (
    <div className="max-w-screen-lg mx-auto mt-20 flex flex-col lg:flex-row items-center justify-center p-4">
      <div className="flex w-full bg-white shadow-xl rounded-2xl p-8">
        {/* Left Side: Image */}
        <div className="mb-6 lg:mb-0 lg:mr-6 lg:flex-1">
          {/* Show image only on large screens */}
          <img
            src={leaveImage} // Add your image path here
            alt="Leave Application"
            className="w-full h-auto rounded-lg shadow-lg object-cover hidden lg:block"
          />
        </div>

        {/* Right Side: Form */}
        <div className="flex-1">
          <h2 className="text-2xl font-bold mb-6 text-center text-red-700">
            📝 Apply for Leave
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-1 font-semibold">Type of Leave</label>
              <select
                name="leaveType"
                value={formData.leaveType}
                onChange={handleChange}
                className="w-full p-3 border border-red-300 rounded focus:outline-none focus:ring-2 focus:ring-red-400"
              >
                <option value="CL">Casual Leave (Available: {cl})</option>
                <option value="PL">Privilege Leave (Available: {pl})</option>
              </select>
            </div>

            <div>
              <label className="block mb-1 font-semibold">UI ID</label>
              <input
                type="text"
                name="id"
                value={formData.id}
                readOnly
                className="w-full p-3 bg-gray-100 border border-red-300 rounded cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block mb-1 font-semibold">From Date</label>
              <input
                type="date"
                name="fromDate"
                value={formData.fromDate}
                onChange={handleChange}
                className="w-full p-3 border border-red-300 rounded focus:outline-none focus:ring-2 focus:ring-red-400"
              />
            </div>

            <div>
              <label className="block mb-1 font-semibold">To Date</label>
              <input
                type="date"
                name="toDate"
                value={formData.toDate}
                onChange={handleChange}
                className="w-full p-3 border border-red-300 rounded focus:outline-none focus:ring-2 focus:ring-red-400"
              />
            </div>

            <div>
              <label className="block mb-1 font-semibold">Number of Days</label>
              <input
                type="number"
                name="days"
                value={formData.days}
                onChange={handleChange}
                placeholder="e.g., 3"
                className="w-full p-3 border border-red-300 rounded focus:outline-none focus:ring-2 focus:ring-red-400"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded transition duration-200"
            >
              Submit Leave Application
            </button>
          </form>

          {/* Toast notifications container */}
          <ToastContainer
            position="top-right"
            autoClose={2500}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </div>
      </div>
    </div>
  );
};

export default LeaveApplicationForm;
