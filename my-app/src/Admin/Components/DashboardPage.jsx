import React, { useState, useEffect, useMemo } from "react";
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

const DashboardPage = () => {
    const [selectedDate, setSelectedDate] = useState(() => {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, "0");
        const day = String(now.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
    });

    const [selectedItem, setSelectedItem] = useState(null);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [archiveTotal, setArchiveTotal] = useState(0);
    const [targetTotal, setTargetTotal] = useState(0);
    const [totalTStoreM, setTotalTStoreM] = useState(null);
    const [totalAStoreM, setTotalAStoreM] = useState(null);
    const [totalCt, setTotalCt] = useState(0);
    const [totalCa, setTotalCa] = useState(0);
    const [totalYStoreT, setTotalYStoreT] = useState(null); // yearly target
    const [totalYStoreA, setTotalYStoreA] = useState(null); // yearly archive


    const formatDate = (dateStr) => {
        if (!dateStr) return "";
        const date = new Date(dateStr);
        return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
    };

    const totalStore = [
        {
            name: "Total Store",
            monthly: totalAStoreM,
            totalMonthly: totalTStoreM,
            yearly: totalYStoreA, // ✅ dynamic
            totalYearly: totalYStoreT, // ✅ dynamic
        },
    ];

    const items = useMemo(
        () => [
            {
                name: "Bangle",
                totalMonthly: targetTotal,
                monthly: archiveTotal,
                totalYearly: totalCt,
                yearly: totalCa,
            },
            {
                name: "Chain",
                totalMonthly: targetTotal,
                monthly: archiveTotal,
                totalYearly: totalCt,
                yearly: totalCa,
            },
            {
                name: "Necklace",
                totalMonthly: targetTotal,
                monthly: archiveTotal,
                totalYearly: totalCt,
                yearly: totalCa,
            },
            {
                name: "PR",
                totalMonthly: targetTotal,
                monthly: archiveTotal,
                totalYearly: totalCt,
                yearly: totalCa,
            },
            {
                name: "Diamond",
                totalMonthly: targetTotal,
                monthly: archiveTotal,
                totalYearly: totalCt,
                yearly: totalCa,
            },
        ],
        [targetTotal, archiveTotal, totalCt, totalCa]
    );

    useEffect(() => {
        const fetchTotalData = async () => {
            if (!selectedDate) return;
            try {
                const res = await fetch(
                    `http://localhost:5000/api/target/get-storeTargetAll?date=${formatDate(
                        selectedDate
                    )}`
                );
                const json = await res.json();
                console.log("Total store data:", json);
                setTotalTStoreM(json.totalMonthlyTarget);
                setTotalAStoreM(json.totalMonthlyArchive);
                setTotalYStoreT(json.totalYearlyTarget);  // ✅ set yearly total
                setTotalYStoreA(json.totalYearlyArchive); // ✅ set yearly achieved
            } catch (error) {
                console.error("Error fetching total store target:", error);
            }
        };
        fetchTotalData();
    }, [selectedDate]);

    useEffect(() => {
        const fetchCategoryData = async () => {
            if (!selectedItem || !selectedDate) return;
            try {
                const res = await fetch(
                    `http://localhost:5000/api/target/get-storeTarget/${selectedItem.name}?date=${formatDate(
                        selectedDate
                    )}`
                );
                const json = await res.json();
                console.log("Category data:", json);

                // 🛠️ Set monthly data
                setArchiveTotal(json.totalArchive);
                setTargetTotal(json.totalTargetValue);

                // 🛠️ Set yearly totals
                setTotalCt(json.yearlyTarget);
                setTotalCa(json.yearlyArchive);

                setSelectedItem((prev) => ({
                    ...prev,
                    monthly: json.totalArchive,
                    totalMonthly: json.totalTargetValue,
                    yearly: json.yearlyArchive,
                    totalYearly: json.yearlyTarget,
                }));
            } catch (error) {
                console.error("Error fetching item target:", error);
            }
        };
        fetchCategoryData();
    }, [selectedItem?.name, selectedDate]);

    const handleDateChange = (e) => setSelectedDate(e.target.value);

    const getPieData = (achieved, total) => [
        { name: "Achieved", value: achieved },
        { name: "Remaining", value: Math.max(0, total - achieved) },
    ];

    return (
        <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-800">Dashboard</h2>
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Monthly Chart */}
                {totalTStoreM === null ? (
                    <div className="bg-white p-6 rounded-2xl shadow-md flex items-center justify-center h-60">
                        <p className="text-gray-500">Loading monthly target data...</p>
                    </div>
                ) : (
                    <div className="bg-white p-4 rounded-2xl shadow-md">
                        <h3 className="text-lg font-semibold text-red-600 mb-4 text-center">
                            Monthly Store Target (
                            {totalStore[0].monthly}/{totalStore[0].totalMonthly})
                        </h3>
                        <ResponsiveContainer width="100%" height={250}>
                            <PieChart>
                                <Pie
                                    data={getPieData(
                                        totalStore[0].monthly,
                                        totalStore[0].totalMonthly
                                    )}
                                    dataKey="value"
                                    nameKey="name"
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={80}
                                    label
                                >
                                    {getPieData(
                                        totalStore[0].monthly,
                                        totalStore[0].totalMonthly
                                    ).map((entry, index) => (
                                        <Cell
                                            key={`cell-${index}`}
                                            fill={COLORS[index % COLORS.length]}
                                        />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                )}

                {/* Yearly Chart */}
                <div className="bg-white p-4 rounded-2xl shadow-md">
                    <h3 className="text-lg font-semibold text-green-600 mb-4 text-center">
                        Yearly Store Target (
                        {totalStore[0].yearly}/{totalStore[0].totalYearly})
                    </h3>
                    <ResponsiveContainer width="100%" height={250}>
                        <PieChart>
                            <Pie
                                data={getPieData(
                                    totalStore[0].yearly,
                                    totalStore[0].totalYearly
                                )}
                                dataKey="value"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                outerRadius={80}
                                label
                            >
                                {getPieData(
                                    totalStore[0].yearly,
                                    totalStore[0].totalYearly
                                ).map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={COLORS[index % COLORS.length]}
                                    />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Category Dropdown */}
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

            {/* Selected Item Charts */}
            {selectedItem && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    {/* Monthly */}
                    <div className="bg-white p-4 rounded-2xl shadow-md">
                        <h3 className="text-lg font-semibold text-red-600 mb-4 text-center">
                            {selectedItem.name} - Monthly (
                            {selectedItem.monthly}/{selectedItem.totalMonthly})
                        </h3>
                        <ResponsiveContainer width="100%" height={250}>
                            <PieChart>
                                <Pie
                                    data={getPieData(
                                        selectedItem.monthly,
                                        selectedItem.totalMonthly
                                    )}
                                    dataKey="value"
                                    nameKey="name"
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={80}
                                    label
                                >
                                    {getPieData(
                                        selectedItem.monthly,
                                        selectedItem.totalMonthly
                                    ).map((entry, index) => (
                                        <Cell
                                            key={`cell-month-${index}`}
                                            fill={COLORS[index % COLORS.length]}
                                        />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Yearly */}
                    <div className="bg-white p-4 rounded-2xl shadow-md">
                        <h3 className="text-lg font-semibold text-green-600 mb-4 text-center">
                            {selectedItem.name} - Yearly (
                            {selectedItem.yearly}/{selectedItem.totalYearly})
                        </h3>
                        <ResponsiveContainer width="100%" height={250}>
                            <PieChart>
                                <Pie
                                    data={getPieData(
                                        selectedItem.yearly,
                                        selectedItem.totalYearly
                                    )}
                                    dataKey="value"
                                    nameKey="name"
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={80}
                                    label
                                >
                                    {getPieData(
                                        selectedItem.yearly,
                                        selectedItem.totalYearly
                                    ).map((entry, index) => (
                                        <Cell
                                            key={`cell-year-${index}`}
                                            fill={COLORS[index % COLORS.length]}
                                        />
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
