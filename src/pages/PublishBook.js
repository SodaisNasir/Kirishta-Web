import React, { useEffect } from "react";
import Page from "../components/Page Templates/Page";
import { bookCategories, bookLanguages } from "../constants/data";
import Editor from "../components/Editor";
import { useState } from "react";
import { VscClose } from "react-icons/vsc";

const PublishBook = () => {
  const initialState = [{ title: "", body: "" }];
  const [ePUB, setEPUB] = useState({ type: "file" });
  const [epubState, setEpubState] = useState(initialState);

  const handleSubmit = () => {
    console.log("Submit", epubState);
  };

  useEffect(() => {
    if (ePUB.type !== "create-epub") {
      setEpubState(initialState);
    }
  }, [ePUB.type]);

  return (
    <Page title="Publish Book">
      <main>
        <div className="relative w-full mx-auto max-w-3xl max-h-full">
          <div
            // action="#"
            // onSubmit={handleSubmit}
            className="relative mt-5 dark:bg-gray-700"
          >
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-6 gap-6">
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="title"
                    className="block mb-2 text-xs font-medium text-gray-900 dark:text-white"
                  >
                    Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    id="title"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Book title"
                    required={true}
                  />
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="author"
                    className="block mb-2 text-xs font-medium text-gray-900 dark:text-white"
                  >
                    Author
                  </label>
                  <input
                    type="text"
                    name="author"
                    id="author"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Author name"
                    required={true}
                  />
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="category"
                    className="block mb-2 text-xs font-medium text-gray-900 dark:text-white"
                  >
                    Category
                  </label>
                  <input
                    list="categories"
                    name="category"
                    id="category"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Story"
                    required={true}
                  />
                  <datalist id="categories">
                    {bookCategories.map((category, indx) => (
                      <option key={category + indx} value={category} />
                    ))}
                  </datalist>
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="language"
                    className="block mb-2 text-xs font-medium text-gray-900 dark:text-white"
                  >
                    Language
                  </label>
                  <input
                    list="languages"
                    name="language"
                    id="language"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="English"
                    required={true}
                  />
                  <datalist id="languages">
                    {bookLanguages.map((language, indx) => (
                      <option key={language + indx} value={language} />
                    ))}
                  </datalist>
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="release-year"
                    className="block mb-2 text-xs font-medium text-gray-900 dark:text-white"
                  >
                    Release year
                  </label>
                  <input
                    type="number"
                    name="release-year"
                    id="release-year"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="2020"
                    max={new Date().getFullYear()}
                    required={true}
                  />
                </div>
                <br className="hidden sm:block" />
                <div className="col-span-6">
                  <label
                    htmlFor="about"
                    className="block mb-2 text-xs font-medium text-gray-900 dark:text-white"
                  >
                    About
                  </label>
                  <textarea
                    id="about"
                    rows="8"
                    className="block p-2.5 w-full text-xs text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Write about this book..."
                  ></textarea>
                </div>
                <div className="flex items-center justify-around sm:justify-between pt-5 col-span-6 w-full sm:w-1/2 sm:mx-auto">
                  <div className="flex items-center">
                    <input
                      id="epub-type-1"
                      type="radio"
                      value="file"
                      onChange={(e) =>
                        setEPUB({
                          type: e.target.value,
                        })
                      }
                      checked={ePUB.type === "file"}
                      name="epub-type"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300"
                    />
                    <label
                      htmlFor="epub-type-1"
                      className="ml-2 text-xs font-medium text-gray-900 dark:text-gray-300 cursor-pointer"
                    >
                      Upload ePUB
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="epub-type-2"
                      type="radio"
                      value="create-epub"
                      onChange={(e) =>
                        setEPUB({
                          type: e.target.value,
                        })
                      }
                      checked={ePUB.type === "create-epub"}
                      name="epub-type"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300"
                    />
                    <label
                      htmlFor="epub-type-2"
                      className="ml-2 text-xs font-medium text-gray-900 dark:text-gray-300 cursor-pointer"
                    >
                      Create ePUB
                    </label>
                  </div>
                </div>
                {ePUB.type === "file" ? (
                  <div className="col-span-6 w-full sm:w-1/2 mx-auto">
                    <label
                      className="block mb-2 text-xs font-medium text-gray-900 dark:text-white"
                      htmlFor="upload-file"
                    >
                      Upload ePUB
                    </label>
                    <input
                      className="block w-full text-xs text-gray-900 border border-gray-300 p-2 py-2.5 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                      id="upload-file"
                      type="file"
                      accept=".epub"
                      onChange={(e) =>
                        setEPUB((prev) => ({
                          ...prev,
                          value: e.target.value,
                        }))
                      }
                      placeholder="https://www.example.com"
                    />
                  </div>
                ) : (
                  <CreateEPUB
                    {...{ state: epubState, setState: setEpubState }}
                  />
                )}
              </div>
            </div>
            <div className="w-full grid grid-cols-2 gap-6 p-6 pt-4 border-t border-gray-300 dark:border-gray-600">
              <button
                type="button"
                className="w-full text-white bg-[#387de5] hover:bg-[#2e6dcc] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xs px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Save
              </button>
              <button
                onClick={handleSubmit}
                type="button"
                className="w-full text-white bg-[#387de5] hover:bg-[#2e6dcc] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xs px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Publish
              </button>
            </div>
          </div>
        </div>
      </main>
    </Page>
  );
};

