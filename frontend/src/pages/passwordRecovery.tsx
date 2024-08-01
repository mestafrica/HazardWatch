import React, { useState, FormEvent, ChangeEvent } from "react";
import RecoverImage from "./../assets/images/recovery.png";
import { Link } from "react-router-dom";

const PasswordRecovery: React.FC = () => {
  const [email, setEmail] = useState<string>("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log("Forget password request submitted for email:", email);
    
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  return (
    <div className="flex ">
      <div className="w-1/2  p-20 text-left mt-28">
        <h2 className="text-2xl font-semibold mb-6 text-blue-700">Password Recovery</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full p-4 border rounded-md"
              placeholder="Enter email address"
              value={email}
              onChange={handleEmailChange}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-4 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue relative"
          >
            Send Recovery Link
          </button>
        </form>
        <div className="mt-36">
          <p className="text-sm font-light text-black text-[12px]">
            By signing in to this platform you agree with our{" "}
            <Link to="" className="font-medium text-primary-600 hover:underline">
              Terms of Use and Privacy Policy
            </Link>
          </p>
          <p>
            <Link to="" className="font-small text-primary-600 hover:underline text-[12px] pr-7">Help</Link>{" "}
            <Link to="" className="font-small text-primary-600 hover:underline text-[12px] pr-7">Privacy</Link>{" "}
            <Link to="" className="font-small text-primary-600 text-[12px] hover:underline">Terms</Link>
          </p>
        </div>
      </div>
      <div className="w-1/2">
        <img src={RecoverImage} alt="recover image" className="w-full h-screen" />
      </div>
    </div>
  );
};

export default PasswordRecovery;
