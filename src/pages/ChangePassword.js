import React, { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { Loader, OtherPage } from "../components";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { themes } from "../constants/data";
import { base_url } from "../utils/url";
import { useContext } from "react";
import { AppContext } from "../context";
import { useEffect } from "react";

const ChangePassword = () => {
  const navigate = useNavigate();
  const { user, otpData } = useContext(AppContext);
  const [message, setMessage] = useState({ theme: "", value: "" });
  const [toggleBtn, setToggleBtn] = useState(false);
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
    const value = e.target.value;

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

  const handleSubmit = async (e) => {
    const url = `${base_url}/adminresetpassword/${
      user ? user?.id : otpData.id
    }`;
    e.preventDefault();
    setToggleBtn(true);

    // if (newPassword.value === confirmPassword.value) {
    //   setMessage({
    //     theme: themes.success,
    //     value: "Your password changed successfully!",
    //   });
    //   setTimeout(() => {
    //     navigate("/login");
    //   }, 1500);
    // } else if (newPassword.value !== confirmPassword.value) {
    //   setMessage({ theme: themes.error, value: "Password doesn't match!" });
    // } else {
    //   setMessage({ theme: themes.error, value: "An error occurred!" });
    // }

    try {
      let formdata = new FormData();
      formdata.append("password", newPassword.value);
      formdata.append("password_confirmation", confirmPassword.value);

      let requestOptions = {
        headers: {
          Accept: "application/json",
        },
        method: "POST",
        body: formdata,
        redirect: "follow",
      };

      const res = await fetch(url, requestOptions);
      const json = await res.json();

      if (json.success) {
        setMessage({ theme: themes.success, value: json.success.message });
        setTimeout(() => {
          navigate("/login");
        }, 1500);
        console.log("data =============>", json);
      } else {
        setMessage({ theme: themes.error, value: json.error.message });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setToggleBtn(false);
    }
  };

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue =
        "Are you sure you want to leave? You'll need to verify your email again";
    };

    !user && document.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      !user && document.addEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  if (!user && !otpData) {
    return <Navigate to="/forgot-password" />;
  }

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
                className="w-full block mb-1 text-xs font-medium text-gray-900"
              >
                New Password
              </label>
              <div className="flex items-center shadow-sm bg-gray-50 border border-gray-300 text-gray-900 mb-2.5 text-xs rounded-lg focus:ring-blue-600 focus:border-blue-600 w-full">
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
                className="w-full block mb-1 text-xs font-medium text-gray-900"
              >
                Confirm Password
              </label>
              <div className="flex items-center shadow-sm bg-gray-50 border border-gray-300 text-gray-900 mb-2.5 text-xs rounded-lg focus:ring-blue-600 focus:border-blue-600 w-full">
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
              className="flex justify-center items-center w-full text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xs px-5 py-2.5 mt-2 text-center disabled:cursor-not-allowed"
              disabled={toggleBtn}
            >
              {toggleBtn ? (
                <>
                  <Loader extraStyles="!static !inset-auto !block !scale-50 !bg-transparent !saturate-100" />
                  Changing
                </>
              ) : (
                "Change"
              )}
            </button>
          </form>
        </div>
      </main>
    </OtherPage>
  );
};

export default ChangePassword;
