import React, { useState } from "react";
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";
import { Calendar, ChevronDown } from "lucide-react";

const COLORS = ["#ef4444", "#10b981", "#f59e0b", "#3b82f6"];

// Each item has totalTarget, achievedMonthly and achievedYearly
const items = [
    { name: "Bangle", totalMonthly: 150, monthly: 100, totalYearly: 200, yearly: 100 },
    { name: "Chain", totalMonthly: 20, monthly: 40, totalYearly: 100, yearly: 60 },
    { name: "Necklace", totalMonthly: 100, monthly: 50, totalYearly: 120, yearly: 50 },
    { name: "PR", totalMonthly: 40, monthly: 20, totalYearly: 80, yearly: 30 },
    { name: "Diamond", totalMonthly: 60, monthly: 20, totalYearly: 100, yearly: 80 },
];

const getTotalData = (items) => {
    const totalMonthlyTarget = items.reduce((sum, item) => sum + item.totalMonthly, 0);
    const totalMonthlyAchieved = items.reduce((sum, item) => sum + item.monthly, 0);
    const totalYearlyTarget = items.reduce((sum, item) => sum + item.totalYearly, 0);
    const totalYearlyAchieved = items.reduce((sum, item) => sum + item.yearly, 0);
    return {
        monthly: { achieved: totalMonthlyAchieved, total: totalMonthlyTarget },
        yearly: { achieved: totalYearlyAchieved, total: totalYearlyTarget },
    };
};

const DashboardPage = () => {
    const [selectedDate, setSelectedDate] = useState("");
    const [selectedItem, setSelectedItem] = useState(null);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const totalData = getTotalData(items);

    const handleDateChange = (e) => {
        setSelectedDate(e.target.value);
    };

    const getPieData = (achieved, total) => [
        { name: "Achieved", value: achieved },
        { name: "Remaining", value: Math.max(0, total - achieved) },
    ];

    return (
        <div className="p-6 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-800">Dashboard</h2>

                {/* Date Filter */}
                <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow">
                    <Calendar className="text-red-500" />
                    <input
                        type="date"
                        value={selectedDate}
                        onChange={handleDateChange}
                        className="outline-none text-sm text-gray-700"
                    />
                </div>
            </div>

            {/* Charts - Monthly & Yearly Store Target */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-4 rounded-2xl shadow-md hover:shadow-lg cursor-pointer transition">
                    <h3 className="text-lg font-semibold text-red-600 mb-4 text-center">
                        Monthly Store Target (Achieved: {totalData.monthly.achieved}/{totalData.monthly.total})
                    </h3>
                    <ResponsiveContainer width="100%" height={250}>
                        <PieChart>
                            <Pie
                                data={getPieData(totalData.monthly.achieved, totalData.monthly.total)}
                                dataKey="value"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                outerRadius={80}
                                label
                            >
                                {getPieData(totalData.monthly.achieved, totalData.monthly.total).map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                <div className="bg-white p-4 rounded-2xl shadow-md hover:shadow-lg cursor-pointer transition">
                    <h3 className="text-lg font-semibold text-green-600 mb-4 text-center">
                        Yearly Store Target (Achieved: {totalData.yearly.achieved}/{totalData.yearly.total})
                    </h3>
                    <ResponsiveContainer width="100%" height={250}>
                        <PieChart>
                            <Pie
                                data={getPieData(totalData.yearly.achieved, totalData.yearly.total)}
                                dataKey="value"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                outerRadius={80}
                                label
                            >
                                {getPieData(totalData.yearly.achieved, totalData.yearly.total).map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Dropdown Selector */}
            <div className="relative w-full max-w-sm">
                <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="w-full flex items-center justify-between bg-gradient-to-tr from-red-100 to-white text-gray-800 px-4 py-3 rounded-xl shadow hover:shadow-md"
                >
                    <span>{selectedItem ? selectedItem.name : "Select Category"}</span>
                    <ChevronDown className="w-5 h-5" />
                </button>
                {dropdownOpen && (
                    <div className="absolute z-10 mt-2 w-full bg-white shadow-lg rounded-xl py-2">
                        {items.map((item, idx) => (
                            <div
                                key={idx}
                                onClick={() => {
                                    setSelectedItem(item);
                                    setDropdownOpen(false);
                                }}
                                className="px-4 py-2 hover:bg-red-50 cursor-pointer text-sm text-gray-800"
                            >
                                {item.name}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Charts Display */}
            {selectedItem && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    <div className="bg-white p-4 rounded-2xl shadow-md">
                        <h3 className="text-lg font-semibold text-red-600 mb-4 text-center">
                            {selectedItem.name} - Monthly Store Target (Achieved: {selectedItem.monthly}/{selectedItem.totalMonthly})
                        </h3>
                        <ResponsiveContainer width="100%" height={250}>
                            <PieChart>
                                <Pie
                                    data={getPieData(selectedItem.monthly, selectedItem.totalMonthly)}
                                    dataKey="value"
                                    nameKey="name"
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={80}
                                    label
                                >
                                    {getPieData(selectedItem.monthly, selectedItem.totalMonthly).map((entry, index) => (
                                        <Cell key={`cell-month-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="bg-white p-4 rounded-2xl shadow-md">
                        <h3 className="text-lg font-semibold text-green-600 mb-4 text-center">
                            {selectedItem.name} - Yearly Store Target (Achieved: {selectedItem.yearly}/{selectedItem.totalYearly})
                        </h3>
                        <ResponsiveContainer width="100%" height={250}>
                            <PieChart>
                                <Pie
                                    data={getPieData(selectedItem.yearly, selectedItem.totalYearly)}
                                    dataKey="value"
                                    nameKey="name"
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={80}
                                    label
                                >
                                    {getPieData(selectedItem.yearly, selectedItem.totalYearly).map((entry, index) => (
                                        <Cell key={`cell-year-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DashboardPage;
