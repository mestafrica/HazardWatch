import React, { useState } from "react";
import logImage from "../assets/images/log.png";
import { Link, useNavigate } from "react-router-dom";
import { apiLogin } from "./services/auth";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login: React.FC = () => {
  const [usernameOrEmail, setUsernameOrEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const navigate = useNavigate();

  const handleSubmit = async (event: {
    preventDefault: () => void;
    target: HTMLFormElement | undefined;
  }) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const usernameOrEmail = formData.get("Username/Email");
    const password = formData.get("password");
    const response = await apiLogin({ usernameOrEmail, password });

    if (response.status === 200) {
      localStorage.setItem("token", response.data.accessToken);
    }

    if (response.status === 200) {
      localStorage.setItem("token", response.data.accessToken);
      toast.success("Login Successful");
      navigate("/dashboard");
    } else {
      toast.error("Invalid email or password");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="flex flex-col md:flex-row w-full max-w-4xl bg-white shadow-lg rounded-lg">
        <div className="w-full md:w-1/2 p-8 space-y-6">
          <h1 className="text-3xl font-bold mb-6 text-blue-700">
            Log in to <br />
            Ghana Hazard Reporter <br />
            Account
          </h1>
          <h1 className="text-sm">
            By completing this survey you are consenting to storing and <br />
            using your data to help us improve our services to you
          </h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="Email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                id="Email"
                type="text"
                value={usernameOrEmail}
                onChange={(e) => setUsernameOrEmail(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Enter your username or email"
                required
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Enter your password"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-black bg-[#E6FCF9] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Log In
            </button>
            <div className="flex items-center justify-between">
              <Link
                to="/password-recovery"
                className="text-sm text-blue-700 hover:underline"
              >
                Forgot your password?
              </Link>
              <Link
                to="/signup"
                className="text-sm text-blue-700 hover:underline"
              >
                Sign Up
              </Link>
            </div>
          </form>
        </div>
        <div className="hidden md:block md:w-1/2">
          <img
            src={logImage}
            alt="Log"
            className="object-cover w-full h-full rounded-r-lg"
          />
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
