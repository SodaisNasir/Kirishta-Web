import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { OtherPage } from "../components";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { themes } from "../constants/data";

const ChangePassword = () => {
  const navigate = useNavigate();

  // Email to change password of user account
  const { email } = useParams();
  const [message, setMessage] = useState({ theme: "", value: "" });
  const [newPassword, setNewPassword] = useState({
    isVisible: false,
    value: "",
  });
  const [confirmPassword, setConfirmPassword] = useState({
    isVisible: false,
    value: "",
  });

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value.trim();

    message.value && setMessage({ theme: "", value: "" });
    if (name === "newPassword") {
      setNewPassword((prev) => ({
        ...prev,
        value,
      }));
    } else if (name === "confirmPassword") {
      setConfirmPassword((prev) => ({
        ...prev,
        value,
      }));
    }
  };

  const toggleNewPassword = () =>
    setNewPassword((prev) => ({ ...prev, isVisible: !prev.isVisible }));
  const toggleConfirmPassword = () =>
    setConfirmPassword((prev) => ({ ...prev, isVisible: !prev.isVisible }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newPassword.value === confirmPassword.value) {
      setMessage({
        theme: themes.success,
        value: "Your password changed successfully!",
      });
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } else {
      setMessage({ theme: themes.error, value: "Password doesn't match!" });
    }
  };

  return (
    <OtherPage
      title="Change Password"
      extraClasses="bg-[url('../src/assets/images/login_bg.webp')] pt-10 bg-cover bg-top h-screen"
    >
      <main className="flex justify-center w-full h-full p-3 font-poppins">
        <div className="w-full max-w-md p-4">
          <h2 className="font-semibold text-lg mb-2">Change Password</h2>

          <p className="text-[11px] mb-3">
            Please fill these feilds to finish.
          </p>

          {message.value && (
            <p
              className={`w-full p-2.5 mb-3 text-xs rounded-md border ${message.theme}`}
            >
              {message.value}
            </p>
          )}

          <form onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="newPassword"
                className="w-full block mb-1 text-xs font-medium text-gray-900 dark:text-white"
              >
                New Password
              </label>
              <div className="flex items-center shadow-sm bg-gray-50 border border-gray-300 text-gray-900 mb-2.5 text-xs rounded-lg focus:ring-blue-600 focus:border-blue-600 w-full dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <input
                  type={newPassword.isVisible ? "text" : "password"}
                  name="newPassword"
                  id="newPassword"
                  onChange={handleChange}
                  value={newPassword.value}
                  className="w-full p-2.5 bg-transparent outline-none"
                  placeholder="Password"
                  required={true}
                />
                <div className="w-8 text-lg text-blue-500">
                  {newPassword.isVisible ? (
                    <AiFillEye
                      onClick={toggleNewPassword}
                      className="text-blue-500 cursor-pointer"
                    />
                  ) : (
                    <AiFillEyeInvisible
                      onClick={toggleNewPassword}
                      className="text-blue-500 cursor-pointer"
                    />
                  )}
                </div>
              </div>
            </div>
            <div>
              <label
                htmlFor="confirmPassword"
                className="w-full block mb-1 text-xs font-medium text-gray-900 dark:text-white"
              >
                Confirm Password
              </label>
              <div className="flex items-center shadow-sm bg-gray-50 border border-gray-300 text-gray-900 mb-2.5 text-xs rounded-lg focus:ring-blue-600 focus:border-blue-600 w-full dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <input
                  type={confirmPassword.isVisible ? "text" : "password"}
                  name="confirmPassword"
                  id="confirmPassword"
                  onChange={handleChange}
                  value={confirmPassword.value}
                  className="w-full p-2.5 bg-transparent outline-none"
                  placeholder="Password"
                  required={true}
                />
                <div className="w-8 text-lg text-blue-500">
                  {confirmPassword.isVisible ? (
                    <AiFillEye
                      onClick={toggleConfirmPassword}
                      className="text-blue-500 cursor-pointer"
                    />
                  ) : (
                    <AiFillEyeInvisible
                      onClick={toggleConfirmPassword}
                      className="text-blue-500 cursor-pointer"
                    />
                  )}
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xs px-5 py-2.5 mt-2 text-center dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-700"
            >
              Finish
            </button>
          </form>
        </div>
      </main>
    </OtherPage>
  );
};

export default ChangePassword;
