import React, { useState, useEffect } from "react";
import { Calendar, IdCard } from 'lucide-react';
const LeaveManagement = () => {
  const [leaves, setLeaves] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const fetchData = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/leave/allData");
      const data = await res.json();

      if (res.ok && data.userT && Array.isArray(data.userT)) {
        setLeaves(data.userT);
      } else {
        setLeaves([]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleActionClick = async (action, id) => {
    const payload = { action, id };
    try {
      const res = await fetch("http://localhost:5000/api/leave/action", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await res.json();
      console.log("Server Response:", result);
      fetchData();
    } catch (error) {
      console.error("Error sending action:", error);
    }
  };

  const filteredLeaves = leaves.filter((leave) => {
    if (
      !leave ||
      !leave.leaveType ||
      !leave.fromDate ||
      !leave.toDate ||
      !leave.id
    ) {
      return false;
    }

    const lowerSearchQuery = searchQuery.toLowerCase();
    const matchesSearch =
      leave.leaveType.toLowerCase().includes(lowerSearchQuery) ||
      leave.fromDate.includes(searchQuery) ||
      leave.toDate.includes(searchQuery) ||
      leave.id.toString().includes(searchQuery);

    const matchesStatus =
      statusFilter === "all" ||
      leave.status.toLowerCase() === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const Button = ({ onClick, className, children }) => (
    <button
      onClick={onClick}
      className={`transition-all duration-300 font-medium text-sm shadow-md ${className}`}
    >
      {children}
    </button>
  );

  return (
    <div className="w-full px-6 py-8 min-h-screen bg-white text-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-red-700 text-center mb-8">
          <Calendar size={40} className="inline-block" />   Leave Management

        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <input
            type="text"
            placeholder="Search by ID, leave type or date..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-4 py-2 rounded-xl bg-white text-black border border-gray-300 placeholder-gray-500 focus:ring-2 focus:ring-red-400"
          />

          <div className="col-span-2 flex gap-2 flex-wrap">
            {["all", "pending", "approved", "rejected"].map((status) => (
              <Button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-4 py-2 rounded-xl text-red-700 ${statusFilter === status
                  ? status === 'approved'
                    ? ' text-black bg-gray-200'
                    : status === 'rejected'
                      ? 'text-black bg-gray-200'
                      : status === 'pending'
                        ? 'text-black bg-gray-200'
                        : 'text-black bg-gray-200'
                  : ''
                  }`}
              >
                {status === "all" ? "All" : status.charAt(0).toUpperCase() + status.slice(1)}
              </Button>
            ))}
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-6 max-h-[600px] overflow-y-auto shadow-xl text-black">
          {filteredLeaves.length > 0 ? (
            filteredLeaves.map((leave, index) => (
              <div
                key={index}
                className="p-5 mb-5 bg-gray-100 rounded-2xl border border-gray-300 shadow-md hover:shadow-lg transition duration-300"
              >
                <div className="space-y-2 text-sm text-gray-700 mb-4">
                  <p><span className="text-gray-500 font-medium"> <IdCard className="inline-block" /> ID:</span> {leave.id}</p>
                  <p><span className="text-gray-500 font-medium">Type:</span> {leave.leaveType} Leave</p>
                  <p><span className="text-gray-500 font-medium">Date:</span> {leave.fromDate} - {leave.toDate} ({leave.days} days)</p>
                  <p><span className="text-gray-500 font-medium">Status:</span> {leave.status}</p>
                </div>

                <div className="flex gap-3">
                  {leave.status === "approved" ? (
                    <Button className="bg-green-600 text-white px-5 py-2 rounded-xl w-full cursor-default">
                      ✅ Approved
                    </Button>
                  ) : leave.status === "rejected" ? (
                    <Button className="bg-red-600 text-white px-5 py-2 rounded-xl w-full cursor-default">
                      ❌ Rejected
                    </Button>
                  ) : (
                    <>
                      <Button
                        onClick={() => handleActionClick("approved", leave._id)}
                        className="bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-xl w-full"
                      >
                        Approve
                      </Button>
                      <Button
                        onClick={() => handleActionClick("rejected", leave._id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-xl w-full"
                      >
                        Reject
                      </Button>
                    </>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-600 text-center">No leave records found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default LeaveManagement;