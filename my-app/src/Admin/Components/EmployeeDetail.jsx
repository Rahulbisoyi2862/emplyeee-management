import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

const EmployeeDetail = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  const [previewImg, setPreviewImg] = useState(null); // For image preview modal

  useEffect(() => {
    AOS.init({ duration: 700, easing: "ease-in-out" });

    async function fetchEmployee() {
      try {
        const response = await fetch(`http://localhost:5000/api/user/fullData/${id}`, {
          method: "GET",
          credentials: "include",
        });
        const data = await response.json();
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
      src={`http://localhost:5000/uploads/${fileName}`}
      alt="Document"
      className="w-24 h-24 object-cover rounded-xl border border-red-700 shadow cursor-pointer"
      onClick={() => setPreviewImg(`http://localhost:5000/uploads/${fileName}`)} // Set preview image on click
      onError={(e) => (e.target.src = "https://via.placeholder.com/96x96?text=No+Image")}
    />
  );

  if (!employee)
    return (
      <div className="flex justify-center items-center min-h-screen bg-white text-red-600">
        <p className="text-lg font-semibold animate-pulse">Fetching employee details...</p>
      </div>
    );

  return (
    <div className="flex justify-center items-center min-h-screen bg-white p-6">
      <div className="bg-red-0 text-gray-900 shadow-xl rounded-2xl px-8 py-6 w-full max-w-4xl" data-aos="fade-up">
        <h1 className="text-4xl font-bold text-center text-red-600 border-b-2 border-red-200 pb-4 mb-6">
          Employee Profile
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {Object.entries(employee)
            .filter(([key]) => !["_id", "__v", "password"].includes(key))
            .map(([key, value]) => (
              <div
                key={key}
                className="bg-white rounded-xl p-4 shadow-sm border border-red-100 hover:shadow-md transition-all h-[150px] flex flex-col justify-between"
                data-aos="fade-left"
              >
                <p className="text-sm font-semibold text-red-600 mb-2 uppercase tracking-wide">
                  {key.replace(/([A-Z])/g, " $1")}:
                </p>

                {typeof value === "string" && value.match(/\.(jpg|jpeg|png|gif)$/i) ? (
                  renderImage(value)
                ) : Array.isArray(value) && value[0]?.match(/\.(jpg|jpeg|png|gif)$/i) ? (
                  <div className="flex flex-wrap gap-2 overflow-x-auto">
                    {value.map((img, i) => (
                      <div key={i}>{renderImage(img)}</div>
                    ))}
                  </div>
                ) : (
                  <p className="text-base font-medium text-gray-800 break-words">{value}</p>
                )}
              </div>
            ))}
        </div>
      </div>

      {/* 🔍 Image Preview Modal */}
      {previewImg && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
          onClick={() => setPreviewImg(null)} // Close the preview when clicked outside
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
