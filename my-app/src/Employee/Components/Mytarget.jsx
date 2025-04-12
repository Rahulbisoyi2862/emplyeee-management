import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";

const MyTarget = () => {
  const context = useOutletContext();
  const [targetData, setTargetData] = useState(null);

  if (!context || !context.users || !context.users.user) {
    return <p className="text-center text-red-700 text-lg animate-pulse">Loading user data...</p>;
  }

  const { user } = context.users;

  useEffect(() => {
    const fetchTarget = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/target/myDtl/${user.id}`);
        const data = await response.json();
        console.log(data, 'dd')
        setTargetData(data);
        console.log("🎯 Target fetched:", data);
      } catch (error) {
        console.error("❌ Error fetching target:", error);
      }
    };

    fetchTarget();
  }, [user.id]);

  if (!targetData) {
    return <p className="text-center text-red-700 text-lg animate-pulse">Loading target data...</p>;
  }

  const { target, user: userDetails } = targetData;

  const totalGold = target?.archives?.reduce((sum, archive) => sum + (parseFloat(archive.archiveGold) || 0), 0);
  const totalDiamond = target?.archives?.reduce((sum, archive) => sum + (parseFloat(archive.archiveDiamond) || 0), 0);


  return (
    <div className="max-w-2xl mx-auto mt-24 bg-white text-gray-800 shadow-2xl rounded-2xl p-8 border border-red-700">
      <h2 className="text-3xl font-bold text-red-700 mb-6 text-center shadow-md p-2 rounded-md">
        🎯 My Goals
      </h2>

      {/* Target Data */}


      <ul className="space-y-4">
        <li className="p-4 rounded-xl border border-red-700 bg-white shadow-lg">
          <span className="font-semibold text-red-700">📌 Target Type:</span>{" "}
          <span>{target?.targetType || "N/A"}</span>
        </li>
        <li className="p-4 rounded-xl border border-red-700 bg-white shadow-lg">
          <span className="font-semibold text-red-700">📅 Target Date:</span>{" "}
          <span>{target?.date || "mm-dd-yy"}</span>
        </li>
        <li className="p-4 rounded-xl border border-red-700 bg-white shadow-lg">
          <span className="font-semibold text-red-700">📦 Counter:</span>{" "}
          <span>{target?.counter || "N/A"}</span>
        </li>
        <li className="p-4 rounded-xl border border-red-700 bg-white shadow-lg">
          <span className="font-semibold text-red-700">📦 Target Gold:</span>{" "}
          <span>{target?.targetGold || "0 Gm"} Gm</span>
        </li> 
        <li className="p-4 rounded-xl border border-red-700 bg-white shadow-lg">
          <span className="font-semibold text-red-700">📦 Target Diamond:</span>{" "}
          <span>{target?.targetDiamond || "0 Carat"} Carat</span>
        </li> 
        <div className="mt-4 flex justify-between items-center">
          <div className="font-semibold text-red-700">Total Gold Achieved:</div>
          <div>{totalGold || "0 Gm"} Gm</div>
        </div>
        <div className="mt-2 flex justify-between items-center">
          <div className="font-semibold text-red-700">Total Diamond Achieved:</div>
          <div>{totalDiamond || "0 Carat"} Carat</div>
        </div>
      </ul>

      {/* Archives Table */}
      {target?.archives && target.archives.length > 0 && (
        <div className="mt-8">
          <h3 className="text-2xl font-bold text-red-700 mb-4">📦 Archives</h3>
          <table className="min-w-full table-auto border-collapse border border-gray-200">
            <thead>
              <tr>
                <th className="px-4 py-2 border-b text-left">Achieve Gold</th>
                <th className="px-4 py-2 border-b text-left">Achieve Diamond</th>
                <th className="px-4 py-2 border-b text-left">Date</th>
              </tr>
            </thead>
            <tbody>
              {target.archives.map((archive, index) => (
                <tr key={index} className="border-b">
                  <td className="px-4 py-2">{archive.archiveGold || "0 Gm"} Gm</td>
                  <td className="px-4 py-2">{archive.archiveDiamond || "0 Carat"} Carat</td>
                  <td className="px-4 py-2">{archive.date || "mm-dd-yy"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Extra Info */}
      <div className="mt-8 border-t border-red-700 pt-4 text-base space-y-1">
        <p>
          <span className="font-semibold text-red-700">📧 Email:</span>{" "}
          <span>{userDetails?.email || user.email || "N/A"}</span>
        </p>
        <p>
          <span className="font-semibold text-red-700">📞 Phone:</span>{" "}
          <span>{userDetails?.phone || user.phone || "N/A"}</span>
        </p>
      </div>
    </div>
  );
};

export default MyTarget;
