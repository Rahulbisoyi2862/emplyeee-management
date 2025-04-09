import React from "react";
import { useOutletContext } from "react-router-dom";

const MyTarget = () => {
  const context = useOutletContext();

  if (!context || !context.users || !context.users.user || !context.target) {
    return <p className="text-center text-red-700 text-lg animate-pulse">Loading user data...</p>;
  }

  const { user } = context.users;
  const target = context.target;

  return (
    <div className="max-w-2xl mx-auto mt-24 bg-white text-gray-800 shadow-2xl rounded-2xl p-8 border border-red-700">
      <h2 className="text-3xl font-bold text-red-700 mb-6 text-center shadow-md p-2 rounded-md">
        🎯 My Goals
      </h2>

      {/* Target Data */}
      <ul className="space-y-4">
        <li className="p-4 rounded-xl border border-red-700 bg-white shadow-lg">
          <span className="font-semibold text-red-700">📌 Target Type:</span>{" "}
          <span>{target.targetType || "N/A"}</span>
        </li>
        <li className="p-4 rounded-xl border border-red-700 bg-white shadow-lg">
          <span className="font-semibold text-red-700">🎯 Target Value:</span>{" "}
          <span>{target.targetValue || "N/A"} Gm</span>
        </li>
        <li className="p-4 rounded-xl border border-red-700 bg-white shadow-lg">
          <span className="font-semibold text-red-700">📅 Target Date:</span>{" "}
          <span>{target.date || "N/A"}</span>
        </li>
        <li className="p-4 rounded-xl border border-red-700 bg-white shadow-lg">
          <span className="font-semibold text-red-700">📦 Counter:</span>{" "}
          <span>{target.targetCounter || "N/A"}</span>
        </li>
        <li className="p-4 rounded-xl border border-red-700 bg-white shadow-lg">
          <span className="font-semibold text-red-700">📦 Archive:</span>{" "}
          <span>{target.archive || "N/A"} Gm</span>
        </li>
      </ul>

      {/* Extra Info */}
      <div className="mt-8 border-t border-red-700 pt-4 text-base space-y-1">
        <p>
          <span className="font-semibold text-red-700">📧 Email:</span>{" "}
          <span>{user.email || "N/A"}</span>
        </p>
        <p>
          <span className="font-semibold text-red-700">📞 Phone:</span>{" "}
          <span>{user.phone || "N/A"}</span>
        </p>
      </div>
    </div>
  );
};

export default MyTarget;
