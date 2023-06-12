import React, { useContext, useState } from "react";
import { AppContext } from "../context";
import Logo from "../assets/images/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { OtherPage } from "../components";

const Login = () => {
  const [email, setEmail] = useState("");
  // const [message, setMessage] = useState({ theme: "", value: "" });
  const [password, setPassword] = useState({ isVisible: false, value: "" });
  const { user, setUser } = useContext(AppContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value.trim();

    // message.value && setMessage({ theme: "", value: "" });
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const togglePassword = () =>
    setPassword((prev) => ({ ...prev, isVisible: !prev.isVisible }));

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!user) {
      setUser({
        name: "Jerry Nudibisi",
        email,
        password,
        photoUrl: "https://i.pravatar.cc/30",
      });
      navigate("/dashboard");
    }
  };

  return (
    <OtherPage
      title="Login"
      extraClasses="w-screen h-screen bg-[#EEF2F5] overflow-hidden"
    >
      <div className="flex justify-center items-center bg-[url('../src/assets/images/login_bg.webp')] bg-cover bg-top w-full h-full font-poppins">
        <main className="w-full max-w-sm mx-4">
          <div className="relative h-16 bg-transparent mb-10 w-48 mx-auto">
            <img className="w-full" src={Logo} alt="kirista logo" />
          </div>
          <section className="w-full bg-white rounded-xl px-6 pt-8 pb-9">
            <h1 className="text-xl text-center font-[700] mb-8">
              Welcome Back, Admin.
            </h1>

            {/* {message.value && (
              <p
                className={`w-full p-2.5 mb-3 text-xs rounded-md border ${message.theme}`}
              >
                {message.value}
              </p>
            )} */}

            <form onSubmit={handleSubmit}>
              <div className="mb-2">
                <input
                  type="email"
                  name="email"
                  id="email"
                  onChange={handleChange}
                  value={email}
                  className="bg-[#EEF2F5] text-gray-900 text-xs font-medium rounded-2xl px-4 py-3 focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 outline-none"
                  placeholder="Email"
                  required={true}
                />
              </div>
              <div className="flex items-center bg-[#EEF2F5] text-gray-900 text-xs font-medium rounded-2xl mb-1 focus:ring-blue-500 focus:border-blue-500 w-full dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 overflow-hidden">
                <input
                  type={password.isVisible ? "text" : "password"}
                  name="password"
                  id="password"
                  onChange={handleChange}
                  value={password.value}
                  className="w-full px-4 py-3 bg-[#EEF2F5] text-gray-900 outline-none"
                  placeholder="Password"
                  required={true}
                />
                <div className="w-10 text-lg text-blue-500">
                  {password.isVisible ? (
                    <AiFillEyeInvisible
                      onClick={togglePassword}
                      className="cursor-pointer"
                    />
                  ) : (
                    <AiFillEye
                      onClick={togglePassword}
                      className="cursor-pointer"
                    />
                  )}
                </div>
              </div>
              <div className="w-full text-right text-[11px] font-medium mb-3 mt-2">
                <Link
                  to={"/forgot-password"}
                  className="hover:text-blue-400 hover:underline"
                >
                  Forgot Password?
                </Link>
              </div>
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-2xl px-4 py-2.5 block w-full outline-none"
                type="submit"
              >
                Log in
              </button>
            </form>
          </section>
        </main>
      </div>
    </OtherPage>
  );
};

export default Login;
