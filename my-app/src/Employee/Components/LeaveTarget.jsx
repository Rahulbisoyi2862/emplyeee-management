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
    <div className="p-4 sm:p-6 bg-white shadow-md rounded-lg max-w-3xl mx-auto my-4 sm:my-8">
      {/* ✅ Leave Balance Section */}
      <div className="mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">Leave Balance</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div className="bg-blue-50 p-4 rounded shadow-sm">
            <p className="text-gray-600">Privilege Leave</p>
            <p className="text-lg sm:text-xl font-semibold text-blue-700">{users?.user?.plBalance || 0} Days</p>
          </div>
          <div className="bg-green-50 p-4 rounded shadow-sm">
            <p className="text-gray-600">Casual Leave</p>
            <p className="text-lg sm:text-xl font-semibold text-green-700">{users?.user?.clBalance || 0} Days</p>
          </div>
        </div>

        {/* ✅ Apply Leave Button */}
        <NavLink
          to="leave-application"
          className="mb-6 inline-block bg-blue-600 text-white px-4 py-2 sm:px-5 sm:py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Apply for Leave
        </NavLink>

        {/* ✅ Filter Buttons */}
        <div className="flex flex-wrap gap-2 mb-4">
          {["All", "Approved", "Pending", "Rejected"].map((status) => (
            <button
              key={status}
              className={`px-3 py-1 rounded-full border text-sm transition ${
                filter === status
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
              onClick={() => setFilter(status)}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* 🔽 Leave List (Mobile Scroll Fixed) */}
      <div className="max-h-[calc(100vh-250px)] overflow-y-auto pr-1 sm:pr-2 space-y-4">
        {loading ? (
          <p className="text-gray-500">Loading leave data...</p>
        ) : filteredLeaves.length > 0 ? (
          filteredLeaves.map((leave, index) => (
            <div
              key={index}
              className="p-4 sm:p-5 text-black bg-gray-50 border rounded shadow-sm flex flex-col justify-between h-auto sm:h-[180px]"
            >
              <p><span className="font-medium text-gray-700">Type:</span> {leave.leaveType}</p>
              <p><span className="font-medium text-gray-700">Days:</span> {leave.days}</p>
              <p><span className="font-medium text-gray-700">From:</span> {leave.fromDate}</p>
              <p><span className="font-medium text-gray-700">To:</span> {leave.toDate}</p>
              <p>
                <span className="font-medium text-gray-700">Status:</span>{" "}
                <span className={`font-semibold ${
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
          <p className="text-gray-500">No leave requests found.</p>
        )}
      </div>
    </div>
  );
};

export default LeaveTarget;
