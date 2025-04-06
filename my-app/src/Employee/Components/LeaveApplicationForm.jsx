import React, { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";

const LeaveApplicationForm = () => {
  const navigate = useNavigate();
  const context = useOutletContext();

  // ✅ CL aur PL balance outletContext se fetch kar rahe hain
  const cl = context.users.user.clBalance;
  const pl = context.users.user.plBalance;

  const [formData, setFormData] = useState({
    leaveType: "CL",
    id:"",
    fromDate: "",
    toDate: "",
    days: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("")
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { leaveType, days } = formData;
    const appliedDays = parseInt(days);

    let updatedCl = cl;
    let updatedPl = pl;

    // ✅ Validation: Agar applied leave balance available leave se zyada hai
    if (leaveType === "CL" && appliedDays > cl) {
      setError(`You only have ${cl} Casual Leaves left.`);
      return;
    }
    if (leaveType === "PL" && appliedDays > pl) {
      setError(`You only have ${pl} Privilege Leaves left.`);
      return;
    }

    // ✅ Leave deduct karna
    if (leaveType === "CL") {
      updatedCl -= appliedDays;
    } else if (leaveType === "PL") {
      updatedPl -= appliedDays;
    }

    console.log(updatedCl,updatedPl)
    try {
      const response = await fetch("http://localhost:5000/api/leave/status", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          updatedCl, // ✅ Updated leave balance send kar rahe hain
          updatedPl,
        }),
      });

      const data = await response.json();
      console.log("Response:", data);
      if (!response.ok) {
        // ⛔ Backend error message display
        setError(data.message || "❌ Failed to apply leave. Try again.");
        return;
      }
      if(response.ok){
        navigate("/employee/leavetarget");
      }

      setError(""); // ✅ Clear errors after success
    } catch (error) {
      console.error("Error updating leave:", error);
      alert("Error updating leave!");
    }
  };

  return (
    <div className="max-w-md mx-auto p-5 bg-white shadow-lg rounded-lg text-black capitalize">
      <h2 className="text-xl font-semibold mb-4">Apply for Leave</h2>

      <form onSubmit={handleSubmit}>
        <label className="block mb-2">Type of Leave</label>
        <select name="leaveType" value={formData.leaveType} onChange={handleChange} className="w-full p-2 border rounded">
          <option value="CL">Casual Leave (Available: {cl})</option>
          <option value="PL">Privilege Leave (Available: {pl})</option>
        </select>

        <label className="block mt-4 mb-2">ui id</label>
        <input type="id" name="id" placeholder="Enter Your Ui Id" value={formData.id} onChange={handleChange} className="w-full p-2 border rounded" />


        <label className="block mt-4 mb-2">From Date</label>
        <input type="date" name="fromDate" value={formData.fromDate} onChange={handleChange} className="w-full p-2 border rounded" />

        <label className="block mt-4 mb-2">To Date</label>
        <input type="date" name="toDate" value={formData.toDate} onChange={handleChange} className="w-full p-2 border rounded" />

        <label className="block mt-4 mb-2">Number of Days</label>
        <input type="number" name="days" placeholder="Days" value={formData.days} onChange={handleChange} className="w-full p-2 border rounded" />

        {error && <p className="text-red-600 mt-2">{error}</p>}

        <button type="submit" className="mt-4 bg-blue-600 text-white px-4 py-2 rounded">
          Apply Leave
        </button>
      </form>
    </div>
  );
};

export default LeaveApplicationForm;
