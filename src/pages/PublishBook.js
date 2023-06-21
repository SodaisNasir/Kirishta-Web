import React, { useEffect } from "react";
import Page from "../components/Page Templates/Page";
import { useState } from "react";
import { CreateEPUB, Loader } from "../components";
import { MdEdit } from "react-icons/md";
import { base_url } from "../utils/url";

const PublishBook = () => {
  const initialEPUBState = [{ title: "", body: "" }];
  const initialState = {
    title: "",
    author: "",
    cover_image: "",
    category: "",
    release_year: "",
    language: "",
    about: "",
    epub: initialEPUBState,
  };
  const [bookCategories, setBookCategories] = useState([]);
  const [bookLanguages, setBookLanguages] = useState([]);
  const [ePUB, setEPUB] = useState({ type: "file", file: "" });
  const [state, setState] = useState(initialState);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    console.log("Submit", state);
  };

  const fetchBookCategories = async () => {
    try {
      const res = await fetch(`${base_url}/book-category`);
      const json = await res.json();

      if (json.success) {
        setBookCategories(json.success.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchBookLanguages = async () => {
    try {
      const res = await fetch(`${base_url}/book-language`);
      const json = await res.json();

      if (json.success) {
        setBookLanguages(json.success.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (ePUB.type !== "create-epub") {
      setState(initialState);
    }
  }, [ePUB.type]);

  useEffect(() => {
    fetchBookCategories();
    fetchBookLanguages();
  }, []);

  return (
    <Page title="Publish Book">
      <main className="relative min-h-[80vh]">
        {bookCategories && bookLanguages ? (
          <>
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
                        value={state.title}
                        onChange={handleChange}
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
                        value={state.author}
                        onChange={handleChange}
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
                        value={state.cover_image}
                        onChange={handleChange}
                        id="cover_image"
                        name="cover_image"
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
                        value={state.category}
                        onChange={handleChange}
                        id="categories"
                        name="category"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      >
                        {bookCategories.map((item, indx) => (
                          <option
                            className="text-xs"
                            key={item.category + indx}
                            value={item.category}
                          >
                            {item.category}
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
                        value={state.language}
                        onChange={handleChange}
                        id="languages"
                        name="language"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      >
                        {bookLanguages.map((item, indx) => (
                          <option
                            className="text-xs"
                            key={item.language + indx}
                            value={item.language}
                          >
                            {item.language}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="release_year"
                        className="block mb-2 text-xs font-medium text-gray-900 dark:text-white"
                      >
                        Release year
                      </label>
                      <input
                        type="number"
                        name="release_year"
                        id="release_year"
                        value={state.release_year}
                        onChange={handleChange}
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
                        name="about"
                        rows="8"
                        value={state.about}
                        onChange={handleChange}
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
                              file: e.target.files[0],
                            }))
                          }
                          placeholder="https://www.example.com"
                        />
                      </div>
                    ) : (
                      <CreateEPUB
                        {...{
                          state: state.epub,
                          setState: (data) =>
                            setState((prev) => ({ ...prev, epub: data })),
                        }}
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
          </>
        ) : (
          <Loader />
        )}
      </main>
    </Page>
  );
};

export default PublishBook;
