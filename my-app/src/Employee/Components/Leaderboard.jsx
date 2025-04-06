import { useEffect, useState } from "react";

const Leaderboard = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchTopEmployees = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/target/topThree");
        const data = await response.json();
        setEmployees(data);
        console.log("Top Employees:", data);
      } catch (error) {
        console.error("❌ Error fetching top employees:", error);
      }
    };

    fetchTopEmployees();
  }, []);

  return (
    <div className="max-w-md mx-auto bg-white shadow-xl rounded-xl p-6 border border-gray-200">
      <h2 className="text-2xl font-bold text-gray-700 mb-4 border-b pb-2">🏆 Top Performers</h2>
      <ul className="space-y-4">
        {employees.length > 0 ? (
          employees.map((emp, index) => (
            <li
              key={emp.email}
              className={`flex justify-between items-center p-4 rounded-lg text-white ${
                index === 0 ? "bg-gradient-to-r from-yellow-400 to-yellow-600" :
                index === 1 ? "bg-gradient-to-r from-gray-400 to-gray-600" :
                "bg-gradient-to-r from-orange-400 to-orange-600"
              }`}
            >
              <span className="font-semibold">{emp.name} ({emp.email})</span>
              <span className="font-bold text-lg">{emp.archive} pts</span>
            </li>
          ))
        ) : (
          <p className="text-center text-gray-500">⏳ Loading...</p>
        )}
      </ul>
    </div>
  );
};

export default Leaderboard;
