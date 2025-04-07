// ProfileModal.jsx
import React from "react";
import { X } from "lucide-react";

const ProfileModal = ({ isOpen, toggleModal, user }) => {
  if (!isOpen) return null; // Agar modal open nahi hai, toh kuch bhi na dikhaye

  return (
    <div
      className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50"
      onClick={toggleModal}
    >
      <div
        className="bg-white rounded-lg p-6 w-80"
        onClick={(e) => e.stopPropagation()} // Modal click pe page ka click block karna
      >
        <div className="flex flex-col items-center">
          <img
            src={`http://localhost:5000/uploads/${user.profileImg}`}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover mb-4"
          />
          <h2 className="text-xl font-semibold">{user.name}</h2>
          <p className="text-sm text-gray-500">{user.email}</p>
          <p className="text-sm text-gray-500">{user.role}</p>
        </div>

        {/* Close button */}
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-black"
          onClick={toggleModal}
        >
          <X size={20} />
        </button>
      </div>
    </div>
  );
};

export default ProfileModal;
