import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { OtherPage } from "../components";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/email-verification/${email}`);
  };

  return (
    <OtherPage
      title="Reset Password"
      extraClasses="bg-[url('../src/assets/images/login_bg.webp')] pt-10 bg-cover bg-top h-screen"
    >
      <main className="flex justify-center w-full h-full p-3 font-poppins">
        <div className="w-full max-w-md p-4">
          <h2 className="font-semibold text-lg mb-2">Reset Password</h2>

          <p className="text-xs mb-3">
            Please enter your email address, and we will send you an OTP to
            confirm it.
          </p>

          <form onSubmit={handleSubmit} method="POST">
            <label
              htmlFor="email"
              className="w-full block mb-1 text-xs font-medium text-gray-900 dark:text-white"
            >
              Email Address
            </label>
            <input
              type="email"
              name="email"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 mb-2.5 text-xs rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="example@gmail.com"
              required={true}
            />

            <button
              type="submit"
              className="w-full text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xs px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Next
            </button>
          </form>
        </div>
      </main>
    </OtherPage>
  );
};

export default ForgotPassword;
