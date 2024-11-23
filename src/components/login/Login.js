import React, { useState, useEffect } from "react";
import { handleLogin } from "../../controller/handleLoginController";
import { useNavigate } from "react-router-dom";
import {
  loadCaptchaEnginge,
  LoadCanvasTemplate,
  validateCaptcha,
} from "react-simple-captcha";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [userCaptchaInput, setUserCaptchaInput] = useState("");
  const [captchaError, setCaptchaError] = useState(false);

  // Initialize the captcha when the component mounts
  useEffect(() => {
    loadCaptchaEnginge(6); // Captcha length is 6
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();

    // Validate captcha
    if (!validateCaptcha(userCaptchaInput)) {
      setCaptchaError(true);
      return;
    }

    setCaptchaError(false);

    const loginResponse = await handleLogin(e, formData);

    if (loginResponse) {
      const { isAdmin, user } = loginResponse;
      if (isAdmin) {
        navigate(`/admin-dashboard`, { state: { user } });
      } else {
        navigate(`/user-dashboard`, { state: { user } });
      }
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 overflow-hidden">
      {/* Background circles for decoration */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-pink-300 opacity-30 rounded-full mix-blend-multiply filter blur-2xl animate-blob"></div>
      <div className="absolute top-0 right-0 w-72 h-72 bg-blue-300 opacity-30 rounded-full mix-blend-multiply filter blur-2xl animation-delay-2000"></div>
      <div className="absolute bottom-0 left-20 w-72 h-72 bg-purple-300 opacity-30 rounded-full mix-blend-multiply filter blur-2xl animation-delay-4000"></div>

      <div className="relative w-full max-w-md bg-white rounded-lg shadow-lg p-8 z-10">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Login
        </h2>

        <form onSubmit={onSubmit}>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-gray-700 font-medium mb-2"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Enter your username"
              onChange={(e) => {
                setFormData((prev) => ({
                  ...prev,
                  username: e.target.value,
                }));
              }}
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-gray-700 font-medium mb-2"
            >
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Enter your password"
              onChange={(e) => {
                setFormData((prev) => ({
                  ...prev,
                  password: e.target.value,
                }));
              }}
            />
            <div className="mt-2 flex items-center">
              <input
                type="checkbox"
                id="showPassword"
                className="mr-2"
                checked={showPassword}
                onChange={() => setShowPassword(!showPassword)}
              />
              <label htmlFor="showPassword" className="text-sm text-gray-700">
                Show Password
              </label>
            </div>
          </div>

          {/* Captcha Section */}
          <div className="mb-6">
            <label
              htmlFor="captcha"
              className="block text-gray-700 font-medium mb-2"
            >
              Enter Captcha
            </label>
            <LoadCanvasTemplate />
            <input
              type="text"
              id="captcha"
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Enter the captcha"
              value={userCaptchaInput}
              onChange={(e) => setUserCaptchaInput(e.target.value)}
            />
            {captchaError && (
              <p className="text-red-500 text-sm mt-2">
                Captcha is incorrect. Please try again.
              </p>
            )}
          </div>

          <div className="flex items-center justify-between mb-6">
            <a href="#" className="text-sm text-blue-600 hover:underline">
              Forgot Password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
