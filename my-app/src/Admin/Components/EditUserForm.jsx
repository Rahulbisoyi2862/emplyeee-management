import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const roles = ["user", "admin"];
const MAX_FILE_SIZE = 150 * 1024; // 150KB

const EditUserForm = () => {

    const apiUrl =  import.meta.env.VITE_DOMIN
    console.log(apiUrl)

    const { id } = useParams();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        role: "user",
        password: "",
        pl: "",
        cl: "",
        position: "",
        pan: null,
        aadhar: null,
        others: [],
    });

    const [previews, setPreviews] = useState({
        pan: null,
        aadhar: null,
        others: [],
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const validateFileSize = (file) => {
        if (file.size > MAX_FILE_SIZE) {
            toast.error(`"${file.name}" exceeds 150KB limit.`);
            return false;
        }
        return true;
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;

        if (name === "others") {
            const validFiles = [...files].filter(validateFileSize);
            setFormData((prev) => ({ ...prev, others: validFiles }));
            const otherPreviews = validFiles.map((file) => URL.createObjectURL(file));
            setPreviews((prev) => ({ ...prev, others: otherPreviews }));
        } else {
            const file = files[0];
            if (!validateFileSize(file)) return;
            setFormData((prev) => ({ ...prev, [name]: file }));
            setPreviews((prev) => ({ ...prev, [name]: URL.createObjectURL(file) }));
        }
    };

    const validateForm = () => {
        const requiredFields = ["name", "email", "phone", "role", "position"];
        for (let field of requiredFields) {
            if (!formData[field]) {
                toast.error(`${field.charAt(0).toUpperCase() + field.slice(1)} is required.`);
                return false;
            }
        }

        if (formData.role === "user" && (!formData.pl || !formData.cl)) {
            toast.error("PL and CL are required for users.");
            return false;
        }

        if (!formData.password) {
            toast.error("Password is required.");
            return false;
        }

        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        const formDataToSend = new FormData();
        formDataToSend.append("name", formData.name);
        formDataToSend.append("email", formData.email);
        formDataToSend.append("phone", formData.phone);
        formDataToSend.append("role", formData.role);
        formDataToSend.append("password", formData.password);
        formDataToSend.append("pl", formData.pl);
        formDataToSend.append("cl", formData.cl);
        formDataToSend.append("position", formData.position);

        if (formData.pan) formDataToSend.append("panCard", formData.pan);
        if (formData.aadhar) formDataToSend.append("adharCard", formData.aadhar);
        if (formData.others.length > 0) {
            formData.others.forEach((file) => {
                formDataToSend.append("otherFile", file);
            });
        }

        try {
            const response = await fetch(`${apiUrl}/api/user/edit/${id}`, {
                method: 'POST',
                body: formDataToSend,
            });

            const result = await response.json();
            if (response.ok) {
                toast.success("User data updated successfully!");
            } else {
                toast.error(result.message || "Error updating user data.");
            }
        } catch (error) {
            toast.error("Something went wrong!");
        }
    };

    return (
        <div className="max-w-4xl mx-auto mt-10 bg-white p-10 rounded-2xl shadow-2xl border border-red-700">
            <h2 className="text-3xl font-bold text-red-700 mb-8 text-center">Edit User Details</h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                    <label className="block text-red-700 font-medium mb-1">User ID</label>
                    <input
                        type="text"
                        value={id}
                        readOnly
                        className="w-full px-4 py-2 border border-red-700 rounded-xl text-red-700 bg-gray-100"
                    />
                </div>

                {["name", "email", "phone"].map((field) => (
                    <div key={field}>
                        <label className="block text-red-700 font-medium mb-1 capitalize">{field}</label>
                        <input
                            name={field}
                            type="text"
                            value={formData[field]}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-red-700 rounded-xl text-red-700"
                        />
                    </div>
                ))}

                <div>
                    <label className="block text-red-700 font-medium mb-1">Position</label>
                    <input
                        name="position"
                        type="text"
                        value={formData.position}
                        onChange={handleChange}
                        placeholder="e.g. Software Engineer"
                        className="w-full px-4 py-2 border border-red-700 rounded-xl text-red-700"
                    />
                </div>

                <div>
                    <label className="block text-red-700 font-medium mb-1">Password</label>
                    <input
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-red-700 rounded-xl text-red-700"
                    />
                </div>

                <div>
                    <label className="block text-red-700 font-medium mb-1">Role</label>
                    <select
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-red-700 rounded-xl text-red-700 bg-white"
                    >
                        {roles.map((role) => (
                            <option key={role} value={role}>{role}</option>
                        ))}
                    </select>
                </div>

                {formData.role === "user" && (
                    <>
                        <div>
                            <label className="block text-red-700 font-medium mb-1">PL (Paid Leave)</label>
                            <input
                                name="pl"
                                type="number"
                                value={formData.pl}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-red-700 rounded-xl text-red-700"
                            />
                        </div>

                        <div>
                            <label className="block text-red-700 font-medium mb-1">CL (Casual Leave)</label>
                            <input
                                name="cl"
                                type="number"
                                value={formData.cl}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-red-700 rounded-xl text-red-700"
                            />
                        </div>
                    </>
                )}

                <div>
                    <label className="block text-red-700 font-medium mb-1">PAN Card</label>
                    <input
                        type="file"
                        name="pan"
                        accept=".jpg,.jpeg,.png,.pdf"
                        onChange={handleFileChange}
                        className="w-full text-red-700"
                    />
                    {previews.pan && (
                        <div className="mt-2">
                            {previews.pan.endsWith(".pdf") ? (
                                <a href={previews.pan} target="_blank" rel="noopener noreferrer">View PAN PDF</a>
                            ) : (
                                <img src={previews.pan} alt="PAN Preview" className="h-20 rounded mt-1" />
                            )}
                        </div>
                    )}
                </div>

                <div>
                    <label className="block text-red-700 font-medium mb-1">Aadhar Card</label>
                    <input
                        type="file"
                        name="aadhar"
                        accept=".jpg,.jpeg,.png,.pdf"
                        onChange={handleFileChange}
                        className="w-full text-red-700"
                    />
                    {previews.aadhar && (
                        <div className="mt-2">
                            {previews.aadhar.endsWith(".pdf") ? (
                                <a href={previews.aadhar} target="_blank" rel="noopener noreferrer">View Aadhar PDF</a>
                            ) : (
                                <img src={previews.aadhar} alt="Aadhar Preview" className="h-20 rounded mt-1" />
                            )}
                        </div>
                    )}
                </div>

                <div className="md:col-span-2">
                    <label className="block text-red-700 font-medium mb-1">Other Documents</label>
                    <input
                        type="file"
                        name="others"
                        multiple
                        accept=".jpg,.jpeg,.png,.pdf"
                        onChange={handleFileChange}
                        className="w-full text-red-700"
                    />
                    {previews.others.length > 0 && (
                        <div className="flex flex-wrap gap-4 mt-2">
                            {previews.others.map((url, i) => (
                                url.endsWith(".pdf") ? (
                                    <a key={i} href={url} target="_blank" rel="noopener noreferrer" className="text-red-700 underline">
                                        PDF {i + 1}
                                    </a>
                                ) : (
                                    <img key={i} src={url} alt={`Other ${i + 1}`} className="h-20 rounded" />
                                )
                            ))}
                        </div>
                    )}
                </div>

                <div className="md:col-span-2 flex justify-center mt-6">
                    <button
                        type="submit"
                        className="px-10 py-3 bg-red-700 text-white rounded-xl text-lg font-bold hover:bg-red-800 transition"
                    >
                        Save Changes
                    </button>
                </div>
                <ToastContainer />
            </form>
        </div>
    );
};

export default EditUserForm;