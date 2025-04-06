import React, { useState } from "react";
import { useNavigate, useParams } from "react-router";

const EditArchive = () => {
  const [archive, setArchive] = useState("");
  const [type, setType] = useState("days"); // Default: "days"
  const [error, setError] = useState("");  // ❌ Error state
  const [success, setSuccess] = useState(""); // ✅ Success state
  const { id } = useParams();
  const navigate = useNavigate();

  // 📤 Update Archive Value
  const updateArchive = async () => {
    setError(""); // Reset errors
    setSuccess("");

    if (!id) {
      setError("❌ ID is undefined!");
      return;
    }

    if (!archive) {
      setError("❌ Please enter an archive value.");
      return;
    }

    try {
      const res = await fetch(`http://localhost:5000/api/target/update-archive/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ archive, type }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(`❌ Error: ${data.message}`);
        return;
      }

      setSuccess("✅ Archive updated successfully!");
      setTimeout(() => navigate("/employee-target"), 2000); // 2 sec delay then redirect
    } catch (err) {
      setError("❌ Server error, please try again.");
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-gray-900 text-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Update Archive</h2>

      {error && <p className="text-red-500">{error}</p>}   {/* ❌ Show Error */}
      {success && <p className="text-green-500">{success}</p>} {/* ✅ Show Success */}

      <input
        type="number"
        value={archive}
        onChange={(e) => setArchive(e.target.value)}
        className="w-full px-4 py-2 rounded-md bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
        placeholder="Enter archive value"
      />

      <select
        value={type}
        onChange={(e) => setType(e.target.value)}
        className="w-full mt-3 px-4 py-2 rounded-md bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        <option value="days">Days</option>
        <option value="months">Months</option>
      </select>

      <button
        onClick={updateArchive}
        className="mt-4 px-6 py-2 bg-green-500 hover:bg-green-600 text-white font-bold rounded-md transition"
      >
        Update
      </button>
    </div>
  );
};

export default EditArchive;
