import React, { useContext, useEffect, useState } from "react";
import { Loader, Page } from "../../components";
import { VscClose } from "react-icons/vsc";
import { AppContext } from "../../context";
import { base_url } from "../../utils/url";
import { toast } from "react-hot-toast";

const showAllAdminEmails = `${base_url}/show-adminEmail`;
const editUrl = `${base_url}/edit-adminEmail/1`;

const AdminEmail = () => {
  const initialNameState = ["", "", ""];
  const initialEmailState = ["", "", ""];
  const { user } = useContext(AppContext);
  const adminEmails = user.privilage["Settings Management"]["Admin Email"];
  const hasEditAccess = adminEmails.Edit;
  const [toggleBtn, setToggleBtn] = useState(false);
  const [names, setNames] = useState(initialNameState);
  const [emails, setEmails] = useState(initialEmailState);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setToggleBtn(true);

    try {
      let formdata = new FormData();
      formdata.append("id", 1);
      formdata.append("name", JSON.stringify(names));
      formdata.append("email", JSON.stringify(emails));

      let requestOptions = {
        headers: {
          Accept: "application/json",
        },
        method: "POST",
        body: formdata,
        redirect: "follow",
      };

      const res = await fetch(editUrl, requestOptions);
      const json = await res.json();

      if (json.message) {
        toast.success(json.message);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setToggleBtn(false);
    }
  };

  const fetchData = async () => {
    try {
      const res = await fetch(showAllAdminEmails);
      const json = await res.json();

      if (json.success) {
        let names = JSON.parse(json.success.data[0].name);
        let emails = JSON.parse(json.success.data[0].email);
        names = typeof names === "string" ? JSON.parse(names) : names;
        emails = typeof emails === "string" ? JSON.parse(emails) : emails;

        setNames(names);
        setEmails(emails);

        console.log("names", names);
        console.log("emails", emails);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    // fetch data
    fetchData();
  }, []);

  return (
    <Page title={"Admin Email"}>
      <main className="p-6 space-y-6 max-h-[70vh] overflow-y-scroll">
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-6 gap-6 max-w-3xl mx-auto mt-3"
        >
          {names.map((item, index) => (
            <>
              <FormField
                {...{
                  key: `name${index + 1}`,
                  id: index + 1,
                  title: "name " + (index + 1),
                  state: item,
                  setState: (val) => {
                    let stateCopy = [...names];
                    stateCopy[index] = val;
                    setNames(stateCopy);
                  },
                  placeholder: "John Doe",
                  readOnly: !hasEditAccess,
                }}
              />
              <FormField
                {...{
                  key: `email${index + 1}`,
                  id: index + 1,
                  title: "email " + (index + 1),
                  type: "email",
                  state: emails[index],
                  setState: (val) => {
                    let stateCopy = [...emails];
                    stateCopy[index] = val;
                    setEmails(stateCopy);
                  },
                  placeholder: "johndoe@gmail.com",
                  readOnly: !hasEditAccess,
                }}
              />
            </>
          ))}
          <div className="flex items-center space-x-2 border-gray-200 rounded-b dark:border-gray-600">
            <button
              type="submit"
              className={`flex items-center text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xs ${
                toggleBtn ? "py-1 px-5 pl-2" : "py-2.5 px-5"
              } mt-3 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 disabled:opacity-50 disabled:saturate-30 ${
                toggleBtn ? "disabled:py-1" : ""
              } disabled:cursor-not-allowed`}
              disabled={!hasEditAccess || toggleBtn}
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

const FormField = ({
  type = "text",
  title,
  id,
  placeholder,
  state,
  setState,
  readOnly = false,
}) => {
  return (
    <div className="col-span-6 sm:col-span-3">
      <label
        htmlFor={title + id}
        className="block mb-2 text-xs font-medium text-gray-900 dark:text-white capitalize"
      >
        {title}
      </label>
      <input
        type={type}
        name={title + id}
        id={title + id}
        value={state}
        onChange={(e) => setState(e.target.value)}
        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder={placeholder}
        required={true}
        readOnly={readOnly}
      />
    </div>
  );
};

const EditModal = ({ editModal, setEditModal }) => {
  const handleSubmit = (e) => {
    e.preventDefault();

    setEditModal({
      isVisible: false,
      data: {},
    });
  };

  const close = () => setEditModal((prev) => ({ ...prev, isVisible: false }));

  return (
    <>
      <div
        className={`${
          editModal.isVisible ? "" : "hidden"
        } fixed inset-0 flex justify-center items-center z-20 bg-black/50`}
      />
      <div
        tabIndex="-1"
        className={`${
          editModal.isVisible ? "" : "hidden"
        } fixed z-20 flex items-center justify-center w-full p-4 overflow-x-hidden overflow-y-auto inset-0 h-[calc(100%-1rem)] max-h-full`}
      >
        <div className="relative w-full max-w-2xl max-h-full">
          {/* Modal content */}
          <form
            action="#"
            onSubmit={handleSubmit}
            className="relative bg-white rounded-lg shadow dark:bg-gray-700"
          >
            {/* Modal header */}
            <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Edit
              </h3>
              <button
                onClick={close}
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-base p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
              >
                <VscClose />
              </button>
            </div>
            {/* Modal body */}
            <div className="p-6 space-y-6 max-h-[70vh] overflow-y-scroll">
              <div className="grid grid-cols-6 gap-6">
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="name"
                    className="block mb-2 text-xs font-medium text-gray-900 dark:text-white"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={editModal.data.Name}
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="John Doe"
                    required={true}
                  />
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="email-1"
                    className="block mb-2 text-xs font-medium text-gray-900 dark:text-white"
                  >
                    Email 1
                  </label>
                  <input
                    type="email"
                    name="email-1"
                    id="email-1"
                    value={editModal.data["Email 1"]}
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="example@gmail.com"
                    required={true}
                  />
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="email-2"
                    className="block mb-2 text-xs font-medium text-gray-900 dark:text-white"
                  >
                    Email 2
                  </label>
                  <input
                    type="email"
                    name="email-2"
                    id="email-2"
                    value={editModal.data["Email 2"]}
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="example@gmail.com"
                    required={true}
                  />
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="email-3"
                    className="block mb-2 text-xs font-medium text-gray-900 dark:text-white"
                  >
                    Email 3
                  </label>
                  <input
                    type="email"
                    name="email-3"
                    id="email-3"
                    value={editModal.data["Email 3"]}
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="example@gmail.com"
                    required={true}
                  />
                </div>
                {/* <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="password"
                    className="block mb-2 text-xs font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    value={editModal.data.Password}
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="••••••••••••"
                    required={true}
                  />
                </div> */}
              </div>
            </div>
            {/* Modal footer */}
            <div className="flex items-center p-4 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
              <button
                type="submit"
                className="w-full text-white bg-blue-500 hover:bg-blue-600 focus:ring-2 focus:outline-none focus:ring-blue-200 font-medium rounded-lg text-xs px-5 py-3 text-center"
              >
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AdminEmail;
