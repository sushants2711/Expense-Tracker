import React, { useEffect, useState } from 'react';
import { handleCreateApi } from '../API/CreateApi';
import { handleSuccess } from '../toast_message/successMessage';
import { ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { handleError } from '../toast_message/errorMessage';

export const CreateExpenseForm = () => {

  useEffect(()=> {
        document.title = "Create-Expense-Page";
      }, []);

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    category: '',
    amount: '',
  });

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setFormData({
      ...formData,
      [name]: value
    });
  };;


  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!formData.title || !formData.category || !formData.amount) {
      return handleError("All fields are required");
    };

    if (formData.amount === 0 || formData.amount === "0" ) {
      return handleError("Amount not equal to zero");
    };

    try {
      const result = await handleCreateApi(formData);

      const { success, message, error } = result;

      if (success) {
        handleSuccess(message);

        setFormData({
          title: "",
          category: "",
          amount: ""
        });

        setTimeout(() => {
          navigate("/home");
        }, 1000);
      }
      else if (!success) {
        handleError(message);
      }
      else {
        handleError(error);
      };
    } catch (error) {
      handleError(error.message);
    };
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-semibold text-center mb-6 text-blue-600">Create Expense</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title Field */}
          <div>
            <label className="block text-gray-700 font-medium mb-1" htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter your title"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Category Field */}
          <div>
            <label className="block text-gray-700 font-medium mb-1" htmlFor="category">Category</label>
            <input
              type="text"
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              placeholder="Enter your category"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Amount Field */}
          <div>
            <label className="block text-gray-700 font-medium mb-1" htmlFor="amount">Amount (₹)</label>
            <input
              type="number"
              id="amount"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              placeholder="Enter your amount"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
          >
            Add Expense
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};
