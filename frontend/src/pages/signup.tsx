import React, { useState } from "react";
import { signupImg } from "../assets";
import { MoveRight, Eye, EyeOff } from "lucide-react";

const SignUp: React.FC = () => {
  const [fullName, setFullName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Full Name:", fullName);
    console.log("Email:", email);
    console.log("Password:", password);
    console.log("Confirm Password:", confirmPassword);
  };

  return (
    <div className="flex items-center justify-between mx-48">
      <div className="w-1/2 mx-10 h-screen">
        <div className="mb-5">
          <h4 className="text-#0E21CF font-bold text-[35px]">
            Sign Up to <br /> Ghana Hazard Reporter
          </h4>
          <p className="font-light text-[15px] leading-[23px]">
            In a world where environmental challenges and economic
            sustainability go hand in hand
          </p>
        </div>

        <div className="mb-10">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="fullName"
                className="block text-sm font-medium text-gray-700"
              >
                Full Name
              </label>
              <input
                id="fullName"
                type="text"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none bg-#ECECEC focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Enter full name"
                required
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                className="mt-1 block w-full px-3 py-2 border bg-#ECECEC border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Enter your email address"
                required
              />
            </div>

            <div className="relative">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                id="password"
                type={passwordVisible ? "text" : "password"}
                className="mt-1 block w-full px-3 py-2 border bg-#ECECEC border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Enter password"
                required
              />
              <button
                type="button"
                onClick={() => setPasswordVisible(!passwordVisible)}
                className="absolute inset-y-0 right-0 flex items-center pt-7 pr-3"
              >
                {passwordVisible ? <Eye /> : <EyeOff />}
              </button>
            </div>

            <div className="relative">
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700"
              >
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type={confirmPasswordVisible ? "text" : "password"}
                className="mt-1 block w-full px-3 py-2 border bg-#ECECEC border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Confirm password"
                required
              />
              <button
                type="button"
                onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
                className="absolute inset-y-0 right-0 flex items-center pt-7 pr-3"
              >
                {confirmPasswordVisible ? <Eye /> : <EyeOff />}
              </button>
            </div>

            <button
              type="submit"
              className="w-full py-2 mb-10 px-4 border border-transparent rounded-md shadow-sm text-base font-medium bg- #E6FCF9 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Sign up
            </button>
          </form>
          <p>___________________________or__________________________________</p>

          <div className="flex flex-row">
            <span className="px-8">Already have an account?</span>
            <a href="" className="flex flex-row px-8">
              Log in <MoveRight />
            </a>
          </div>
          <div className="font-light text-[14px] leading-[23px]">
            <p className="mt-14">
              By signing in to this platform you agree with our Terms of Use and
              Privacy Policy
            </p>
            <div className="flex flex-row space-x-5">
              <a href="">Help</a>
              <a href="">Privacy</a>
              <a href="">Terms</a>
            </div>
          </div>
        </div>
      </div>

      <img src={signupImg} alt="" className="w-[460px] h-fit" />
    </div>
  );
};

export default SignUp;
