import React from "react";
import logo from "../assets/Logo.png"; // 👈 yahan apna logo path lagao
import { useNavigate } from "react-router";

const WelcomePage = () => {
    const navigate = useNavigate()
    return (
        <div className="min-h-screen  flex flex-col items-center justify-center p-6">
            {/* Header with Logo */}
            <header className="flex items-center gap-4 mb-10">
                <img
                    src={logo}
                    alt="Company Logo"
                    className="w-12 h-12 rounded-xl shadow-md"
                />
                <h1 className="text-3xl sm:text-4xl font-bold text-red-700">
                    Welcome to Your Company
                </h1>
            </header>

            {/* Welcome Message */}
            <div className="bg-white border border-red-200 rounded-2xl shadow-lg p-8 max-w-2xl text-center">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                    We are thrilled to have you onboard!
                </h2>
                <p className="text-gray-600 text-lg">
                    At <span className="font-semibold text-red-600">Your Company</span>, we believe in innovation, dedication,
                    and creating a space where every member of our team can thrive.
                </p>
                <p className="text-gray-500 mt-4">
                    Explore our platform, manage your work efficiently, and grow with us.
                </p>

            </div>
        </div>
    );
};

export default WelcomePage;
