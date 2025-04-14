import React, { useState, useEffect } from 'react';
import { FileText } from 'lucide-react';  // Import Google Sheet icon from lucide-react

// Loader animation for no data available
const NoDataAnimation = () => (
  <div className="flex flex-col justify-center items-center h-full space-y-4">
    <div className="relative w-24 h-24">
      {/* Pulse circle animation */}
      <div className="animate-pulse absolute w-full h-full bg-gray-300 rounded-full"></div>
      
      {/* Google Sheet Icon inside the pulse circle */}
      <FileText size={40} className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-red-500" />
    </div>
    <p className="text-xl text-gray-600 font-semibold">Oops! No Data Available</p>
    <div className="mt-4">
      <span className="text-sm text-gray-500">Please try again later.</span>
    </div>
  </div>
);

const StockDetailPage = () => {
  // States to handle Google Sheet URL, loading, and error states
  const [sheetUrl, setSheetUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const apiUrl =  import.meta.env.VITE_DOMIN
  console.log(apiUrl)

  // Fetch the sheet URL from the backend on component mount
  useEffect(() => {
    const fetchSheetUrl = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/google/get`);

        if (response.ok) {
          const data = await response.json();

          if (data.message && data.message.length > 0) {
            setSheetUrl(data.message[0].googleSheetUrl);  // Set the URL if available
          } else {
            setSheetUrl("");  // Set empty if no data
          }
        } else {
          setError(true);  // Set error if response is not ok
        }
      } catch (error) {
        console.error("Error fetching Google Sheet URL:", error);
        setError(true); // Set error state if something goes wrong
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchSheetUrl();
  }, []); // Empty dependency array, so this runs only once when the component mounts

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100 py-3">
      <div className="bg-white rounded-lg shadow-lg w-full h-full max-w-none p-0">
        {/* If Loading */}
        {loading && (
          <div className="flex justify-center items-center h-full">
            <div className="animate-spin border-t-4 border-red-500 border-solid w-16 h-16 rounded-full"></div>
          </div>
        )}

        {/* If No Data Available */}
        {!loading && !error && !sheetUrl && (
          <NoDataAnimation />
        )}

        {/* If There is Error */}
        {error && (
          <div className="text-center text-xl text-red-500 bg-white p-5 rounded-md shadow-md">
            <p>Something went wrong, please try again later.</p>
          </div>
        )}

        {/* Display Google Sheet iFrame */}
        {!loading && !error && sheetUrl && (
          <iframe
            src={sheetUrl}
            width="100%"  // Full width
            height="100%" // Full height
            className="rounded-lg shadow-lg"
            title="Stock Data"
          ></iframe>
        )}
      </div>
    </div>
  );
};

export default StockDetailPage;
