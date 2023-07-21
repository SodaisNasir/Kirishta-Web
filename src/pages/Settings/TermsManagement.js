import React, { useContext, useState } from "react";
import Editor from "../../components/Editor";
import { useEffect } from "react";
import { Account, LanguageSelector } from "../../components/helpers";
import { Loader, OtherPage } from "../../components";
import { base_url } from "../../utils/url";
import { fetchDataByLang, replaceParaWithDivs } from "../../utils";
import { AppContext } from "../../context";

const TermsManagement = () => {
  const { user } = useContext(AppContext);
  const hasEditAccess = user.privilage["Settings Management"].Terms.Edit;
  const type = "Terms";
  const [toggleAccount, setToggleAccount] = useState(false);
  const [toggleBtn, setToggleBtn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [state, setState] = useState({ value: "" });
  const [language, setLanguage] = useState({ state: false, value: "English" });

  const setSingleState = (name, value) => {
    if (name === "language") {
      setLanguage(value);
      setToggleAccount(false);
    } else if (name === "account") {
      setToggleAccount(value);
      setLanguage({ ...language, state: false });
    }
  };

  const handleChange = (value) => setState({ value });
  const handleSubmit = async () => {
    try {
      setToggleBtn(true);

      let formdata = new FormData();
      formdata.append("type", type);
      formdata.append("language", language.value);
      formdata.append("description", replaceParaWithDivs(state.value));

      let requestOptions = {
        headers: {
          accept: "application/json",
        },
        method: "POST",
        body: formdata,
        redirect: "follow",
      };

      const res = await fetch(`${base_url}/edit-about`, requestOptions);
      const json = await res.json();

      if (json.success) {
        const data = json.success.data;
        console.log(data);
        setState({ value: data.description });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setToggleBtn(false);
    }
  };

  useEffect(() => {
    setLanguage((prev) => ({ ...prev, state: false }));
    fetchDataByLang(setIsLoading, setState, type, language.value);
  }, [language.value]);

  return (
    <OtherPage
      title="Terms Management"
      extraClasses={`font-poppins p-3 pt-2 md:pt-9 md:px-5`}>
      <header className="flex justify-between items-center">
        <h1 className="font-semibold text-xl text-[#44403C] truncate mr-2">
          Terms Management
        </h1>

        <div className="flex items-center">
          <LanguageSelector
            {...{
              language,
              setLanguage: (state) => setSingleState("language", state),
            }}
          />

          <Account
            {...{
              toggle: toggleAccount,
              setToggle: (val) => setSingleState("account", val),
            }}
          />
        </div>
      </header>
      <main className={"relative min-h-[70vh]"}>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <div className="grid grid-cols-1 gap-5">
              <Editor
                {...{
                  state: state.value,
                  handleChange,
                  readOnly: !hasEditAccess,
                }}
              />
            </div>
            <button
              onClick={handleSubmit}
              className={`flex items-center text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xs ${
                toggleBtn ? "py-1 px-5 pl-2" : "py-2 px-5"
              } mt-3 text-center ${
                toggleBtn ? "disabled:py-1" : ""
              } disabled:cursor-not-allowed`}
              disabled={!hasEditAccess || toggleBtn}>
              {toggleBtn ? (
                <>
                  <Loader extraStyles="!static !inset-auto !block !scale-50 !bg-transparent" />
                  Updating
                </>
              ) : (
                "Update"
              )}
            </button>
          </>
        )}
      </main>
    </OtherPage>
  );
};

export default TermsManagement;
