import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loader, OtherPage } from "../components";
import { themes } from "../constants/data";
import { useContext } from "react";
import { AppContext } from "../context";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const { setOtpData } = useContext(AppContext);
  const [email, setEmail] = useState("");
  const [toggleBtn, setToggleBtn] = useState(false);
  const [message, setMessage] = useState({ theme: "", value: "" });

  const handleChange = (e) => {
    const value = e.target.value;

    setEmail(value);
    setMessage({ theme: "", value: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setToggleBtn(true);
    let json = null;

    try {
      let formdata = new FormData();
      formdata.append("email", email);

      let requestOptions = {
        headers: {
          Accept: "application/json",
        },
        method: "POST",
        body: formdata,
        redirect: "follow",
      };

      const res = await fetch(
        "https://sassolution.org/kirista/api/adminEmail",
        requestOptions
      );
      json = await res.json();

      console.log(json);

      if (json.success) {
        const data = json.success;
        setOtpData(data);

        navigate("/email-verification");
      } else if (json.error) {
        setMessage({
          theme: themes.error,
          value: json.error.message.toLowerCase().includes("email not")
            ? "Email doesn't exist!"
            : json.error.message,
        });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setToggleBtn(false);
    }
  };

  return (
    <OtherPage
      title="Reset Password"
      extraClasses="bg-[url('../src/assets/images/login_bg.webp')] pt-10 bg-cover bg-top h-screen"
    >
      <main className="flex justify-center w-full h-full p-3 font-poppins">
        <div className="w-full max-w-md p-4">
          <h2 className="mb-2 text-lg font-semibold">Reset Password</h2>

          {message.value && (
            <p
              className={`w-full p-2.5 my-2 text-xs rounded-md border ${message.theme}`}
            >
              {message.value}
            </p>
          )}

          <p className="mb-3 text-xs">
            Please enter your email address, and we will send you an OTP to
            confirm it.
          </p>

          <form onSubmit={handleSubmit} method="POST">
            <label
              htmlFor="email"
              className="block w-full mb-1 text-xs font-medium text-gray-900"
            >
              Email Address
            </label>
            <input
              type="email"
              name="email"
              id="email"
              onChange={handleChange}
              value={email}
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 mb-2.5 text-xs rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
              placeholder="example@gmail.com"
              required={true}
            />

            <button
              type="submit"
              className="flex justify-center items-center w-full text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xs px-5 py-2.5 text-center disabled:bg-blue-300 disabled:saturate-30 disabled:py-1 disabled:cursor-not-allowed"
              disabled={toggleBtn}
            >
              {toggleBtn && (
                <Loader
                  extraStyles="!static !inset-auto !block !scale-50 !bg-transparent !saturate-100"
                  loaderColor={toggleBtn ? "fill-blue-300" : ""}
                />
              )}
              Next
            </button>
          </form>
        </div>
      </main>
    </OtherPage>
  );
};

export default ForgotPassword;
