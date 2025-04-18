import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


const EmployeeDetail = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  const [previewImg, setPreviewImg] = useState(null); // For image preview modal

  const apiUrl =  import.meta.env.VITE_DOMIN
  console.log(apiUrl)
  useEffect(() => {

    async function fetchEmployee() {
      try {
        const response = await fetch(`${apiUrl}/api/user/fullData/${id}`, {
          method: "GET",
          credentials: "include",
        });
        const data = await response.json();
        console.log("Employee Data:", data); // ✅ Add this line to debug
        setEmployee(data);
      } catch (error) {
        console.error("Error fetching employee:", error);
      }
    }

    fetchEmployee();
  }, [id]);


  // Function to render image
  const renderImage = (fileName) => (
    <img
      src={`${apiUrl}/uploads/${fileName}`}
      alt="Document"
      className="w-24 h-24 object-cover rounded-xl border border-red-700 shadow cursor-pointer"
      onClick={() => setPreviewImg(`${apiUrl}/uploads/${fileName}`)} // Set preview image on click
    // onError={(e) => (e.target.src = "https://via.placeholder.com/96x96?text=No+Image")}
    />
  );

  if (!employee)
    return (
      <div className="flex justify-center items-center min-h-screen bg-white text-red-600">
        <p className="text-lg font-semibold animate-pulse">Fetching employee details...</p>
      </div>
    );

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-white to-red-50 p-6">
      <div className="bg-white/80 backdrop-blur-md text-gray-900 shadow-2xl rounded-3xl px-10 py-8 w-full max-w-5xl border border-red-100">
        <h1 className="text-4xl font-bold text-center text-red-600 border-b-2 border-red-200 pb-4 mb-10">
          Employee Profile
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {Object.entries(employee)
            .filter(([key]) => !["_id", "__v", "password"].includes(key))
            .map(([key, value]) => (
              <div
                key={key}
                className="bg-white border border-red-200 rounded-2xl p-5 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <p className="text-xs font-bold text-red-500 uppercase tracking-wider mb-2">
                  {key.replace(/([A-Z])/g, " $1")}:
                </p>

                {typeof value === "string" && value.match(/\.(jpg|jpeg|png|gif)$/i) ? (
                  <div className="overflow-y-auto max-h-28">
                    {renderImage(value)}
                  </div>
                ) : Array.isArray(value) && value[0]?.match(/\.(jpg|jpeg|png|gif)$/i) ? (
                  <div className="flex flex-wrap gap-2 overflow-y-auto max-h-36 pr-1">
                    {value.map((img, i) => (
                      <div key={i}>{renderImage(img)}</div>
                    ))}
                  </div>
                ) : (
                  <p className="text-base font-medium text-gray-800 break-words">{value ?? "N/A"}</p>
                )}

              </div>
            ))}
        </div>
      </div>

      {/* 🔍 Image Preview Modal */}
      {previewImg && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
          onClick={() => setPreviewImg(null)}
        >
          <img
            src={previewImg}
            alt="Preview"
            className="max-w-[90vw] max-h-[90vh] rounded-lg shadow-xl"
          />
        </div>
      )}
    </div>
  );
};

export default EmployeeDetail;
