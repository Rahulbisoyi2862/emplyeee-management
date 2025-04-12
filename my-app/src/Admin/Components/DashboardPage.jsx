import React, { useState, useEffect, useMemo } from "react";
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";
import { ChevronDown } from "lucide-react";

const COLORS = ["#ef4444", "#10b981", "#f59e0b", "#3b82f6"];

const DashboardPage = () => {
    // Current month and year dynamically calculated
    const currentDate = new Date();
    const currentMonth = String(currentDate.getMonth() + 1).padStart(2, "0");  // Get current month (01-12)
    const currentYear = String(currentDate.getFullYear());  // Get current year (e.g., 2025)

    const [fetchedItemData, setFetchedItemData] = useState({
        goldMonthly: { achieved: 0, target: 0 },
        diamondMonthly: { achieved: 0, target: 0 },
        goldYearly: { achieved: 0, target: 0 },
        diamondYearly: { achieved: 0, target: 0 },
    });

    const [totalStore, setTotalStore] = useState({
        goldMonthly: { achieved: 0, target: 0 },
        diamondMonthly: { achieved: 0, target: 0 },
        goldYearly: { achieved: 0, target: 0 },
        diamondYearly: { achieved: 0, target: 0 },
    });

    const [selectedItem, setSelectedItem] = useState(null);
    const [selectedMonth, setSelectedMonth] = useState(currentMonth); // Default to current month
    const [selectedYear, setSelectedYear] = useState(currentYear); // Default to current year
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const fetchCounterData = async (counterName, month, year) => {
        try {
            const response = await fetch(
                `http://localhost:5000/api/counter-data/${counterName}?month=${month}&year=${year}`
            );
            const data = await response.json();

            if (!Array.isArray(data)) {
                console.error("Expected array from API, got:", data);
                return;
            }

            let archiveGold = 0;
            let archiveDiamond = 0;
            let targetGold = 0;
            let targetDiamond = 0;

            data.forEach((entry) => {
                targetGold += entry.targetGold || 0;
                targetDiamond += entry.targetDiamond || 0;

                entry.archives?.forEach((archive) => {
                    archiveGold += archive.archiveGold || 0;
                    archiveDiamond += archive.archiveDiamond || 0;
                });
            });

            const formattedData = {
                goldMonthly: { achieved: archiveGold, target: targetGold },
                diamondMonthly: { achieved: archiveDiamond, target: targetDiamond },
                goldYearly: { achieved: archiveGold, target: targetGold },
                diamondYearly: { achieved: archiveDiamond, target: targetDiamond },
            };

            console.log("Formatted Fetched Data:", formattedData);
            setFetchedItemData(formattedData);
        } catch (error) {
            console.error("Error fetching counter data:", error);
        }
    };

    useEffect(() => {
        const fetchStoreData = async () => {
            try {
                const response = await fetch(
                    `http://localhost:5000/api/store-data?month=${selectedMonth}&year=${selectedYear}`
                );
                const data = await response.json();
                setTotalStore(data);
            } catch (error) {
                console.error("Failed to fetch store data", error);
            }
        };

        fetchStoreData();
    }, [selectedMonth, selectedYear]);  // Trigger re-fetch on month/year change

    const handleMonthChange = (e) => {
        setSelectedMonth(e.target.value);
    };

    const handleYearChange = (e) => {
        setSelectedYear(e.target.value);
    };

    useEffect(() => {
        if (selectedItem) {
            fetchCounterData(selectedItem.name, selectedMonth, selectedYear);
        }
    }, [selectedItem, selectedMonth, selectedYear]);

    const getPieData = (achieved, target) => [
        { name: "Achieved", value: achieved },
        { name: "Remaining", value: Math.max(0, target - achieved) },
    ];

    const items = useMemo(
        () => [
            { name: "Bangle" },
            { name: "Chain" },
            { name: "Necklace" },
            { name: "PR" },
            { name: "Diamond" },
        ],
        []
    );

    return (
        <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-800">Dashboard</h2>
                <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow">
                    {/* Month Dropdown */}
                    <select
                        value={selectedMonth}
                        onChange={handleMonthChange}
                        className="outline-none text-sm text-gray-700"
                    >
                        <option value="01">January</option>
                        <option value="02">February</option>
                        <option value="03">March</option>
                        <option value="04">April</option>
                        <option value="05">May</option>
                        <option value="06">June</option>
                        <option value="07">July</option>
                        <option value="08">August</option>
                        <option value="09">September</option>
                        <option value="10">October</option>
                        <option value="11">November</option>
                        <option value="12">December</option>
                    </select>

                    {/* Year Dropdown */}
                    <select
                        value={selectedYear}
                        onChange={handleYearChange}
                        className="outline-none text-sm text-gray-700"
                    >
                        <option value={currentYear}>{currentYear}</option>
                        <option value="2024">2024</option>
                        <option value="2023">2023</option>
                    </select>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[ 
                    { title: "Monthly Store Gold", key: "goldMonthly", color: "text-yellow-600" },
                    { title: "Monthly Store Diamond", key: "diamondMonthly", color: "text-blue-600" },
                    { title: "Yearly Store Gold", key: "goldYearly", color: "text-yellow-600" },
                    { title: "Yearly Store Diamond", key: "diamondYearly", color: "text-blue-600" },
                ].map(({ title, key, color }, idx) => (
                    <div key={idx} className="bg-white p-4 rounded-2xl shadow-md">
                        <h3 className={`text-lg font-semibold ${color} mb-4 text-center`}>
                            {title} ({totalStore[key].achieved}/{totalStore[key].target})
                        </h3>
                        <ResponsiveContainer width="100%" height={250}>
                            <PieChart>
                                <Pie
                                    data={getPieData(totalStore[key].achieved, totalStore[key].target)}
                                    dataKey="value"
                                    nameKey="name"
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={80}
                                    label
                                >
                                    {getPieData(totalStore[key].achieved, totalStore[key].target).map((entry, i) => (
                                        <Cell key={`${key}-${i}`} fill={COLORS[i % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                ))}
            </div>

            {/* Category Selector Dropdown */}
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
                                    setFetchedItemData({
                                        goldMonthly: { achieved: 0, target: 0 },
                                        diamondMonthly: { achieved: 0, target: 0 },
                                        goldYearly: { achieved: 0, target: 0 },
                                        diamondYearly: { achieved: 0, target: 0 },
                                    });
                                    fetchCounterData(item.name, selectedMonth, selectedYear);
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

            {/* Counter Data Display for Selected Item */}
            {selectedItem && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    {[ 
                        { label: "Monthly Gold", key: "goldMonthly", color: "text-yellow-600" },
                        { label: "Monthly Diamond", key: "diamondMonthly", color: "text-blue-600" },
                        { label: "Yearly Gold", key: "goldYearly", color: "text-yellow-600" },
                        { label: "Yearly Diamond", key: "diamondYearly", color: "text-blue-600" },
                    ].map(({ label, key, color }, index) => {
                        const achieved = fetchedItemData[key].achieved;
                        const target = fetchedItemData[key].target;

                        return (
                            <div key={index} className="bg-white p-4 rounded-2xl shadow-md">
                                <h3 className={`text-lg font-semibold ${color} mb-4 text-center`}>
                                    {selectedItem.name} - {label} ({achieved}/{target})
                                </h3>
                                <ResponsiveContainer width="100%" height={250}>
                                    <PieChart>
                                        <Pie
                                            data={getPieData(achieved, target)}
                                            dataKey="value"
                                            nameKey="name"
                                            cx="50%"
                                            cy="50%"
                                            outerRadius={80}
                                            label
                                        >
                                            {getPieData(achieved, target).map((entry, i) => (
                                                <Cell key={`${label}-${i}`} fill={COLORS[i % COLORS.length]} />
                                            ))}
                                        </Pie>
                                        <Tooltip />
                                        <Legend />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default DashboardPage;
