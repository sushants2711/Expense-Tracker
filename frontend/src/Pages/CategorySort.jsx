import React, { useEffect, useState, useContext } from 'react';
import { handleSuccess } from '../toast_message/successMessage';
import { handleError } from '../toast_message/errorMessage';
import { ToastContainer } from 'react-toastify';
import { FetchContext } from '../context_api/FetchContext';
import { categorySortAsc } from '../API/categorySort';


export const CategorySort = () => {

  useEffect(() => {
    document.title = "Category-Page";
  }, []);

  const [data, setData] = useState([]);

  const { received, spent, remaining, fetchAlways } = useContext(FetchContext);

  const handleAsc = async () => {
    try {
      const result = await categorySortAsc();
      const { success, data, error, message } = result;

      if (success) {
        handleSuccess(message);
        setData(data);
        // fetchAlways();
      } else {
        handleError(message || error);
      }
    } catch (error) {
      handleError(error.message);
    }
  };

  useEffect(() => {
    handleAsc();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Heading */}
      <h2 className="text-xl sm:text-2xl font-semibold text-blue-700 mb-6">
        Expenses Sorted by Category(Ascending)
      </h2>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <div className="bg-green-100 p-4 rounded-xl shadow-md">
          <h3 className="text-sm sm:text-base font-semibold">Money Received</h3>
          <p className="text-xl sm:text-2xl font-bold text-green-700">₹ {received}</p>
        </div>
        <div className="bg-red-100 p-4 rounded-xl shadow-md">
          <h3 className="text-sm sm:text-base font-semibold">Money Spent</h3>
          <p className="text-xl sm:text-2xl font-bold text-red-700">₹ -{spent}</p>
        </div>
        <div className="bg-blue-100 p-4 rounded-xl shadow-md">
          <h3 className="text-sm sm:text-base font-semibold">Remaining</h3>
          <p className="text-xl sm:text-2xl font-bold text-blue-700">₹ {remaining}</p>
        </div>
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto bg-white rounded-xl shadow-md border">
        <table className="min-w-full text-sm sm:text-base">
          <thead className="bg-gray-100 text-gray-700 uppercase text-xs sm:text-sm">
            <tr>
              <th className="py-3 px-4 text-left">Date</th>
              <th className="py-3 px-4 text-left">Title</th>
              <th className="py-3 px-4 text-left">Category</th>
              <th className="py-3 px-4 text-left">Amount</th>
            </tr>
          </thead>
          <tbody>
            {data?.length > 0 ? (
              data.map((item) => (
                <tr key={item._id} className="border-t hover:bg-gray-50">
                  <td className="py-2 px-4">{new Date(item.createdAt).toLocaleDateString()}</td>
                  <td className="py-2 px-4 capitalize">{item.title}</td>
                  <td className="py-2 px-4 capitalize">{item.category}</td>
                  <td
                    className={`py-2 px-4 font-semibold ${item.amount < 0 ? 'text-red-600' : 'text-green-700'
                      }`}
                  >
                    ₹ {item.amount}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="py-4 text-center text-gray-500">
                  No expense data found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <ToastContainer />
    </div>
  );
};
