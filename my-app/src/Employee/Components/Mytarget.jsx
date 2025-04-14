import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { Calendar, Package, Target, Award } from 'lucide-react'; // Importing Lucide icons
import { motion } from 'framer-motion'; // Import Framer Motion for animations

const MyTarget = () => {
  const context = useOutletContext();
  const [targetData, setTargetData] = useState(null);
  const apiUrl =  import.meta.env.VITE_DOMIN
  console.log(apiUrl)
  if (!context || !context.users || !context.users.user) {
    return <p className="text-center text-red-700 text-lg animate-pulse">Loading user data...</p>;
  }

  const { user } = context.users;

  useEffect(() => {
    const fetchTarget = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/target/myDtl/${user.id}`);
        const data = await response.json();
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
    <div className="min-h-screen py-16 px-4 bg-gray-50">
      <motion.div 
        className="max-w-4xl mx-auto mt-12 bg-white text-gray-800 shadow-xl rounded-2xl p-8 border border-gray-200 z-10 relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-4xl font-semibold text-gray-800 mb-6 text-center">
          <Target className="inline-block mr-3 text-red-600" /> My Goals
        </h2>

        {/* Target Data */}
        <ul className="space-y-6">
          {[
            { icon: <Package />, label: 'Target Type', value: target?.targetType },
            { icon: <Calendar />, label: 'Target Date', value: target?.date },
            { icon: <Package />, label: 'Counter', value: target?.counter },
            { icon: <Award />, label: 'Target Gold', value: `${target?.targetGold || 0} Gm` },
            { icon: <Award />, label: 'Target Diamond', value: `${target?.targetDiamond || 0} Carat` }
          ].map((item, index) => (
            <motion.li 
              key={index}
              className="p-6 rounded-xl border border-gray-300 bg-white shadow-lg hover:shadow-2xl transition-transform duration-300 flex items-center transform hover:scale-105"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index, duration: 0.5 }}
            >
              <div className="text-red-600 mr-4 w-7 h-7">{item.icon}</div>
              <span className="font-medium text-gray-700">{item.label}:</span>{" "}
              <span className="text-gray-500">{item.value || "N/A"}</span>
            </motion.li>
          ))}

          {/* Total Gold and Diamond Achieved */}
          <motion.div 
            className="mt-6 flex justify-between items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="font-medium text-gray-700">Total Gold Achieved:</div>
            <div className="text-gray-500">{totalGold || "0 Gm"} Gm</div>
          </motion.div>
          <motion.div 
            className="mt-4 flex justify-between items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="font-medium text-gray-700">Total Diamond Achieved:</div>
            <div className="text-gray-500">{totalDiamond || "0 Carat"} Carat</div>
          </motion.div>
        </ul>

        {/* Archives Table */}
        {target?.archives && target.archives.length > 0 && (
          <motion.div 
            className="mt-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-3xl font-semibold text-gray-800 mb-6">Achives</h3>
            <table className="min-w-full table-auto border-collapse border border-gray-300">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-gray-600">Achieve Gold</th>
                  <th className="px-6 py-3 text-left text-gray-600">Achieve Diamond</th>
                  <th className="px-6 py-3 text-left text-gray-600">Date</th>
                </tr>
              </thead>
              <tbody>
                {target.archives.map((archive, index) => (
                  <tr key={index} className="border-b hover:bg-gray-100">
                    <td className="px-6 py-4 text-gray-500">{archive.archiveGold || "0 Gm"} Gm</td>
                    <td className="px-6 py-4 text-gray-500">{archive.archiveDiamond || "0 Carat"} Carat</td>
                    <td className="px-6 py-4 text-gray-500">{archive.date || "mm-dd-yy"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        )}

        {/* Extra Info */}
        <div className="mt-12 border-t border-gray-300 pt-6 text-base space-y-2">
          <p>
            <span className="font-medium text-gray-700">Email:</span>{" "}
            <span className="text-gray-500">{userDetails?.email || user.email || "N/A"}</span>
          </p>
          <p>
            <span className="font-medium text-gray-700">Phone:</span>{" "}
            <span className="text-gray-500">{userDetails?.phone || user.phone || "N/A"}</span>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default MyTarget;
