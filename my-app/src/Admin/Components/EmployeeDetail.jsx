import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

const EmployeeDetail = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    AOS.init({ duration: 700, easing: "ease-in-out" }); // Smooth animation

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

  if (!employee)
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white">
        <p className="text-lg font-semibold animate-pulse">Fetching employee details...</p>
      </div>
    );

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900 p-4">
      <div className="bg-gray-800 text-white shadow-lg rounded-xl px-6 py-4 w-full max-w-md" data-aos="fade-up">
        <h1 className="text-xl font-bold text-center text-blue-400 border-b border-gray-700 pb-2">Employee Details</h1>
        <div className="mt-3 space-y-2">
          {Object.keys(employee)
            .filter((key) => !["_id", "__v", "password"].includes(key))
            .map((key) => (
              <div key={key} className="p-2 bg-gray-700 rounded-md" data-aos="fade-left">
                <p className="text-blue-300 font-medium uppercase">{key.replace(/([A-Z])/g, " $1")}:</p>
                <p className="text-white font-semibold">{employee[key]}</p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetail;
