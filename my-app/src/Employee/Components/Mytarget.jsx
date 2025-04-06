import React from "react";
import { useOutletContext } from "react-router-dom";

const MyTarget = () => {
  const context = useOutletContext();

  if (!context || !context.users || !context.users.user || !context.target) {
    return <p className="text-center text-gray-400">Loading user data...</p>;
  }

  const { user } = context.users;
  const target = context.target;

  return (
    <div className="max-w-lg mx-auto bg-gray-900 text-white shadow-xl rounded-xl p-6 border border-gray-700">
      <h2 className="text-2xl font-bold text-white mb-4 border-b border-gray-600 pb-2 text-center">
        🎯 My Goals
      </h2>

      {/* Target Data */}
      <ul className="space-y-3">
        <li className="p-3 bg-blue-500 rounded-lg shadow-md">
          <span className="font-semibold">📌 Target Type:</span> {target.targetType || "N/A"}
        </li>
        <li className="p-3 bg-green-500 rounded-lg shadow-md">
          <span className="font-semibold">🎯 Target Value:</span> {target.targetValue || "N/A"}%
        </li>
        <li className="p-3 bg-red-500 rounded-lg shadow-md">
          <span className="font-semibold">📅 Target Date:</span> {target.date || "N/A"}
        </li>
        <li className="p-3 bg-yellow-500 rounded-lg shadow-md">
          <span className="font-semibold">📦 Archive:</span> {target.archive || "N/A"}%
        </li>
      </ul>

      {/* Extra Info */}
      <div className="mt-6 border-t border-gray-600 pt-4 text-sm">
        <p><span className="font-semibold">📧 Email:</span> {user.email || "N/A"}</p>
        <p><span className="font-semibold">📞 Phone:</span> {user.phone || "N/A"}</p>
      </div>
    </div>
  );
};

export default MyTarget;
