import React from 'react'
import logo from ".././assets/Logo.png"; 
const BtnPage = () => {
    const buttons = [
        { label: "Visit web.stre.in", url: "https://web.stre.in" },
        { label: "Visit store.in", url: "https://store.in" },
        { label: "Visit dimon.store.in", url: "https://dimon.store.in" },
      ];
    
      return (
        <div className="min-h-screen bg-gradient-to-br from-rose-100 to-pink-200 flex items-center justify-center px-4">
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden w-full max-w-4xl md:flex">
            
            {/* Left Image */}
            <div className="md:w-1/2 w-full">
              <img
                src={logo}
                alt="Website Preview"
                className="w-full h-full object-cover"
              />
            </div>
    
            {/* Right Buttons */}
            <div className="md:w-1/2 w-full p-8 flex flex-col justify-center space-y-5">
              <h2 className="text-3xl font-bold text-red-700 text-center">Choose Your Platform</h2>
    
              {buttons.map((btn, index) => (
                <a
                  key={index}
                  href={btn.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-red-700 hover:bg-red-800 text-white font-medium py-3 rounded-xl transition duration-300 text-center"
                >
                  {btn.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      );
}

export default BtnPage
