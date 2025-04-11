import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { PlusCircle } from "lucide-react";

const COLORS = ["#10b981", "#f87171"];

const ChartPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [data, setData] = useState(null);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [filteredRecords, setFilteredRecords] = useState([]);

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [editForm, setEditForm] = useState({
    date: "",
    archiveGold: "",
    archiveDiamond: "",
  });

  // 👉 Fetch chart data from backend
  const fetchChartData = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/target/chart-data/${id}`);
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        setData(json.data[0]);
        setFilteredRecords(json.data[0]?.archives || []);
      }else{
        toast.error("Failed to load chart data.");
      }
    } catch (error) {
      toast.error("Error fetching chart data.");
      console.error("Error fetching chart data:", error);
    }
  };

  useEffect(() => {
    if (id) fetchChartData();
  }, [id]);

  // 🔍 Filter by date
  useEffect(() => {
    if (data?.archives) {
      const filtered = data.archives.filter((item) => {
        const itemDate = new Date(item.date);
        const from = fromDate ? new Date(fromDate) : null;
        const to = toDate ? new Date(toDate) : null;
        return (!from || itemDate >= from) && (!to || itemDate <= to);
      });
      setFilteredRecords(filtered);
    }
  }, [fromDate, toDate, data]);

  // 🎯 Pie chart data
  const getPieData = (achieved, total) => [
    { name: "Achieved", value: achieved },
    { name: "Remaining", value: Math.max(0, total - achieved) },
  ];

  // ✏️ Open edit modal
  const openEditModal = (item, index) => {
    setEditIndex(index);
    setEditForm({
      date: item.date,
      archiveGold: item.archiveGold,
      archiveDiamond: item.archiveDiamond,
    });
    setEditModalOpen(true);
  };

  // 💾 Submit edit
  const handleEditSubmit = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/editRow/edit-archive/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          index: editIndex,
          updatedData: editForm,
        }),
      });

      const json = await res.json();
      if (json.success) {
        toast.success("Archive updated successfully!");
        setEditModalOpen(false);
        fetchChartData();
      } else {
        toast.error("Failed to update archive!");
      }
    } catch (err) {
      toast.error("Error updating archive!");
      console.error(err);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-xl font-bold text-center text-gray-800">
        Month: {data?.month} / Year: {data?.year}
      </h2>

      {/* Pie Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Gold Chart */}
        <div className="bg-white p-4 rounded-2xl shadow">
          <h3 className="text-center font-semibold text-yellow-600 mb-4">
            Gold Target ({data?.archiveGold}/{data?.gold})
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={getPieData(data?.archiveGold || 0, data?.gold || 0)}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {getPieData(data?.archiveGold || 0, data?.gold || 0).map((entry, index) => (
                  <Cell key={`gold-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Diamond Chart */}
        <div className="bg-white p-4 rounded-2xl shadow">
          <h3 className="text-center font-semibold text-blue-600 mb-4">
            Diamond Target ({data?.archiveDiamond}/{data?.diamond})
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={getPieData(data?.archiveDiamond || 0, data?.diamond || 0)}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {getPieData(data?.archiveDiamond || 0, data?.diamond || 0).map((entry, index) => (
                  <Cell key={`diamond-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ➕ Add Progress */}
      <div className="flex justify-center">
        <button
          className="flex items-center gap-2 px-5 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl shadow"
          onClick={() => navigate(`/AddProgressPage/${id}`)}
        >
          <PlusCircle size={20} />
          Add Progress
        </button>
      </div>

      {/* 🗂️ Archive Table */}
      <div className="mt-10 bg-white p-4 rounded-xl shadow-md">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">Progress Table</h3>

        {/* Date Filters */}
        <div className="flex flex-wrap gap-4 mb-4">
          <div>
            <label className="block text-sm">From</label>
            <input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              className="border rounded px-3 py-1"
            />
          </div>
          <div>
            <label className="block text-sm">To</label>
            <input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              className="border rounded px-3 py-1"
            />
          </div>
        </div>

        {/* Table Display */}
        {filteredRecords.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2">Date</th>
                  <th className="px-4 py-2">Gold</th>
                  <th className="px-4 py-2">Diamond</th>
                  <th className="px-4 py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredRecords.map((item, index) => (
                  <tr key={index} className="border-t">
                    <td className="px-4 py-2">{item.date}</td>
                    <td className="px-4 py-2">{item.archiveGold}</td>
                    <td className="px-4 py-2">{item.archiveDiamond}</td>
                    <td className="px-4 py-2">
                      <button
                        className="text-blue-600 hover:underline"
                        onClick={() => openEditModal(item, index)}
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div>No records found.</div>
        )}
      </div>

      {/* 🛠️ Edit Modal */}
      {editModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
            <h3 className="text-lg font-bold mb-4 text-gray-800">Edit Record</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm mb-1">Date</label>
                <input
                  type="date"
                  value={editForm.date}
                  onChange={(e) => setEditForm({ ...editForm, date: e.target.value })}
                  className="w-full border px-3 py-2 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Gold</label>
                <input
                  type="number"
                  value={editForm.archiveGold}
                  onChange={(e) => setEditForm({ ...editForm, archiveGold: e.target.value })}
                  className="w-full border px-3 py-2 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Diamond</label>
                <input
                  type="number"
                  value={editForm.archiveDiamond}
                  onChange={(e) => setEditForm({ ...editForm, archiveDiamond: e.target.value })}
                  className="w-full border px-3 py-2 rounded-lg"
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-4">
              <button
                onClick={() => setEditModalOpen(false)}
                className="px-4 py-2 bg-gray-300 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleEditSubmit}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
      <ToastContainer/>
    </div>
  );
};

export default ChartPage;
