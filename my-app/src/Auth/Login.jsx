import React, { useState } from "react";
import { useNavigate } from "react-router";
import { toast, ToastContainer } from "react-toastify";
import { Eye, EyeOff } from "lucide-react";
import img from "../assets/pexels-donaldtong94-23273.jpg";
import logo from ".././assets/Logo.png";

const Login = () => {
  
  const apiUrl =  import.meta.env.VITE_DOMIN
  console.log(apiUrl)

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await fetch(`${apiUrl}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.status === 200) {
        navigate("/");
        setLoading(true);
      }

      if (res.status === 403) {
        toast.success(data.message || "Login failed");
        navigate("/employee");
        setLoading(true);
      }

      if (res.status === 400) {
        toast.error(data.message || "Invalid credentials");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="w-full min-h-screen flex items-center justify-center font-sans p-4 relative overflow-hidden bg-cover bg-center"
      style={{ backgroundImage: `url("${img}")` }}
    >
      <div className="bg-white/10 backdrop-blur-lg px-4 py-6 md:px-12 md:py-10 rounded-[40px] shadow-lg w-full max-w-5xl flex flex-col md:flex-row border border-white/20 gap-6">
        {/* Left Side */}
        <div className="md:w-1/2 flex flex-col items-center justify-center text-white p-8 rounded-[30px] bg-gradient-to-br from-purple-500 to-blue-400 gap-4">
          <img
            src={logo}
            alt="Rocket"
            className="w-24 h-24 md:w-32 md:h-32 animate-bounce"
          />
       
        </div>

        {/* Right Side */}
        <div className="md:w-1/2 bg-white/10 backdrop-blur-md rounded-[30px] px-6 py-8 flex flex-col justify-center gap-5">
          <h2 className="text-white text-3xl font-bold text-center">Sign In</h2>

          <input
            type="text"
            placeholder="Username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-xl outline-none text-black"
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl outline-none text-black"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-3 text-gray-700"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <button
            onClick={handleLogin}
            className="w-full bg-black text-white py-3 rounded-xl font-semibold"
          >
            Sign in
          </button>

          <div className="flex justify-center gap-4 pt-2">
            <div className="w-8 h-8 bg-white rounded-full" />
            <div className="w-8 h-8 bg-white rounded-full" />
            <div className="w-8 h-8 bg-white rounded-full" />
            <div className="w-8 h-8 bg-white rounded-full" />
          </div>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default Login;
