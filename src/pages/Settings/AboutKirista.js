import React, { useContext, useEffect, useState } from "react";
import Editor from "../../components/Editor";
import { Loader, OtherPage } from "../../components";
import { fetchDataByLang, replaceParaWithDivs } from "../../utils";
import { LanguageSelector } from "../../components/helpers";
import { base_url } from "../../utils/url";
import { AppContext } from "../../context";

const AboutKirista = () => {
  const { user } = useContext(AppContext);
  const hasEditAccess =
    user.privilage["Settings Management"]["About Kirista"].Edit;
  const type = "Kirista";
  const [toggleBtn, setToggleBtn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [state, setState] = useState({ value: "" });
  const [language, setLanguage] = useState({ state: false, value: "English" });

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
      title="About Kirista"
      extraClasses={`font-poppins p-3 pt-2 md:pt-9 md:px-5`}
    >
      <header className="flex justify-between">
        <h1 className="font-semibold text-xl text-[#44403C]">About Kirista</h1>

        <LanguageSelector
          {...{
            language,
            setLanguage,
          }}
        />
      </header>
      <main className={"relative min-h-[70vh]"}>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <Editor
              {...{
                state: state.value,
                handleChange,
                readOnly: !hasEditAccess,
              }}
            />
            <button
              onClick={handleSubmit}
              className={`flex items-center text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xs ${
                toggleBtn ? "py-1 px-5 pl-2" : "py-2 px-5"
              } mt-3 text-center ${
                toggleBtn ? "disabled:py-1" : ""
              } disabled:cursor-not-allowed`}
              disabled={!hasEditAccess || toggleBtn}
            >
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

export default AboutKirista;
