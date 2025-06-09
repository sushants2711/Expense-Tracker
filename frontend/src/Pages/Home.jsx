import React, { useEffect, useContext } from 'react';
import { FetchContext } from '../context_api/FetchContext';
import { AuthenticationContextAPi } from '../context_api/AuthenticationContextAPi';
import { useNavigate } from 'react-router-dom';
import { handleLogoutApi } from '../API/LogoutApi';
import { handleSuccess } from '../toast_message/successMessage';
import { handleError } from '../toast_message/errorMessage';
import { handleDeleteProductApi } from '../API/DeleteProductApi';
import { ToastContainer } from 'react-toastify';

export const Home = () => {

  useEffect(()=> {
        document.title = "Home-Page";
      }, []);

  const navigate = useNavigate();

  const { userName, fetchUserName, removeUserName } = useContext(AuthenticationContextAPi);

  const { data, fetchAlways, received, spent, remaining } = useContext(FetchContext);

  useEffect(() => {
    fetchAlways();
    fetchUserName();
  }, []);

  const handleUpdate = (id) => {
    navigate(`/update/${id}`)
  };

  const handleDelete = async (id) => {
    try {
      const result = await handleDeleteProductApi(id)
      
      const { success, message, error } = result;

      if (success) {
        handleSuccess(message);
        fetchAlways();
      }
      else if (!success) {
        handleError(message);
      }
      else {
        handleError(error);
      };
    } catch (error) {
      handleError(error.message);
    }
  };

  const handleLogout = async (e) => {
    e.preventDefault();

    const result = await handleLogoutApi();
    console.log(result);

    const { success, message, error } = result;

    if (success) {
      handleSuccess(message);
      removeUserName();

      setTimeout(() => {
        navigate("/logout");
      }, 1000);

    }
    else if (!success) {
      handleError(message);
    }
    else {
      handleError(error);
    };
  };

  const handleDeleteAccount = async (e) => {
    navigate("/delete/user-account");
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Top Bar with Greeting and Logout */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
        <h2 className="text-xl sm:text-2xl font-semibold text-blue-700">
          Hi! {userName || "User"}
        </h2>
        <div className='space-x-2'>
          <button
            onClick={handleDeleteAccount}
            className="mt-2 sm:mt-0 bg-red-500 text-white px-4 py-2 rounded-md text-sm hover:bg-red-600"
          >
            Delete Account
          </button>

          <button
            onClick={handleLogout}
            className="mt-2 sm:mt-0 bg-blue-500 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-600"
          >
            Logout
          </button>
        </div>
      </div>

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

      {/* Transactions Table */}
      <div className="overflow-x-auto bg-white rounded-xl shadow-md">
        <table className="min-w-full text-sm sm:text-base">
          <thead className="bg-gray-200 text-gray-700 text-left uppercase">
            <tr>
              <th className="py-3 px-4">Date</th>
              <th className="py-3 px-4">Title</th>
              <th className="py-3 px-4">Category</th>
              <th className="py-3 px-4">Amount</th>
              <th className="py-3 px-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {data?.length > 0 ? (
              data.map((item) => (
                <tr key={item._id} className="border-t hover:bg-gray-50">
                  <td className="py-2 px-4">{new Date(item.createdAt).toLocaleDateString()}</td>
                  <td className="py-2 px-4 capitalize">{item.title}</td>
                  <td className="py-2 px-4 capitalize">{item.category}</td>
                  <td className={`py-2 px-4 font-medium ${item.amount < 0 ? 'text-red-600' : 'text-green-700'}`}>
                    ₹ {item.amount}
                  </td>
                  <td className="py-2 px-4 space-x-2">
                    <button
                      onClick={() => handleUpdate(item._id)}
                      className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded text-xs"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="bg-red-400 hover:bg-red-500 text-white px-3 py-1 rounded text-xs"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-4 text-gray-500">
                  No data available
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
