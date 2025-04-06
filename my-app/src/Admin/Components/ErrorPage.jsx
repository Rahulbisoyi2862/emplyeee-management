import { Link } from "react-router-dom";

export default function ErrorPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center bg-white p-10 shadow-lg rounded-2xl transform transition duration-500 hover:scale-105">
        <h1 className="text-6xl font-bold text-red-600 mb-4">404</h1>
        <p className="text-gray-600 text-lg mb-6">
          Oops! The page you're looking for doesn't exist.
        </p>
        <div className="flex gap-4 justify-center">
          <Link to="/">
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition duration-300">
              Go Back
            </button>
          </Link>
          <Link to="/login">
            <button className="bg-gray-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-gray-700 transition duration-300">
              Login
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
