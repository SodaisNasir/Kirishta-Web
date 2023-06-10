import React, { useEffect } from "react";
import Page from "../components/Page Templates/Page";
import { bookCategories, bookLanguages } from "../constants/data";
import { useState } from "react";
import { CreateEPUB } from "../components";
import { MdEdit } from "react-icons/md";

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
        {/* Saved Books Table */}
        <div className="relative overflow-x-auto rounded-xl mt-4">
          <table className="w-full text-xs text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="text-center px-6 py-3">
                  Book Name
                </th>
                <th scope="col" className="text-center px-6 py-3">
                  Author
                </th>
                <th scope="col" className="text-center px-6 py-3">
                  Category
                </th>
                <th scope="col" className="text-center px-6 py-3">
                  Edit
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td className="text-center px-6 py-2.5">lorem ipsum</td>
                <td className="text-center px-6 py-2.5">lorem ipsum</td>
                <td className="text-center px-6 py-2.5">lorem ipsum</td>
                <td className="text-center text-base px-6 py-2.5">
                  <button className="font-medium text-gray-600 hover:text-gray-800">
                    <MdEdit />
                  </button>
                </td>
              </tr>
              <tr className="bg-white dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td className="text-center px-6 py-2.5">lorem ipsum</td>
                <td className="text-center px-6 py-2.5">lorem ipsum</td>
                <td className="text-center px-6 py-2.5">lorem ipsum</td>
                <td className="text-center text-base px-6 py-2.5">
                  <button className="font-medium text-gray-600 hover:text-gray-800">
                    <MdEdit />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Book Details */}
        <div className="relative w-full mx-auto max-w-3xl max-h-full">
          <div
            // action="#"
            // onSubmit={handleSubmit}
            className="relative mt-2 dark:bg-gray-700"
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
                    className="block mb-2 text-xs font-medium text-gray-900 dark:text-white"
                    htmlFor="book-cover"
                  >
                    Book Cover
                  </label>
                  <input
                    className="block w-full text-xs text-gray-900 border border-gray-300 p-2 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                    id="book-cover"
                    type="file"
                  />
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="categories"
                    className="block mb-2 text-xs font-medium text-gray-900 dark:text-white"
                  >
                    Category
                  </label>
                  <select
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    id="categories"
                  >
                    {bookCategories.map((category, indx) => (
                      <option
                        className="text-xs"
                        key={category + indx}
                        value={category}
                      >
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="languages"
                    className="block mb-2 text-xs font-medium text-gray-900 dark:text-white"
                  >
                    Language
                  </label>
                  <select
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    id="languages"
                  >
                    {bookLanguages.map((language, indx) => (
                      <option
                        className="text-xs"
                        key={language + indx}
                        value={language}
                      >
                        {language}
                      </option>
                    ))}
                  </select>
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

export default PublishBook;
