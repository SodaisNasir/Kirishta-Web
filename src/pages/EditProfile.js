import React, { useContext } from "react";
import { Page } from "../components";
import { AppContext } from "../context";

const EditProfile = () => {
  const { user } = useContext(AppContext);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <Page title={"Edit Profile"}>
      <main className="max-w-2xl mx-auto mt-10">
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          action="#"
          method="POST"
        >
          <div className="col-span-2">
            <label className="block text-xs text-center font-medium text-gray-700">
              Photo
            </label>
            <div className="mt-1 flex flex-col items-center text-xs">
              <div className="inline-block h-12 w-12 rounded-full overflow-hidden bg-gray-100">
                {user.profile_image ? (
                  <img
                    className="h-full w-full text-gray-300"
                    src={user.profile_image}
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
              <input id="profile-image" type="file" className="hidden" />
              <button
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
                value={user.name.split(" ")[0]}
                className="p-2.5 w-full text-xs text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="John"
              />
            </div>
          </div>

          <div className="col-span-1">
            <label
              htmlFor="email"
              className="block text-xs font-medium text-gray-700"
            >
              Email
            </label>
            <div className="mt-1">
              <input
                type="email"
                name="email"
                id="email"
                value={user.email}
                className="p-2.5 w-full text-xs text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="johndoe@gmail.com"
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
                className="p-2.5 w-full text-xs text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                id="about"
                name="about"
                rows="10"
                value={
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin at ante ut risus tincidunt accumsan vel vitae massa. Pellentesque feugiat tortor nec quam mattis, at ultricies justo euismod. Nunc libero ipsum, vehicula sit amet posuere non, suscipit eget turpis. Donec ut aliquet erat. Quisque vel consequat erat, a fringilla turpis. Aenean faucibus fermentum interdum. Vestibulum velit diam, vehicula sed egestas non, aliquet quis felis. Quisque at turpis eleifend, luctus ipsum vel, dignissim felis. Sed condimentum mollis metus, sit amet scelerisque enim dictum ac. Nulla suscipit ac turpis vitae tristique. Vestibulum fringilla nunc sed pulvinar commodo. \n\nPellentesque dui elit, ultricies a interdum sed, sodales ut tellus. Vivamus sollicitudin tempor pellentesque. Nam vitae ante accumsan dolor tempor laoreet et in lacus."
                }
                placeholder="you@example.com"
              ></textarea>
            </div>
          </div>
          <div className="text-right col-span-2">
            <button
              type="submit"
              className="inline-flex justify-center py-1.5 px-4 border border-transparent shadow-sm text-xs font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600"
            >
              Save
            </button>
          </div>
        </form>
      </main>
    </Page>
  );
};

export default EditProfile;
