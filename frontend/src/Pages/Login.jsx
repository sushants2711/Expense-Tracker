import React, { useContext, useEffect, useState } from 'react'
import { ToastContainer } from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom'
import { FaEnvelope, FaLock } from 'react-icons/fa';
import { handleError } from '../toast_message/errorMessage';
import { handleSuccess } from '../toast_message/successMessage';
import { AuthenticationContextAPi } from '../context_api/AuthenticationContextAPi';
import { handleLoginpApi } from '../API/LoginApi';




export const Login = () => {

  useEffect(() => {
    document.title = "Login"
  }, [])

  const navigate = useNavigate();

  const [formdata, setFormdata] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setFormdata({
      ...formdata,
      [name]: value
    });
  };

  const { fetchUserName } = useContext(AuthenticationContextAPi);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formdata.email || !formdata.password) {
      return handleError("All fields are required");
    };

    if (formdata.password.length < 8) {
      return handleError("Password length should be 8 characters long");
    };

    try {
      const result = await handleLoginpApi(formdata);

      const { success, message, name, email, error } = result;

      if (success) {
        handleSuccess(message);

        localStorage.setItem("name", name);
        localStorage.setItem("email", email);

        fetchUserName();

        setFormdata({
          email: "",
          password: ""
        });

        setTimeout(()=> {
          navigate("/home");
        }, 1000);
      }
      else if (!success) {
        handleError(message);
      }
      else if (error) {
        handleError(error)
      };
    } catch (error) {
      handleError(error.message);
    };
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full overflow-hidden flex flex-col md:flex-row">

          {/* Left Side Image */}
          <div className="md:w-1/2 w-full">
            <img
              src="expensePic.jpg"
              alt="Signup illustration"
              className="object-cover h-[500px] w-full"
            />
          </div>

          {/* Signup Form */}
          <div className="md:w-1/2 w-full p-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Login To Expense-Tracker</h2>

            <form className="space-y-5" onSubmit={handleSubmit}>


              {/* Email */}
              <div className="flex items-center border border-gray-300 rounded-md p-3 focus-within:ring-2 focus-within:ring-blue-500">
                <FaEnvelope className="text-gray-500 mr-3" />
                <input
                  type="email"
                  name='email'
                  placeholder="Email Address"
                  className="w-full outline-none bg-transparent"
                  onChange={handleChange}

                />
              </div>

              {/* Password */}
              <div className="flex items-center border border-gray-300 rounded-md p-3 focus-within:ring-2 focus-within:ring-blue-500">
                <FaLock className="text-gray-500 mr-3" />
                <input
                  type="password"
                  name='password'
                  placeholder="Password"
                  className="w-full outline-none bg-transparent"
                  onChange={handleChange}

                />
              </div>



              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-all duration-300">
                Login
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-gray-600">
              Don't have an account?{" "}
              <Link to="/signup" className="text-blue-600 hover:underline">
                signup
              </Link>
            </p>
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  )
}
