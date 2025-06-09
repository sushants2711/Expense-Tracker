import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';

export const LogoPage = () => {

  useEffect(()=> {
        document.title = "Logo-Page";
      }, []);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-6 py-4 shadow-md bg-gray-100">
        <h1 className="text-2xl font-bold text-blue-700">Expense Tracker</h1>
        <div className="space-x-4">
          <NavLink
            to="/login"
            className="text-blue-600 font-medium hover:underline"
          >
            Login
          </NavLink>
          <NavLink
            to="/signup"
            className="text-blue-600 font-medium hover:underline"
          >
            Signup
          </NavLink>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex flex-col md:flex-row items-center justify-between flex-1 px-8 py-10 bg-gradient-to-r from-blue-100 to-white">
        {/* Image */}
        <div className="md:w-1/2 mb-8 md:mb-0">
          <img
            src="https://cdn-icons-png.flaticon.com/512/9011/9011490.png"
            alt="Expense Tracker Illustration"
            className="w-full max-w-md mx-auto"
          />
        </div>

        {/* Text */}
        <div className="md:w-1/2 text-center md:text-left">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Why Use an Expense Tracker?
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            Managing your expenses helps you understand your spending habits,
            stay within budget, and save more effectively. An expense tracker
            gives you control over your finances and helps you achieve your
            financial goals faster.
          </p>
        </div>
      </main>
    </div>
  );
};
