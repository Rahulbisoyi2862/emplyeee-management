import { useState } from "react";

export default function MessagePage() {
  const [formData, setFormData] = useState({
    subject: "",
    message: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Message Sent:", formData);
    alert("Message Sent Successfully!");
  };

  return (
    <div className="flex  justify-center items-center h-[80vh] bg-gray-100 p-4">
      <div className="w-full max-w-lg p-6 shadow-lg rounded-2xl bg-white">
        <h2 className="text-2xl font-bold text-center mb-4">Send a Message</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="subject"
            placeholder="Subject"
            value={formData.subject}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-lg"
          />
          <textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-lg h-32"
          />
          <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">Send</button>
        </form>
      </div>
    </div>
  );
}
