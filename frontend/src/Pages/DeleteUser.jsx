import React, { useContext, useEffect, useState } from 'react';
import { handleError } from '../toast_message/errorMessage';
import { deleteUserApi } from '../API/UserDeleteApi';
import { ToastContainer } from 'react-toastify';
import { handleSuccess } from '../toast_message/successMessage';
import { AuthenticationContextAPi } from '../context_api/AuthenticationContextAPi';
import { useNavigate } from 'react-router-dom';

export const DeleteUser = () => {

  useEffect(() => {
    document.title = "Delete-Account-Page";
  }, []);

  const { removeUserName } = useContext(AuthenticationContextAPi);

  const navigate = useNavigate();

  const [data, setData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setData({
      ...data,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!data.name || !data.email || !data.password) {
      return handleError("All fields are required")
    }

    if (data.password < 8) {
      return handleError("Password at least 8 Characters long");
    };

    try {
      const result = await deleteUserApi(data);

      const { success, message, error } = result;

      if (success) {
        handleSuccess(message);
        removeUserName();
        setTimeout(() => {
          navigate("/");
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
        <h2 className="text-2xl font-bold text-center text-red-600 mb-6">
          Delete Account
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name" className="block mb-1 text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              id="name"
              name='name'
              value={data.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
            />
          </div>

          <div>
            <label htmlFor="email" className="block mb-1 text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name='email'
              value={data.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
            />
          </div>

          <div>
            <label htmlFor="password" className="block mb-1 text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              name='password'
              value={data.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
          >
            Delete Account
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};
