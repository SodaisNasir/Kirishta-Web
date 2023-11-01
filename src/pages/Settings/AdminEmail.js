import React, { useContext, useEffect, useState } from "react";
import { Loader, Page } from "../../components";
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

        //* console.log("names", names);
        //* console.log("emails", emails);
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
      <main className="p-6 space-y-6">
        <form
          onSubmit={handleSubmit}
          className="grid max-w-3xl grid-cols-6 gap-6 mx-auto mt-3"
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
          <div className="flex items-center space-x-2 border-gray-200 rounded-b">
            <button
              type="submit"
              className={`flex items-center text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xs ${
                toggleBtn ? "py-1 px-5 pl-2" : "py-2.5 px-5"
              } mt-3 text-center ${
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
        className="block mb-2 text-xs font-medium text-gray-900 capitalize"
      >
        {title}
      </label>
      <input
        type={type}
        name={title + id}
        id={title + id}
        value={state}
        onChange={(e) => setState(e.target.value)}
        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
        placeholder={placeholder}
        required={true}
        readOnly={readOnly}
      />
    </div>
  );
};

export default AdminEmail;
