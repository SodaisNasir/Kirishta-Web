import React, { useEffect } from "react";
import Page from "../components/Page Templates/Page";
import { useState } from "react";
import { CreateEPUB, EditModal, Loader } from "../components";
import { base_url } from "../utils/url";
import CommonTable from "../components/Tables/CommonTable";
import { fetchBooks } from "../utils";

const publishBookUrl = `${base_url}/create-book-publish`;
const saveBookUrl = `${base_url}/create-book-save`;

const PublishBook = () => {
  const initialEPUBState = [{ title: "", description: "" }];
  const initialState = {
    title: "",
    author: "",
    cover_image: null,
    category: "",
    release_year: "",
    language: "",
    about: "",
  };
  const [togglePublishBtn, setTogglePublishBtn] = useState(false);
  const [toggleSaveBtn, setToggleSaveBtn] = useState(false);
  const [bookCategories, setBookCategories] = useState(null);
  const [bookLanguages, setBookLanguages] = useState(null);
  const [epub, setEpub] = useState({ type: "epub", value: null });
  const [savedBooks, setSavedBooks] = useState(null);
  const [editModal, setEditModal] = useState({ isVisible: false, data: null });
  const [state, setState] = useState(initialState);

  console.log("state", state);
  console.log("epub", epub);

  const handleChange = (e) => {
    const key = e.target.name;
    const value = e.target.value;

    setState((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    console.log("Save", state);

    try {
      let formdata = new FormData();
      Object.keys(state).forEach((key) =>
        formdata.append(key.replace(/^_/, ""), state[key])
      );

      if (epub.type === "chapters") {
        Object.keys(epub.value).forEach((key) => {
          formdata.append(`chapters[${key}][title]`, epub.value[key].title);
          formdata.append(
            `chapters[${key}][description]`,
            epub.value[key].description
          );
        });
      } else {
        formdata.append("epub", epub.value);
      }

      let requestOptions = {
        headers: {
          Accept: "application/json",
        },
        method: "POST",
        body: formdata,
        redirect: "follow",
      };

      const res = await fetch(saveBookUrl, requestOptions);
      const json = await res.json();

      console.log(json);

      if (json.success.status == 200) {
        const updatedData = json.success.data;
        let data = { id: null, ...state };
        Object.keys(data).forEach(
          (key) => (data[key] = updatedData[key.replace(/^_/, "")])
        );

        setState(initialState);
        setEpub({ type: "epub", value: null });

        console.log("createNewModal =============>", data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setToggleSaveBtn(false);
    }
  };

  const handlePublish = async () => {
    console.log("Submit", state);

    try {
      let formdata = new FormData();
      Object.keys(state).forEach((key) =>
        formdata.append(key.replace(/^_/, ""), state[key])
      );

      if (epub.type === "chapters") {
        Object.keys(epub.value).forEach((key) => {
          formdata.append(`chapters[${key}][title]`, epub.value[key].title);
          formdata.append(
            `chapters[${key}][description]`,
            epub.value[key].description
          );
        });
      } else {
        formdata.append("epub", epub.value);
      }

      let requestOptions = {
        headers: {
          Accept: "application/json",
        },
        method: "POST",
        body: formdata,
        redirect: "follow",
      };

      const res = await fetch(publishBookUrl, requestOptions);
      const json = await res.json();

      console.log(json);

      if (json.success.status == 200) {
        const updatedData = json.success.data;
        let data = { id: null, ...state };
        Object.keys(data).forEach(
          (key) => (data[key] = updatedData[key.replace(/^_/, "")])
        );

        setState(initialState);
        setEpub({ type: "epub", value: null });

        console.log("createNewModal =============>", data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setTogglePublishBtn(false);
    }
  };

  const fetchBookCategories = async () => {
    try {
      const res = await fetch(`${base_url}/book-category`);
      const json = await res.json();

      if (json.success) {
        const data = json.success.data;
        setBookCategories(data);
        setState((prev) => ({ ...prev, category: data[0].category }));
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
        const data = json.success.data;
        setBookLanguages(data);
        setState((prev) => ({ ...prev, language: data[0].language }));
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchBookCategories();
    fetchBookLanguages();
    fetchBooks(setSavedBooks);
  }, []);

  return (
    <Page title="Publish Book">
      <main className="relative min-h-[80vh]">
        {bookCategories && bookLanguages && savedBooks ? (
          <>
            {/* Saved Books Table */}
            <div className="relative overflow-x-auto rounded-xl mt-4">
              <CommonTable
                {...{
                  state: savedBooks,
                  template: { title: "", author: "", category: "" },
                  actionCols: ["Edit"],
                  props: { setEditModal },
                }}
              />
            </div>

            {/* Edit Modal */}
            {editModal.isVisible && (
              <EditModal
                {...{
                  editModal,
                  setEditModal,
                  statusType: "active/inactive",
                  bookCategories,
                  bookLanguages,
                }}
              />
            )}

            {/* Book Details */}
            <div className="relative w-full mx-auto max-w-3xl max-h-full">
              <div className="relative mt-2 dark:bg-gray-700">
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
                        onChange={(e) =>
                          setState((prev) => ({
                            ...prev,
                            cover_image: e.target.files[0],
                          }))
                        }
                        id="cover_image"
                        name="cover_image"
                        accept="image/*"
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
                        rows="10"
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
                          value="epub"
                          onChange={(e) =>
                            setEpub({ type: "epub", value: null })
                          }
                          checked={epub.type === "epub"}
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
                          value="chapters"
                          onChange={(e) =>
                            setEpub({
                              type: "chapters",
                              value: initialEPUBState,
                            })
                          }
                          checked={epub.type === "chapters"}
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
                    {epub.type === "epub" ? (
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
                            setEpub({
                              type: "epub",
                              value: e.target.files[0],
                            })
                          }
                          placeholder="https://www.example.com"
                          required={true}
                        />
                      </div>
                    ) : (
                      <CreateEPUB
                        {...{
                          state: epub.value,
                          setState: (value) =>
                            setEpub({ type: "chapters", value }),
                        }}
                      />
                    )}
                  </div>
                </div>
                <div className="w-full grid grid-cols-2 gap-6 p-6 pt-4 border-t border-gray-300 dark:border-gray-600">
                  <button
                    onClick={handleSave}
                    type="button"
                    className="w-full text-white bg-[#387de5] hover:bg-[#2e6dcc] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xs px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 disabled:opacity-50 disabled:saturate-30 disabled:py-1 disabled:cursor-not-allowed"
                    disabled={toggleSaveBtn}
                  >
                    {toggleSaveBtn ? (
                      <>
                        <Loader extraStyles="!static !inset-auto !block !scale-50 !bg-transparent !saturate-100" />
                        Saving
                      </>
                    ) : (
                      "Save"
                    )}
                  </button>
                  <button
                    onClick={handlePublish}
                    type="button"
                    className="w-full text-white bg-[#387de5] hover:bg-[#2e6dcc] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xs px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 disabled:opacity-50 disabled:saturate-30 disabled:py-1 disabled:cursor-not-allowed"
                    disabled={togglePublishBtn}
                  >
                    {togglePublishBtn ? (
                      <>
                        <Loader extraStyles="!static !inset-auto !block !scale-50 !bg-transparent !saturate-100" />
                        Publishing
                      </>
                    ) : (
                      "Publish"
                    )}
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
