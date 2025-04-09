import React, { useState, useEffect } from "react";
import { NavLink, useOutletContext } from "react-router-dom";

const LeaveTarget = () => {
  const { users } = useOutletContext();
  const [leaveData, setLeaveData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");

  const userId = users?.user?.id;

  useEffect(() => {
    const fetchLeaveData = async () => {
      try {
        if (!userId) return;

        const response = await fetch(`http://localhost:5000/api/leave/id/get/${userId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();
        if (!response.ok) throw new Error("Failed to fetch leave data");

        setLeaveData(data?.userT || []);
      } catch (error) {
        console.error("Error fetching leave data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaveData();
  }, [userId]);

  const filteredLeaves =
    filter === "All"
      ? leaveData
      : leaveData.filter((leave) => leave.status.toLowerCase() === filter.toLowerCase());

  return (
    <div className="p-6 bg-white rounded-2xl shadow-2xl max-w-4xl mx-auto mt-10 border border-red-200">
      <h2 className="text-3xl font-bold text-red-700 mb-6 text-center">📝 Leave Dashboard</h2>

      {/* Leave Balance Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
        <div className="bg-red-100 p-5 rounded-xl shadow-md border border-red-200">
          <p className="text-gray-700 font-medium">Privilege Leave</p>
          <p className="text-2xl font-bold text-red-700">{users?.user?.plBalance || 0} Days</p>
        </div>
        <div className="bg-red-100 p-5 rounded-xl shadow-md border border-red-200">
          <p className="text-gray-700 font-medium">Casual Leave</p>
          <p className="text-2xl font-bold text-red-700">{users?.user?.clBalance || 0} Days</p>
        </div>
      </div>

      {/* Apply Leave Button */}
      <div className="flex justify-center mb-6">
        <NavLink
          to="leave-application"
          className="bg-red-700 text-white px-6 py-3 rounded-xl shadow-md hover:shadow-xl active:scale-95 transition-transform"
        >
          Apply for Leave
        </NavLink>
      </div>

      {/* Filter Buttons */}
      <div className="flex justify-center flex-wrap gap-3 mb-6">
        {["All", "Approved", "Pending", "Rejected"].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-5 py-2 rounded-full shadow-md text-sm font-medium transition-all active:scale-95 border
              ${filter === status ? "bg-red-700 text-white border-red-800" : "bg-white text-red-700 border-red-300 hover:bg-red-50"}`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Leave List */}
      <div className="space-y-5 max-h-[calc(100vh-300px)] overflow-y-auto pr-1">
        {loading ? (
          <p className="text-center text-gray-500">Loading leave data...</p>
        ) : filteredLeaves.length > 0 ? (
          filteredLeaves.map((leave, index) => (
            <div
              key={index}
              className="bg-red-50 border border-red-200 rounded-xl p-5 shadow-md hover:shadow-lg transition"
            >
              <p><span className="font-semibold text-gray-700">Type:</span> {leave.leaveType}</p>
              <p><span className="font-semibold text-gray-700">Days:</span> {leave.days}</p>
              <p><span className="font-semibold text-gray-700">From:</span> {leave.fromDate}</p>
              <p><span className="font-semibold text-gray-700">To:</span> {leave.toDate}</p>
              <p>
                <span className="font-semibold text-gray-700">Status:</span>{" "}
                <span className={`font-bold ${
                  leave.status === "Approved"
                    ? "text-green-600"
                    : leave.status === "Rejected"
                    ? "text-red-600"
                    : "text-yellow-600"
                }`}>
                  {leave.status}
                </span>
              </p>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No leave requests found.</p>
        )}
      </div>
    </div>
  );
};

export default LeaveTarget;