import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ConfirmationCodeFeilds, Page } from "../components";

const EmailVerification = () => {
  const { email } = useParams();
  const navigate = useNavigate();
  const handleChange = (inputs, index) => console.log(inputs, index);

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/change-password/${email}`);
  };

  const config = {
    length: 4,
    allowedPattern: "numeric",
    initialValue: "",
    autoFocus: true,
    handleChange,
  };

  const [counter, setCounter] = useState(600);

  useEffect(() => {
    const timer =
      counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
    return () => clearInterval(timer);
  }, [counter]);

  const minutes = Math.floor(counter / 60);
  const seconds = counter % 60;

  return (
    <Page extraClasses="bg-[url('../src/assets/images/login_bg.png')] bg-cover bg-top h-screen">
      <main className="flex justify-center w-full h-full p-3 font-poppins">
        <div className="w-full max-w-md p-4">
          <h2 className="font-semibold text-lg mb-2">Email Verification</h2>

          <p className="text-xs mb-3">
            We have sent one-time password to{" "}
            <span className="font-semibold">{email}</span>
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
                onClick={() => setCounter(600)}
                className="block mx-auto text-[11px] mt-2 text-blue-500 hover:underline font-medium text-center"
              >
                Resend
              </button>
            )}

            <button
              type="submit"
              className="w-full text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xs px-5 py-2.5 mt-4 text-center dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-700"
            >
              Continue
            </button>
          </form>
        </div>
      </main>
    </Page>
  );
};

export default EmailVerification;
