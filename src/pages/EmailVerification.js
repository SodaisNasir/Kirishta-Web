import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { ConfirmationCodeFeilds, Loader, OtherPage } from "../components";
import { useContext } from "react";
import { AppContext } from "../context";
import { themes } from "../constants/data";

const EmailVerification = () => {
  const navigate = useNavigate();
  const { otpData, setOtpData } = useContext(AppContext);
  const [state, setState] = useState(null);
  const [counter, setCounter] = useState(600);
  const [toggleBtn, setToggleBtn] = useState(false);
  const [message, setMessage] = useState({ theme: "", value: "" });

  const minutes = Math.floor(counter / 60);
  const seconds = counter % 60;

  const onChange = (val) => {
    setMessage({ theme: "", value: "" });
    setState(val);
  };

  const handleResend = async () => {
    setToggleBtn(true);

    try {
      let formdata = new FormData();
      formdata.append("email", otpData.email);

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
      const json = await res.json();

      console.log(json);

      if (json.success) {
        const data = json.success;
        setMessage({ theme: themes.success, value: json.success.message });
        setOtpData(data);
        setCounter(600);
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

  const handleSubmit = (e) => {
    e.preventDefault();
    setToggleBtn(true);

    console.log("state", state);

    if (otpData.Reset_code == state) {
      setMessage({
        theme: themes.success,
        value: "Email verification completed!",
      });
      setTimeout(() => {
        navigate(`/change-password`);
      }, 2000);
    } else {
      setToggleBtn(false);
      setMessage({
        theme: themes.error,
        value: "OTP doesn't match! Please try again.",
      });
    }
  };

  const config = {
    fields: 4,
    type: "number",
    autoFocus: true,
    onChange,
  };

  useEffect(() => {
    const timer =
      counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
    return () => clearInterval(timer);
  }, [counter]);

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue =
        "Are you sure you want to leave? You'll need to verify your email again";
    };

    document.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      document.addEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  return otpData === null ? (
    <Navigate to={"/forgot-password"} />
  ) : (
    <OtherPage
      title="Email Verification"
      extraClasses="bg-[url('../src/assets/images/login_bg.webp')] pt-10 bg-cover bg-top h-screen"
    >
      <main className="flex justify-center w-full h-full p-3 font-poppins">
        <div className="w-full max-w-md p-4">
          <h2 className="font-semibold text-lg mb-2">Email Verification</h2>

          {message.value && (
            <p
              className={`w-full p-2.5 my-2 text-xs rounded-md border ${message.theme}`}
            >
              {message.value}
            </p>
          )}

          <p className="text-xs mb-3">
            We have sent one-time password to{" "}
            <span className="font-semibold">{otpData.email}</span>
          </p>

          <form onSubmit={handleSubmit}>
            <p className="flex justify-between text-xs">
              OTP
              <span className="font-semibold">{`${
                minutes < 10 ? "0" + minutes : minutes
              } : ${seconds < 10 ? "0" + seconds : seconds}`}</span>
            </p>

            <ConfirmationCodeFeilds {...config} />

            {counter === 0 && (
              <button
                onClick={handleResend}
                className="block mx-auto text-[11px] mt-2 text-blue-500 hover:underline font-medium text-center"
              >
                Resend
              </button>
            )}

            <button
              type="submit"
              id="continue"
              className="flex items-center justify-center w-full text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xs px-5 py-2.5 mt-4 text-center disabled:bg-blue-400"
              disabled={toggleBtn}
            >
              {toggleBtn && (
                <Loader extraStyles="!static !inset-auto !block !scale-50 !bg-transparent !saturate-100" />
              )}
              Continue
            </button>
          </form>
        </div>
      </main>
    </OtherPage>
  );
};

export default EmailVerification;
