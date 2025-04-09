import React, { useState } from 'react';
import { useOutletContext } from "react-router-dom";
import { User, Mail, IdCard, Briefcase, DollarSign, Phone, FileText, CreditCard } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Don't forget to import the styles

const MyDetails = () => {
  const context = useOutletContext();
  const [selectedFile, setSelectedFile] = useState(null);

  if (!context || !context.users || !context.users.user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-400 text-lg animate-pulse">Loading user data...</p>
      </div>
    );
  }

  const { user } = context.users;
  
  // Handle file selection
  const handleFileChange = (event) => {
    const file = event.target.files[0];

    // Check file size: 150KB (150 * 1024 bytes)
    if (file && file.size > 150 * 1024) {
      toast.error("File size exceeds 150KB. Please upload a smaller file.");
      setSelectedFile(null);  // Clear the selected file
    } else {
      setSelectedFile(file);
    }
  };

  // Handle file upload using fetch
  const handleFileUpload = async () => {
    if (!selectedFile) {
      toast.error("Please select a file to upload.");  // Error message
      return;
    }

    const formData = new FormData();
    formData.append('imageProfile', selectedFile);
    formData.append("id", user.id);

    try {
      const response = await fetch('http://localhost:5000/api/upload/profile', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Upload success:', data);
        toast.success('Your Profile Photo changed successfully!'); // Success message
      } else {
        console.error('Upload failed:', response.statusText);
        toast.error('Your Profile Photo change failed.'); // Error message
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      toast.error('File upload failed.'); // Error message
    }
  };

  return (
    <div className="w-full max-w-[90%] md:max-w-[1200px] mx-auto bg-white text-gray-900 shadow-sm p-6 md:p-8 rounded-md overflow-auto">
      <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-center text-red-600">My Details</h2>
  <hr />
      <div className="grid mt-2 grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
        {/* Name */}
        <div className="flex items-center space-x-2">
          <User className="text-red-600" size={20} />
          <span className="font-medium text-gray-800">Name:</span>
          <span className="text-gray-600">{user.name || "N/A"}</span>
        </div>

        {/* Email */}
        <div className="flex items-center space-x-2">
          <Mail className="text-red-600" size={20} />
          <span className="font-medium text-gray-800">Email:</span>
          <span className="text-gray-600">{user.email || "N/A"}</span>
        </div>

        {/* UI ID */}
        <div className="flex items-center space-x-2">
          <IdCard className="text-red-600" size={20} />
          <span className="font-medium text-gray-800">UI ID:</span>
          <span className="text-gray-600">{user.id || "N/A"}</span>
        </div>

        {/* Position */}
        <div className="flex items-center space-x-2">
          <Briefcase className="text-red-600" size={20} />
          <span className="font-medium text-gray-800">Position:</span>
          <span className="text-gray-600">{user.Position || "N/A"}</span>
        </div>

        {/* PL Balance */}
        <div className="flex items-center space-x-2">
          <DollarSign className="text-green-600" size={20} />
          <span className="font-medium text-gray-800">PL Balance:</span>
          <span className="text-gray-600">{user.plBalance || "N/A"}</span>
        </div>

        {/* CL Balance */}
        <div className="flex items-center space-x-2">
          <DollarSign className="text-green-600" size={20} />
          <span className="font-medium text-gray-800">CL Balance:</span>
          <span className="text-gray-600">{user.clBalance || "N/A"}</span>
        </div>

        {/* Phone */}
        <div className="flex items-center space-x-2">
          <Phone className="text-purple-500" size={20} />
          <span className="font-medium text-gray-800">Phone:</span>
          <span className="text-gray-600">{user.phone || "N/A"}</span>
        </div>

        {/* Aadhar */}
        <div className="flex items-center space-x-2">
          <FileText className="text-yellow-500" size={20} />
          <span className="font-medium text-gray-800">Aadhar:</span>
          <a href={`http://localhost:5000/uploads/${user.adharCard}`} target="_blank" rel="noopener noreferrer">
            <img
              src={`http://localhost:5000/uploads/${user.adharCard}`}
              alt="Aadhar Card"
              className="h-20 w-20 object-cover mt-2"
            />
          </a>
        </div>

        {/* PAN Card */}
        <div className="flex items-center space-x-2">
          <CreditCard className="text-orange-500" size={20} />
          <span className="font-medium text-gray-800">PAN Card:</span>
          <a href={`http://localhost:5000/uploads/${user.panCard}`} target="_blank" rel="noopener noreferrer">
            <img
              src={`http://localhost:5000/uploads/${user.panCard}`}
              alt="PAN Card"
              className="h-20 w-20 object-cover mt-2"
            />
          </a>
        </div>

        {/* File Upload Section */}
        <div className="flex flex-col space-y-4 mt-6">
          {/* File Input */}
          <div className="flex items-center space-x-2">
            <input
              type="file"
              onChange={handleFileChange}
              accept="image/*"
              className="text-sm border rounded p-2"
            />
          </div>

          {/* Upload Button */}
          <button
            type="button"
            onClick={handleFileUpload}
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Upload Image
          </button>
        </div>
      </div>

      {/* Toastify container */}
      <ToastContainer />
    </div>
  );
};

export default MyDetails;
