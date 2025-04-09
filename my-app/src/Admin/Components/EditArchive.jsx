import React, { useState } from "react";
import { useNavigate, useParams } from "react-router";

const EditArchive = () => {
  const [archive, setArchive] = useState("");
  const [type, setType] = useState("days");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  const updateArchive = async () => {
    setError("");
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
      setTimeout(() => navigate("/employee-target"), 2000);
    } catch (err) {
      setError("❌ Server error, please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-lg bg-white border border-red-100 rounded-2xl shadow-2xl p-8">
        <h2 className="text-2xl font-bold text-red-700 text-center mb-6">
          Update Archive
        </h2>

        {/* Error / Success */}
        {error && <p className="text-red-700 text-sm mb-3">{error}</p>}
        {success && <p className="text-green-600 text-sm mb-3">{success}</p>}

        <label className="block text-red-700 font-medium mb-1">
          Archive Value
        </label>
        <input
          type="number"
          value={archive}
          onChange={(e) => setArchive(e.target.value)}
          className="w-full px-4 py-2 rounded-xl border border-red-300 focus:outline-none focus:ring-2 focus:ring-red-700 bg-white text-gray-800 shadow-inner mb-4"
          placeholder="Enter archive value"
        />

        <label className="block text-red-700 font-medium mb-1">
          Archive Type
        </label>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="w-full px-4 py-2 rounded-xl border border-red-300 focus:outline-none focus:ring-2 focus:ring-red-700 bg-white text-gray-800 shadow-inner mb-4"
        >
          
          <option value="">Select</option>
          <option value="monthly">Monthly</option>
        </select>

        <button
          onClick={updateArchive}
          className="w-full bg-red-700 hover:bg-red-800 text-white font-bold py-3 rounded-xl shadow-md transition duration-200"
        >
          Update
        </button>
      </div>
    </div>
  );
};

export default EditArchive;
``
