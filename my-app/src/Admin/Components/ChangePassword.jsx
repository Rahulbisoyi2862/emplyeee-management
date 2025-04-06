import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from "../../assets/logo.png";
import img from "../../assets/pexels-donaldtong94-23273.jpg";

const ChangePassword = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { oldPassword, newPassword, confirmNewPassword, email } = formData;

    if (!oldPassword || !newPassword || !confirmNewPassword || !email) {
      toast.error("All fields are required.");
      return;
    }

    if (newPassword !== confirmNewPassword) {
      toast.error("New password and confirm password must match.");
      return;
    }

    if (newPassword.length !== 8) {
      toast.error("New password must be exactly 8 characters long.");
      return;
    }

    try {
      const res = await fetch(`http://localhost:5000/api/password/change`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "❌ Server error occurred!");
        return;
      }

      toast.success("✅ Password changed successfully!");
      navigate("/Setting");
    } catch (err) {
      toast.error("❌ Network error! Please try again.");
      console.error("❌ Error updating archive:", err);
    }
  };

  return (
    <>
      <ToastContainer />
      <div
        className="w-full min-h-screen flex items-center justify-center font-sans p-2 md:p-4 relative overflow-hidden bg-cover bg-center"
        style={{ backgroundImage: `url("${img}")` }}
      >
        <div className="bg-white/10 backdrop-blur-lg px-2 py-4 md:px-12 md:py-10 rounded-[40px] shadow-lg w-full max-w-5xl flex flex-col md:flex-row border border-white/20 gap-4 md:gap-6">
          <div className="md:w-1/2 flex flex-col items-center justify-center text-white p-4 md:p-8 rounded-[30px] bg-gradient-to-br from-purple-500 to-blue-400 gap-4">
            <img
              src={logo}
              alt="Rocket"
              className="w-20 h-20 md:w-32 md:h-32 animate-bounce"
            />
      
          </div>

          <div className="md:w-1/2 bg-white/10 backdrop-blur-md rounded-[30px] px-4 md:px-6 py-6 md:py-8 flex flex-col justify-center gap-4 md:gap-5">
            <h2 className="text-white text-2xl md:text-3xl font-bold text-center">Change Password</h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-3 md:gap-4">
              {[ 
                {
                  name: "email",
                  type: "text",
                  placeholder: "Enter your Email",
                  value: formData.email,
                },
                {
                  name: "oldPassword",
                  type: showOldPassword ? "text" : "password",
                  toggle: () => setShowOldPassword(!showOldPassword),
                  show: showOldPassword,
                  placeholder: "Enter your old password",
                },
                {
                  name: "newPassword",
                  type: showNewPassword ? "text" : "password",
                  toggle: () => setShowNewPassword(!showNewPassword),
                  show: showNewPassword,
                  placeholder: "Enter your new password",
                },
                {
                  name: "confirmNewPassword",
                  type: showConfirmNewPassword ? "text" : "password",
                  toggle: () => setShowConfirmNewPassword(!showConfirmNewPassword),
                  show: showConfirmNewPassword,
                  placeholder: "Confirm your new password",
                },
              ].map((field, idx) => (
                <div key={idx} className="relative">
                  <input
                    type={field.type}
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleChange}
                    placeholder={field.placeholder}
                    className="w-full px-4 py-2 md:py-3 rounded-xl text-black outline-none"
                  />
                  {field.toggle && (
                    <button
                      type="button"
                      onClick={field.toggle}
                      className="absolute right-4 top-2.5 text-gray-700"
                    >
                      {field.show ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  )}
                </div>
              ))}

              <button
                type="submit"
                className="w-full bg-black text-white py-2.5 md:py-3 rounded-xl font-semibold"
              >
                Change Password
              </button>
            </form>

            <div className="flex justify-center gap-2 md:gap-4 pt-2">
              <div className="w-6 h-6 md:w-8 md:h-8 bg-white rounded-full" />
              <div className="w-6 h-6 md:w-8 md:h-8 bg-white rounded-full" />
              <div className="w-6 h-6 md:w-8 md:h-8 bg-white rounded-full" />
              <div className="w-6 h-6 md:w-8 md:h-8 bg-white rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChangePassword;