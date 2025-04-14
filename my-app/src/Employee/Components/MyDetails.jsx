import React, { useState } from 'react';
import { useOutletContext } from "react-router-dom";
import { User, Mail, IdCard, Briefcase, DollarSign, Phone, FileText, CreditCard } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion } from 'framer-motion';  // Import motion from Framer Motion

const MyDetails = () => {

  const apiUrl =  import.meta.env.VITE_DOMIN
  console.log(apiUrl)

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
      const response = await fetch(`${apiUrl}/api/upload/profile`, {
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
    <div className="flex justify-center items-center h-screen bg-gray-100"> {/* Added flex to center the entire container */}
      <div className="w-full max-w-[90%] md:max-w-[1200px] bg-white text-gray-900 shadow-lg p-6 md:p-8 rounded-md overflow-auto">
        <motion.h2
          className="text-2xl md:text-3xl font-semibold mb-6 text-center text-red-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          My Details
        </motion.h2>

        <motion.hr
          className="mb-6 w-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        />

        <div className="grid mt-6 grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
          {/* Name */}
          <motion.div
            className="flex items-center space-x-3"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <User className="text-red-600" size={24} />
            <span className="font-medium text-gray-800">Name:</span>
            <span className="text-gray-600">{user.name || "N/A"}</span>
          </motion.div>

          {/* Email */}
          <motion.div
            className="flex items-center space-x-3"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <Mail className="text-red-600" size={24} />
            <span className="font-medium text-gray-800">Email:</span>
            <span className="text-gray-600">{user.email || "N/A"}</span>
          </motion.div>

          {/* UI ID */}
          <motion.div
            className="flex items-center space-x-3"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <IdCard className="text-red-600" size={24} />
            <span className="font-medium text-gray-800">UI ID:</span>
            <span className="text-gray-600">{user.id || "N/A"}</span>
          </motion.div>

          {/* Position */}
          <motion.div
            className="flex items-center space-x-3"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <Briefcase className="text-red-600" size={24} />
            <span className="font-medium text-gray-800">Position:</span>
            <span className="text-gray-600">{user.Position || "N/A"}</span>
          </motion.div>

          {/* PL Balance */}
          <motion.div
            className="flex items-center space-x-3"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <DollarSign className="text-green-600" size={24} />
            <span className="font-medium text-gray-800">PL Balance:</span>
            <span className="text-gray-600">{user.plBalance || "N/A"}</span>
          </motion.div>

          {/* CL Balance */}
          <motion.div
            className="flex items-center space-x-3"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <DollarSign className="text-green-600" size={24} />
            <span className="font-medium text-gray-800">CL Balance:</span>
            <span className="text-gray-600">{user.clBalance || "N/A"}</span>
          </motion.div>

          {/* Phone */}
          <motion.div
            className="flex items-center space-x-3"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Phone className="text-purple-500" size={24} />
            <span className="font-medium text-gray-800">Phone:</span>
            <span className="text-gray-600">{user.phone || "N/A"}</span>
          </motion.div>

          {/* Aadhar */}
          <motion.div
            className="flex items-center space-x-3"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <FileText className="text-yellow-500" size={24} />
            <span className="font-medium text-gray-800">Aadhar:</span>
            <a href={`${apiUrl}/uploads/${user.adharCard}`} target="_blank" rel="noopener noreferrer">
              <motion.img
                src={`${apiUrl}/uploads/${user.adharCard}`}
                alt="Aadhar Card"
                className="h-20 w-20 object-cover mt-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
              />
            </a>
          </motion.div>

          {/* PAN Card */}
          <motion.div
            className="flex items-center space-x-3"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <CreditCard className="text-orange-500" size={24} />
            <span className="font-medium text-gray-800">PAN Card:</span>
            <a href={`${apiUrl}/uploads/${user.panCard}`} target="_blank" rel="noopener noreferrer">
              <motion.img
                src={`${apiUrl}/uploads/${user.panCard}`}
                alt="PAN Card"
                className="h-20 w-20 object-cover mt-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
              />
            </a>
          </motion.div>

          {/* File Upload Section */}
          <motion.div
            className="flex flex-col space-y-4 mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            {/* File Input */}
            <div className="flex items-center space-x-2">
              <input
                type="file"
                onChange={handleFileChange}
                accept="image/*"
                className="text-sm border rounded-md p-2 focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Upload Button */}
            <button
              type="button"
              onClick={handleFileUpload}
              className="bg-blue-500 text-white px-6 py-3 rounded-md transition-all duration-300 ease-in-out hover:bg-blue-600"
            >
              Upload Image
            </button>
          </motion.div>
        </div>

        {/* Toastify container */}
        <ToastContainer />
      </div>
    </div>
  );
};

export default MyDetails;
