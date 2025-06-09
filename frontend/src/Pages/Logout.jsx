import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

export const Logout = () => {

  useEffect(() => {
    document.title = "Logout-Page";
  }, []);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">You've been logged out</h2>
        <p className="text-gray-600 mb-6">Thank you for visiting. See you soon!</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="px-6 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition duration-300"
          >
            Go to Main Page
          </Link>
          <Link
            to="/login"
            className="px-6 py-2 rounded-xl border border-blue-600 text-blue-600 hover:bg-blue-100 transition duration-300"
          >
            Login Again
          </Link>
        </div>
      </div>
    </div>
  );
};
