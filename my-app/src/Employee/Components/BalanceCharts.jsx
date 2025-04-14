import React, { useState, useEffect } from "react";
import { useOutletContext } from "react-router";
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion"; // Import Framer Motion

const COLORS = ["#EF4444", "#10B981"]; // Red and Green

const ChartCard = ({ title, data, achieved, total, titleColor }) => (
    <motion.div
        className="bg-white rounded-xl shadow-lg p-6 w-full md:w-[45%]"
        initial={{ opacity: 0, y: 20 }} // Initial state (offscreen and invisible)
        animate={{ opacity: 1, y: 0 }}  // Animate to full opacity and position
        transition={{ duration: 0.6 }}  // Transition duration
    >
        <h3 className={`text-lg font-semibold mb-4 text-${titleColor}-600 text-center`}>
            {title} ({achieved}/{total})
        </h3>
        <ResponsiveContainer width="100%" height={250}>
            <PieChart>
                <Pie
                    data={data}
                    dataKey="value"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label
                >
                    {data.map((_, index) => (
                        <Cell key={index} fill={COLORS[index]} />
                    ))}
                </Pie>
                <Tooltip />
                <Legend
                    verticalAlign="bottom"
                    iconType="circle"
                    formatter={(value, entry, index) => (
                        <span className={`text-sm ${COLORS[index] === '#EF4444' ? 'text-red-600' : 'text-green-600'}`}>
                            {value}
                        </span>
                    )}
                />
            </PieChart>
        </ResponsiveContainer>
    </motion.div>
);

const TargetBalanceChart = () => {
    const [blanceLC, setBlanceLC] = useState(0);
    const [targetData, setTargetData] = useState(null);
    const context = useOutletContext();
    const { user } = context.users;

    const apiUrl =  import.meta.env.VITE_DOMIN
    console.log(apiUrl)

    // Fetch target data for the user
    useEffect(() => {
        const fetchTarget = async () => {
            try {
                const response = await fetch(`${apiUrl}/api/target/myDtl/${user.id}`);
                const data = await response.json();
                setTargetData(data);
                console.log("🎯 Target Data:", data);
            } catch (error) {
                console.error("❌ Error fetching target:", error);
            }
        };
        fetchTarget();
    }, [user.id]);

    // Fetch balance data for CL and PL
    useEffect(() => {
        if (user?.clBalance !== undefined && user?.plBalance !== undefined) {
            const balance = {
                clBalance: user.clBalance,
                plBalance: user.plBalance
            };
            setBlanceLC(balance);
            console.log(blanceLC, 'Balance Data');
        }
    }, [user]);

    // Calculate total achieved gold and diamond from archives
    const calculateArchives = (archives) => {
        let totalGold = 0;
        let totalDiamond = 0;

        archives.forEach(archive => {
            totalGold += archive.archiveGold || 0;
            totalDiamond += archive.archiveDiamond || 0;
        });

        return { totalGold, totalDiamond };
    };

    const { totalGold, totalDiamond } = targetData?.target?.archives ? calculateArchives(targetData.target.archives) : { totalGold: 0, totalDiamond: 0 };

    const target = {
        achieved: totalGold + totalDiamond, // Combined achieved value (gold + diamond)
        total: targetData?.target?.targetGold + targetData?.target?.targetDiamond || 0
    };

    const plBalance = {
        achieved: blanceLC.plBalance,
        total: targetData?.user?.totalPl || 0,
    };

    const clBalance = {
        achieved: blanceLC.clBalance,
        total: targetData?.user?.totalCl || 0
    };

    // Chart data for Gold
    const getGoldData = (achieved, total) => [
        { name: "Achieved", value: achieved },
        { name: "Remaining", value: Math.max(total - achieved, 0) }
    ];

    // Chart data for Diamond
    const getDiamondData = (achieved, total) => [
        { name: "Achieved", value: achieved },
        { name: "Remaining", value: Math.max(total - achieved, 0) }
    ];

    return (
        <motion.div
            className="max-w-5xl mx-auto px-4 py-8"
            initial={{ opacity: 0 }} // Initial state (invisible)
            animate={{ opacity: 1 }} // Animate to full opacity
            transition={{ duration: 0.8 }}  // Transition duration
        >
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                {/* Gold Pie Chart */}
                <motion.div
                    className="w-full bg-white shadow-md rounded-xl p-6 mb-8"
                    initial={{ opacity: 0, x: -50 }} // Initial state (slide in from left)
                    animate={{ opacity: 1, x: 0 }}    // Animate to full opacity and position
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="text-xl font-bold text-center text-yellow-600 mb-4">
                        🎯 Gold Target ({totalGold}/{targetData?.target?.targetGold})
                    </h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={getGoldData(totalGold, targetData?.target?.targetGold)}
                                dataKey="value"
                                cx="50%"
                                cy="50%"
                                outerRadius={100}
                                label
                            >
                                <Cell fill="#FFD700" /> {/* Gold color */}
                                <Cell fill="#10B981" />
                            </Pie>
                            <Tooltip />
                            <Legend
                                verticalAlign="bottom"
                                iconType="circle"
                                formatter={(value, entry, index) => (
                                    <span className={`text-sm ${COLORS[index] === '#EF4444' ? 'text-red-600' : 'text-green-600'}`}>
                                        {value}
                                    </span>
                                )}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                </motion.div>

                {/* Diamond Pie Chart */}
                <motion.div
                    className="w-full bg-white shadow-md rounded-xl p-6 mb-8"
                    initial={{ opacity: 0, x: 50 }} // Initial state (slide in from right)
                    animate={{ opacity: 1, x: 0 }}    // Animate to full opacity and position
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="text-xl font-bold text-center text-blue-600 mb-4">
                        🎯 Diamond Target ({totalDiamond}/{targetData?.target?.targetDiamond})
                    </h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={getDiamondData(totalDiamond, targetData?.target?.targetDiamond)}
                                dataKey="value"
                                cx="50%"
                                cy="50%"
                                outerRadius={100}
                                label
                            >
                                <Cell fill="#1E90FF" /> {/* Blue color for Diamond */}
                                <Cell fill="#10B981" />
                            </Pie>
                            <Tooltip />
                            <Legend
                                verticalAlign="bottom"
                                iconType="circle"
                                formatter={(value, entry, index) => (
                                    <span className={`text-sm ${COLORS[index] === '#EF4444' ? 'text-red-600' : 'text-green-600'}`}>
                                        {value}
                                    </span>
                                )}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                </motion.div>
            </div>

            {/* PL and CL charts */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                <ChartCard
                    title="PL Balance"
                    data={getGoldData(blanceLC.plBalance, targetData?.user?.totalPl)}
                    achieved={blanceLC.plBalance}
                    total={targetData?.user?.totalPl}
                    titleColor="green"
                />
                <ChartCard
                    title="CL Balance"
                    data={getGoldData(blanceLC.clBalance, targetData?.user?.totalCl)}
                    achieved={blanceLC.clBalance}
                    total={targetData?.user?.totalCl}
                    titleColor="green"
                />
            </div>
        </motion.div>
    );
};

export default TargetBalanceChart;
