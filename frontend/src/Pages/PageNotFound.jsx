import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

export const PageNotFound = () => {

  useEffect(()=> {
        document.title = "PageNotFound";
      }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
      <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
      <p className="text-2xl text-gray-600 mb-6 text-center">Oops! The page you're looking for doesn't exist.</p>
      <Link
        to="/home"
        className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all duration-300"
      >
        Go to Home
      </Link>
    </div>
  );
};
