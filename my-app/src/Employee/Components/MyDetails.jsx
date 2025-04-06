import { useOutletContext } from "react-router-dom";

const MyDetails = () => {
  const context = useOutletContext();  
  // console.log("Context Data:", context); // Debugging ke liye

  if (!context || !context.users || !context.users.user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-400 text-lg animate-pulse">Loading user data...</p>
      </div>
    );
  }

  const { user } = context.users;  // ✅ Correctly extracting actual user data

  return (
    <div className="max-w-lg mx-auto bg-gray-900 text-gray-200 shadow-lg rounded-lg p-8 border border-gray-700">
      <h2 className="text-3xl font-semibold mb-6 border-b border-gray-700 pb-3 text-center tracking-wide">
        My Details
      </h2>
      <div className="space-y-5 text-lg">
        <p>
          <span className="font-medium text-blue-400">👤 Name:</span> {user.name || "N/A"}
        </p>
        <p>
          <span className="font-medium text-blue-400">📧 Email:</span> {user.email || "N/A"}
        </p>
        <p>
          <span className="font-medium text-blue-400">🆔 UI ID:</span> {user.id || "N/A"}
        </p>
        <p>
          <span className="font-medium text-green-400">🏢 Position:</span> {user.position || "N/A"}
        </p>
        <p>
          <span className="font-medium text-yellow-400">💰 PL Balance:</span> {user.plBalance || "N/A"}
        </p>
        <p>
          <span className="font-medium text-yellow-400">💵 CL Balance:</span> {user.clBalance || "N/A"}
        </p>
        <p>
          <span className="font-medium text-purple-400">📱 Phone:</span> {user.phone || "N/A"}
        </p>
        <p>
          <span className="font-medium text-orange-400">📜 Aadhar:</span> {user.adharCard || "N/A"}
        </p>
        <p>
          <span className="font-medium text-red-400">🪪 PAN Card:</span> {user.panCard || "N/A"}
        </p>
      </div>
    </div>
  );
};

export default MyDetails;
