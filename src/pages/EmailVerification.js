import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { ConfirmationCodeFeilds, Loader, OtherPage } from "../components";
import { useContext } from "react";
import { AppContext } from "../context";
import { themes } from "../constants/data";
import { base_url } from "../utils/url";

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

      const res = await fetch(`${base_url}/adminEmail`, requestOptions);
      const json = await res.json();

      //* console.log(json);

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

    //* console.log("state", state);

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
          <h2 className="mb-2 text-lg font-semibold">Email Verification</h2>

          {message.value && (
            <p
              className={`w-full p-2.5 my-2 text-xs rounded-md border ${message.theme}`}
            >
              {message.value}
            </p>
          )}

          <p className="mb-3 text-xs">
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
              className="flex items-center justify-center w-full px-5 py-3 mt-3.5 text-xs font-medium text-center text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 disabled:bg-blue-300 disabled:saturate-30 disabled:py-1 disabled:cursor-not-allowed"
              disabled={toggleBtn}
            >
              {toggleBtn && (
                <Loader
                  extraStyles="!static !inset-auto !block !scale-50 !bg-transparent !saturate-100"
                  loaderColor={toggleBtn ? "fill-blue-300" : ""}
                />
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
