import React, { useContext, useEffect, useState } from 'react';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { handleError } from '../toast_message/errorMessage';
import { handleSuccess } from '../toast_message/successMessage';
import { ToastContainer } from 'react-toastify';
import { handleSignupApi } from '../API/SignupApi';
import { AuthenticationContextAPi } from '../context_api/AuthenticationContextAPi';

export const Signup = () => {

  const { fetchUserName } = useContext(AuthenticationContextAPi);

  useEffect(() => {
    document.title = "signup"
  }, [])

  const navigate = useNavigate();

  const [signupForm, setSignupForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setSignupForm({
      ...signupForm,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, password, confirmPassword } = signupForm;

    if (!name || !email || !password || !confirmPassword) {
      return handleError("All fields are required");
    };

    if (password !== confirmPassword) handleError("Password not match");

    if (password.length < 8 || confirmPassword.length < 8) {
      return handleError("password length should be 8 characters long");
    };

    try {

      const result = await handleSignupApi(signupForm);
  
      const { success, message, error, name, email } = result;

      if (success) {
        handleSuccess(message);

        localStorage.setItem("name", name);
        localStorage.setItem("email", email);

        fetchUserName();

        setSignupForm({
          name: "",
          email: "",
          password: "",
          confirmPassword: ""
        });

        setTimeout(() => {
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
      handleError(error)
    }
  }
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
            <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Create an Account</h2>

            <form className="space-y-5" onSubmit={handleSubmit}>
              {/* Name */}
              <div className="flex items-center border border-gray-300 rounded-md p-3 focus-within:ring-2 focus-within:ring-blue-500">
                <FaUser className="text-gray-500 mr-3" />
                <input
                  type="text"
                  name='name'
                  placeholder="Full Name"
                  className="w-full outline-none bg-transparent"
                  onChange={handleChange}
                  value={signupForm.name}
                />
              </div>

              {/* Email */}
              <div className="flex items-center border border-gray-300 rounded-md p-3 focus-within:ring-2 focus-within:ring-blue-500">
                <FaEnvelope className="text-gray-500 mr-3" />
                <input
                  type="email"
                  name='email'
                  placeholder="Email Address"
                  className="w-full outline-none bg-transparent"
                  onChange={handleChange}
                  value={signupForm.email}
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
                  value={signupForm.password}
                />
              </div>

              {/* Confirm Password */}
              <div className="flex items-center border border-gray-300 rounded-md p-3 focus-within:ring-2 focus-within:ring-blue-500">
                <FaLock className="text-gray-500 mr-3" />
                <input
                  type="password"
                  name='confirmPassword'
                  placeholder="Confirm Password"
                  className="w-full outline-none bg-transparent"
                  onChange={handleChange}
                  value={signupForm.confirmPassword}
                />
              </div>

              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-all duration-300">
                Sign Up
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-gray-600">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-600 hover:underline">
                Login
              </Link>
            </p>
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  );
};
