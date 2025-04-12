import { KeyRound } from "lucide-react";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
// Import React-Toastify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import the Toastify CSS

const Setting = () => {
  const [selectedTab, setSelectedTab] = useState("");
  const [sheetUrl, setSheetUrl] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Google Sheet URL:", sheetUrl);

    async function postData() {
      try {
        const response = await fetch('http://localhost:5000/api/google/sheet', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({sheetUrl})
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const result = await response.json();
        
        console.log('Success:', result);

        // Success Toast
        toast.success('Google Sheet URL submitted successfully!');
        
        // Reset the input value after successful submission
        setSheetUrl("");

      } catch (error) {
        console.error('Error:', error);
        
        // Error Toast
        toast.error('Failed to submit Google Sheet URL. Please try again.');
      }
    }

    postData();  // Calling the function
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-red-700 mb-8">⚙️ Settings</h1>

        {/* 🔗 Google Sheet URL Input */}
        <form onSubmit={handleSubmit} className="mb-8 flex gap-2">
          <input
            type="url"
            placeholder="Paste your Google Sheet URL"
            className="flex-1 border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-red-400"
            value={sheetUrl}
            onChange={(e) => setSheetUrl(e.target.value)}
            required
          />
          <button
            type="submit"
            className="bg-red-600 text-white px-4 py-2 rounded-xl font-semibold hover:bg-red-700 transition"
          >
            Submit
          </button>
        </form>

        <ul className="flex flex-col gap-4">
          {/* 🔹 Change Password Section */}
          <NavLink
            to="Change-password"
            className={`flex items-center w-full p-3 rounded-xl shadow transition duration-300 ${selectedTab === "Password Change"
              ? "bg-blue-600 text-white font-bold"
              : "bg-gray-100 hover:bg-blue-100 hover:text-black"
              }`}
            onClick={() => setSelectedTab("Password Change")}
          >
            <KeyRound className="mr-2" size={20} /> Password Change
          </NavLink>
        </ul>
      </div>

      {/* Toastify Container for displaying Toast messages */}
      <ToastContainer />
    </div>
  );
};

export default Setting;