const CreateEPUB = ({ state, setState }) => {
  const handleTitleChange = (value, index) => {
    const updatedState = [...state];
    updatedState[index] = {
      ...updatedState[index],
      title: value,
    };
    setState(updatedState);
  };

  const handleBodyChange = (value, index) => {
    const updatedState = [...state];
    updatedState[index] = {
      ...updatedState[index],
      body: value,
    };
    setState(updatedState);
  };

  const handleAdd = () => {
    let stateCopy = [...state];
    stateCopy.push({ title: "", body: "" });
    setState(stateCopy);
  };

  const closeSection = (index) =>
    index !== 0 && setState((prev) => prev.filter((_, idx) => idx !== index));

  return (
    <div className="col-span-6">
      {state.map((item, index) => (
        <div
          key={item.title + index}
          className={`w-full text-sm text-gray-800 ${
            index !== 0 ? "mt-6" : ""
          } border rounded-md overflow-hidden`}
        >
          <header className="flex items-center justify-between font-semibold p-3 py-4 bg-gray-100">
            Section #{index + 1}
            <button
              onClick={() => closeSection(index)}
              className="text-lg text-gray-800 hover:text-gray-600"
            >
              <VscClose />
            </button>
          </header>
          <main className="p-5">
            <div>
              <label
                htmlFor={"chapter-title-" + (index + 1)}
                className="block mb-2 text-xs font-medium text-gray-900 dark:text-white"
              >
                Chapter Title
              </label>
              <input
                type="text"
                name={"chapter-title-" + (index + 1)}
                id={"chapter-title-" + (index + 1)}
                value={item.title}
                onChange={(e) => handleTitleChange(e.target.value, index)}
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-md focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Harry Potter"
                autoFocus={true}
              />
            </div>
            <div>
              <label className="block my-2 mt-4 text-xs font-medium text-gray-900 dark:text-white">
                Chapter Body
              </label>
              <Editor
                {...{
                  id: index,
                  styles: "!pt-0",
                  state: item.body,
                  handleChange: (value) => handleBodyChange(value, index),
                }}
              />
            </div>
          </main>
        </div>
      ))}

      <div className="flex justify-end mt-5">
        <button
          onClick={handleAdd}
          className="text-white bg-[#387de5] hover:bg-[#2e6dcc] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xs px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 disabled:cursor-not-allowed disabled:opacity-60 disabled:saturate-0"
        >
          Add Section
        </button>
      </div>
    </div>
  );
};

export default PublishBook;
