import React, { useState } from "react";
import Logo from "../assets/images/krista_main.png";
import Eye from "../assets/images/Eye.png";
import Bg from "../assets/images/login_bg.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState({ isVisible: false, value: "" });

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) =>
    setPassword((prev) => ({ ...prev, value: e.target.value }));
  const togglePassword = () =>
    setPassword((prev) => ({ ...prev, isVisible: !prev.isVisible }));

  return (
    <div className="w-screen h-screen bg bg-[#EEF2F5] overflow-hidden">
      <img className="w-full -z-10" src={Bg} alt="background" />
      <div className="flex justify-center items-center w-full h-full font-poppins">
        <main className="w-full max-w-sm">
          <img className="mb-10 w-48 mx-auto" src={Logo} alt="kirista logo" />
          <section className="w-full bg-white rounded-xl px-6 pt-8 pb-10">
            <h1 className="text-xl text-center font-[700] mb-8">
              Welcome Back, Admin.
            </h1>
            <form className="space-y-3">
              <div>
                <input
                  type="email"
                  id="email"
                  onChange={handleEmailChange}
                  value={email}
                  className="bg-[#EEF2F5] text-gray-900 text-xs font-medium rounded-2xl px-4 py-3 focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 outline-none"
                  placeholder="Email"
                  required={true}
                />
              </div>
              <div className="flex items-center bg-[#EEF2F5] text-gray-900 text-xs font-medium rounded-2xl focus:ring-blue-500 focus:border-blue-500 w-full dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 overflow-hidden">
                <input
                  type={password.isVisible ? "text" : "password"}
                  id="password"
                  onChange={handlePasswordChange}
                  value={password.value}
                  className="w-full px-4 py-3 bg-[#EEF2F5] text-gray-900 outline-none"
                  placeholder="Password"
                  required={true}
                />
                <div className="w-10 cursor-pointer">
                  <img
                    onClick={togglePassword}
                    className="w-4 ml-1"
                    src={Eye}
                    alt="eye"
                    title="show/hide"
                  />
                </div>
              </div>
              <p className="text-xs font-medium text-right">Forgot Password?</p>
              <button
                className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium rounded-2xl px-4 py-2.5 block w-full outline-none"
                type="submit"
              >
                Log in
              </button>
            </form>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Login;
