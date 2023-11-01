import React, { useContext } from "react";
import { Loader, Page } from "../components";
import { AppContext } from "../context";
import { useState } from "react";
import { base_url } from "../utils/url";

const EditProfile = () => {
  const { user, setUser } = useContext(AppContext);
  //* console.log("user", user);
  const [image, setImage] = useState("");
  const [state, setState] = useState(user);
  const [toggleBtn, setToggleBtn] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setToggleBtn(true);

    try {
      const url = `${base_url}/admin-profile-edit/${user.id}`;
      let formdata = new FormData();
      Object.keys(state).forEach((key) => formdata.append(key, state[key]));

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

      if (json.success.status == 200) {
        let data = json.success.data;
        let privilage = data.privilage;
        data.privilage =
          typeof privilage === "string" ? JSON.parse(privilage) : privilage;

        setUser(data);
        localStorage.setItem("user", JSON.stringify(data));
        //* console.log("Response =============>", data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setToggleBtn(false);
    }
  };

  const handleChange = (e) => {
    const key = e.target.name;
    const value = e.target.value;

    if (key === "profile_image") {
      const file = e.target.files[0];

      setImage(URL.createObjectURL(file));
      setState({ ...state, profile_image: file });
    } else {
      setState({ ...state, [key]: value });
    }
  };

  return (
    <Page title={"Edit Profile"}>
      <main className="max-w-2xl mx-auto mt-10">
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 sm:grid-cols-2 gap-6"
        >
          <div className="col-span-2">
            <label className="block text-sm text-center font-medium text-gray-700">
              Photo
            </label>
            <div className="mt-1 flex flex-col items-center text-xs">
              <div className="inline-block h-12 w-12 rounded-full overflow-hidden bg-gray-100">
                {image || state.profile_image ? (
                  <img
                    className="h-full w-full text-gray-300"
                    src={image || state.profile_image}
                    alt="profile"
                  />
                ) : (
                  <svg
                    className="h-full w-full text-gray-300"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                )}
              </div>
              <input
                id="profile_image"
                type="file"
                accept="image/*"
                className="hidden"
                name="profile_image"
                onChange={handleChange}
              />
              <button
                onClick={() => document.getElementById("profile_image").click()}
                type="button"
                className="bg-white py-1.5 px-3 mt-2 border border-gray-300 rounded-md shadow-sm leading-4 font-medium text-gray-700 hover:bg-gray-50"
              >
                Change
              </button>
            </div>
          </div>

          <div className="col-span-1">
            <label
              htmlFor="name"
              className="block text-xs font-medium text-gray-700"
            >
              Name
            </label>
            <div className="mt-1">
              <input
                type="text"
                name="name"
                id="name"
                value={state.name}
                onChange={handleChange}
                className="p-2.5 w-full text-xs text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                placeholder="John Doe"
              />
            </div>
          </div>
          <div className="col-span-1">
            <label
              htmlFor="phone_number"
              className="block text-xs font-medium text-gray-700"
            >
              Phone Number
            </label>
            <div className="mt-1">
              <input
                type="tel"
                name="phone_number"
                id="phone_number"
                value={state.phone_number}
                onChange={handleChange}
                className="p-2.5 w-full text-xs text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                placeholder="+021 656 4848 315"
              />
            </div>
          </div>
          <div className="col-span-2">
            <label
              htmlFor="about"
              className="block text-xs font-medium text-gray-700"
            >
              About
            </label>
            <div className="mt-1">
              <textarea
                className="p-2.5 w-full text-xs text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                id="about"
                name="about"
                rows="10"
                value={state.about || ""}
                onChange={handleChange}
                placeholder="Write about yourself here..."
              ></textarea>
            </div>
          </div>

          <div className="text-right col-span-2">
            <button
              type="submit"
              className={`inline-flex justify-center items-center py-2 px-5 ${
                toggleBtn ? "pl-1.5" : ""
              } border border-transparent shadow-sm text-xs font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600 disabled:opacity-50 disabled:saturate-30 disabled:py-1 disabled:cursor-not-allowed`}
              disabled={toggleBtn}
            >
              {toggleBtn ? (
                <>
                  <Loader extraStyles="!static !inset-auto !block !scale-50 !bg-transparent !saturate-100" />
                  Updating
                </>
              ) : (
                "Update"
              )}
            </button>
          </div>
        </form>
      </main>
    </Page>
  );
};

export default EditProfile;
