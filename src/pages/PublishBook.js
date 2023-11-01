import React, { useContext, useEffect } from "react";
import Page from "../components/Page Templates/Page";
import { useState } from "react";
import { CreateEPUB, Loader } from "../components";
import { base_url } from "../utils/url";
import CommonTable from "../components/Tables/CommonTable";
import {
  fetchBooks,
  excludeTags,
  fetchGeneralCountries,
  fetchChapters,
} from "../utils";
import { VscClose } from "react-icons/vsc";
import { toast } from "react-hot-toast";
import { AppContext } from "../context";

const publishBookUrl = `${base_url}/create-book-publish`;
const saveBookUrl = `${base_url}/create-book-save`;
const editUrl = `${base_url}/update-publish`;

const PublishBook = () => {
  const { user } = useContext(AppContext);
  const hasEditAccess = user.privilage["Publish Book"].Edit;
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
  const [generalCountries, setGeneralCountries] = useState(null);
  const [epub, setEpub] = useState({ type: "epub", value: null });
  const [savedBooks, setSavedBooks] = useState(null);
  const [editModal, setEditModal] = useState({ isVisible: false, data: null });
  const [state, setState] = useState(initialState);

  //* console.log("state", state);
  //* console.log("epub", epub);

  const handleChange = (e) => {
    const key = e.target.name;
    const value = e.target.value;

    setState((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    if (Object.values(state).some((e) => !e)) {
      toast.error("Please fill book details first!");
      return;
    } else if (
      epub.type === "chapters" &&
      excludeTags(epub.value.at(-1).description)
    ) {
      toast.error("Chapter Title and Body are required!");
      return;
    }

    setToggleSaveBtn(true);

    try {
      let formdata = new FormData();
      Object.keys(state).forEach((key) => formdata.append(key, state[key]));
      formdata.append("featured", "NO");
      formdata.append("country", "");
      formdata.append("read", "");
      formdata.append("download", "");

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

      //* console.log(json);

      if (json.success) {
        const book = json.success.book;
        setSavedBooks((prev) => [...prev, book]);

        setState(initialState);
        setEpub({ type: "epub", value: null });

        //* console.log("handleSave =============>", json);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setToggleSaveBtn(false);
    }
  };

  const handlePublish = async () => {
    if (Object.values(state).some((e) => !e)) {
      toast.error("Please fill book details first!");
      return;
    } else if (
      epub.type === "chapters" &&
      excludeTags(epub.value.at(-1).description)
    ) {
      toast.error("Chapter Title and Body are required!");
      return;
    }

    setTogglePublishBtn(true);

    try {
      let formdata = new FormData();
      Object.keys(state).forEach((key) => formdata.append(key, state[key]));
      formdata.append("featured", "NO");
      formdata.append("country", "");
      formdata.append("read", "");
      formdata.append("download", "");

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

      //* console.log(json);

      if (json.success) {
        setState(initialState);
        setEpub({ type: "epub", value: null });

        //* console.log("publishBook =============>", json.success);
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

  const getData = async () => {
    await fetchBookCategories();
    await fetchBookLanguages();
    await fetchGeneralCountries(setGeneralCountries);
    await fetchBooks(null, (data) =>
      setSavedBooks(
        data
          .filter((e) => e.status.toLowerCase() === "inactive")
          .map((obj) => {
            let newObj = { ...obj };
            delete newObj.updated_at;
            delete newObj.created_at;
            return newObj;
          })
      )
    );
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Page title="Publish Book">
      <main className="relative min-h-[80vh]">
        {bookCategories && bookLanguages && savedBooks ? (
          <>
            {/* Saved Books Table */}
            <div className="relative mt-4 overflow-x-auto rounded-xl">
              <CommonTable
                {...{
                  state: savedBooks,
                  template: { title: "", author: "", category: "" },
                  actionCols: ["Edit", "Publish"],
                  props: { setEditModal, setSavedBooks, hasEditAccess },
                }}
              />
            </div>

            {/* Edit Modal */}
            {editModal.isVisible && (
              <EditModal
                {...{
                  editUrl,
                  editModal,
                  setEditModal,
                  bookCategories,
                  bookLanguages,
                  generalCountries,
                }}
              />
            )}

            {/* Book Details */}
            <div className="relative w-full max-w-3xl max-h-full mx-auto">
              <div className="relative mt-2">
                <div className="p-6 space-y-6">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="title"
                        className="block mb-2 text-xs font-medium text-gray-900"
                      >
                        Title
                      </label>
                      <input
                        type="text"
                        name="title"
                        id="title"
                        value={state.title}
                        onChange={handleChange}
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                        placeholder="Book title"
                        required={true}
                      />
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="author"
                        className="block mb-2 text-xs font-medium text-gray-900"
                      >
                        Author
                      </label>
                      <input
                        type="text"
                        name="author"
                        id="author"
                        value={state.author}
                        onChange={handleChange}
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                        placeholder="Author name"
                        required={true}
                      />
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        className="block mb-2 text-xs font-medium text-gray-900"
                        htmlFor="book-cover"
                      >
                        Book Cover
                      </label>
                      <input
                        className="block w-full p-2 text-xs text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50"
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
                        className="block mb-2 text-xs font-medium text-gray-900"
                      >
                        Category
                      </label>
                      <select
                        value={state.category}
                        onChange={handleChange}
                        id="categories"
                        name="category"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
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
                        className="block mb-2 text-xs font-medium text-gray-900"
                      >
                        Language
                      </label>
                      <select
                        value={state.language}
                        onChange={handleChange}
                        id="languages"
                        name="language"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
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
                        className="block mb-2 text-xs font-medium text-gray-900"
                      >
                        Release year
                      </label>
                      <input
                        type="number"
                        name="release_year"
                        id="release_year"
                        value={state.release_year}
                        onChange={handleChange}
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                        placeholder="2020"
                        max={new Date().getFullYear()}
                        required={true}
                      />
                    </div>
                    <div className="col-span-6">
                      <label
                        htmlFor="about"
                        className="block mb-2 text-xs font-medium text-gray-900"
                      >
                        About
                      </label>
                      <textarea
                        id="about"
                        name="about"
                        rows="10"
                        value={state.about}
                        onChange={handleChange}
                        className="block p-2.5 w-full text-xs text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Write about this book..."
                      ></textarea>
                    </div>
                    <div className="flex items-center justify-around w-full col-span-6 pt-5 sm:justify-between sm:w-1/2 sm:mx-auto">
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
                          className="ml-2 text-xs font-medium text-gray-900 cursor-pointer"
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
                          className="ml-2 text-xs font-medium text-gray-900 cursor-pointer"
                        >
                          Create ePUB
                        </label>
                      </div>
                    </div>
                    {epub.type === "epub" ? (
                      <div className="w-full col-span-6 mx-auto sm:w-1/2">
                        <label
                          className="block mb-2 text-xs font-medium text-gray-900"
                          htmlFor="upload-file"
                        >
                          Upload ePUB
                        </label>
                        <input
                          className="block w-full text-xs text-gray-900 border border-gray-300 p-2 py-2.5 rounded-lg cursor-pointer bg-gray-50"
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
                <div className="flex items-center w-full pt-1 border-t border-gray-300">
                  <button
                    onClick={handleSave}
                    type="button"
                    className={`flex items-center justify-center w-full text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xs px-5 py-3 m-3 text-center disabled:opacity-50 disabled:saturate-30 ${
                      toggleSaveBtn ? "disabled:py-1" : ""
                    } disabled:cursor-not-allowed`}
                    disabled={toggleSaveBtn || epub.type === "epub"}
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
                    className="flex items-center justify-center w-full px-5 py-3 m-3 text-xs font-medium text-center text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 disabled:opacity-50 disabled:saturate-30 disabled:py-1 disabled:cursor-not-allowed"
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

const EditModal = ({
  editUrl,
  editModal,
  setEditModal,
  bookCategories,
  bookLanguages,
  generalCountries,
}) => {
  const initial_state = editModal.data;
  const initialState = [{ title: "", description: "" }];
  const [state, setState] = useState(initial_state);
  const [toggleBtn, setToggleBtn] = useState(false);
  const [editCheckbox, setEditCheckbox] = useState(false);
  const [epubState, setEpubState] = useState(initialState);

  //* console.log("state", state);

  const handleChange = (e) => {
    const key = e.target.name;
    const value = e.target.value;

    if (key === "book_cover" || key === "epub") {
      setState({ ...state, [key]: e.target.files[0] });
    } else {
      setState({ ...state, [key]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (epubState.some((e) => !e.title || excludeTags(e.description)))
      return toast.error("Please fill chapter title and body first!", {
        duration: 3000,
      });

    setToggleBtn(true);

    try {
      let formdata = new FormData();
      Object.keys(state).forEach((key) => {
        //* console.log("key", key.replace(/^_/, ""), state[key]);
        if (key.includes("read") || key.includes("download")) {
          formdata.append(key.replace(/^_/, ""), state[key] || "");
        } else {
          formdata.append(key.replace(/^_/, ""), state[key]);
        }
      });

      Object.keys(epubState).forEach((key) => {
        typeof epubState[key].id === "number" &&
          formdata.append(`chapters[${key}][id]`, epubState[key].id);
        formdata.append(`chapters[${key}][title]`, epubState[key].title);
        formdata.append(
          `chapters[${key}][description]`,
          epubState[key].description
        );

        //* console.log("key 1", epubState[key].title);
      });

      let requestOptions = {
        headers: {
          Accept: "application/json",
        },
        method: "POST",
        body: formdata,
        redirect: "follow",
      };

      const res = await fetch(`${editUrl}/${state.id}`, requestOptions);
      const json = await res.json();
      //* console.log("json ====>", json);
    } catch (err) {
      console.error(err);
      setToggleBtn(false);
    } finally {
      setEditModal({
        data: null,
        isVisible: false,
      });
    }
  };

  const close = () => setEditModal((prev) => ({ ...prev, isVisible: false }));

  useEffect(() => {
    fetchChapters(setEpubState, state.id);
  }, []);

  return (
    <>
      <div
        onClick={close}
        className={`${
          editModal.isVisible ? "" : "hidden"
        } fixed inset-0 flex justify-center items-center z-20 bg-black/50`}
      />
      <div
        tabIndex="-1"
        className={`${
          editModal.isVisible ? "" : "hidden"
        } fixed z-20 flex items-center justify-center w-full p-4 overflow-x-hidden overflow-y-auto inset-0 h-[calc(100%-1rem)] max-h-full pointer-events-none`}
      >
        <div className="relative w-full max-w-2xl max-h-full pointer-events-auto">
          {/* Modal content */}
          <div
            // action="#"
            // onSubmit={handleSubmit}
            className="relative bg-white rounded-lg shadow"
          >
            {/* Modal header */}
            <div className="flex items-start justify-between p-4 border-b rounded-t">
              <h3 className="text-xl font-semibold text-gray-900">Edit</h3>
              <button
                onClick={close}
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-base p-1.5 ml-auto inline-flex items-center"
              >
                <VscClose />
              </button>
            </div>
            {/* Modal body */}
            <div className="p-6 space-y-6 max-h-[70vh] overflow-y-scroll">
              <div className="grid grid-cols-6 gap-6">
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="title"
                    className="block mb-2 text-xs font-medium text-gray-900"
                  >
                    Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    id="title"
                    value={state.title}
                    onChange={handleChange}
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 disabled:opacity-70"
                    placeholder="Lorem ipsum"
                    disabled={true}
                  />
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="author"
                    className="block mb-2 text-xs font-medium text-gray-900"
                  >
                    Author
                  </label>
                  <input
                    type="text"
                    name="_author"
                    id="author"
                    value={state.author}
                    onChange={handleChange}
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 disabled:opacity-70"
                    placeholder="Lorem ipsum"
                    disabled={true}
                  />
                </div>
                {/* {editUser.ePUB_Type === "file" && (
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      className="block mb-2 text-xs font-medium text-gray-900"
                      htmlFor="ePUB"
                      >
                      Upload ePUB
                      </label>
                    <input
                      className="block w-full p-2 text-xs text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50"
                      id="ePUB"
                      name="epub"
                      onChange={handleChange}
                      type="file"
                      />
                  </div>
                )} */}
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="categories"
                    className="block mb-2 text-xs font-medium text-gray-900"
                  >
                    Category
                  </label>
                  <select
                    name="category"
                    value={state.category}
                    onChange={handleChange}
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                    id="categories"
                    disabled={true}
                  >
                    {bookCategories.map((item, indx) => (
                      <option
                        className="text-sm"
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
                    className="block mb-2 text-xs font-medium text-gray-900"
                  >
                    Language
                  </label>
                  <select
                    name="_language"
                    value={state.language}
                    onChange={handleChange}
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                    id="languages"
                    disabled={true}
                  >
                    {bookLanguages.map((item, indx) => (
                      <option
                        className="text-sm"
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
                    htmlFor="country"
                    className="block mb-2 text-xs font-medium text-gray-900"
                  >
                    Country
                  </label>
                  <select
                    id="country"
                    name="country"
                    value={state.country}
                    onChange={handleChange}
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                    disabled={true}
                  >
                    {generalCountries.map(({ country_name }) => (
                      <option
                        className="text-sm"
                        key={country_name}
                        value={country_name}
                      >
                        {country_name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="downloads"
                    className="block mb-2 text-xs font-medium text-gray-900"
                  >
                    Downloads
                  </label>
                  <input
                    type="number"
                    name="download"
                    id="downloads"
                    value={state.download}
                    onChange={handleChange}
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 disabled:opacity-70"
                    placeholder="1613"
                    disabled={true}
                  />
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="reads"
                    className="block mb-2 text-xs font-medium text-gray-900"
                  >
                    Reads
                  </label>
                  <input
                    type="number"
                    name="read"
                    id="reads"
                    value={state.read}
                    onChange={handleChange}
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 disabled:opacity-70"
                    placeholder="1613"
                    disabled={true}
                  />
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="status"
                    className="block mb-2 text-xs font-medium text-gray-900"
                  >
                    Status
                  </label>
                  <select
                    name="status"
                    value={state.status.toUpperCase()}
                    onChange={handleChange}
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                    id="status"
                    disabled={true}
                  >
                    {["ACTIVE", "INACTIVE"].map((elem) => (
                      <option className="text-sm" key={elem} value={elem}>
                        {elem}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="release_year"
                    className="block mb-2 text-xs font-medium text-gray-900"
                  >
                    Release year
                  </label>
                  <input
                    type="number"
                    name="_release_year"
                    value={state.release_year}
                    onChange={handleChange}
                    id="release_year"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 disabled:opacity-70"
                    placeholder="2020"
                    max={new Date().getFullYear()}
                    disabled={true}
                  />
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="feature"
                    className="block mb-2 text-xs font-medium text-gray-900"
                  >
                    Featured
                  </label>
                  <select
                    name="featured"
                    value={state.featured}
                    onChange={handleChange}
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                    id="featured"
                    disabled={true}
                  >
                    {["Yes", "No"].map((item) => (
                      <option className="text-sm" key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-span-6">
                  <label
                    htmlFor="about"
                    className="block mb-2 text-xs font-medium text-gray-900"
                  >
                    About
                  </label>
                  <textarea
                    id="about"
                    name="_about"
                    rows="10"
                    value={state.about}
                    onChange={handleChange}
                    className="block p-2.5 w-full text-xs text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-70"
                    placeholder="Write about this book..."
                    disabled={true}
                  ></textarea>
                </div>
                <div className="flex items-center justify-center col-span-6 pt-2">
                  <input
                    id="edit-epub-html"
                    type="checkbox"
                    onChange={(e) => setEditCheckbox(e.target.checked)}
                    checked={editCheckbox}
                    value="edit-epub-html"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label
                    htmlFor="edit-epub-html"
                    className="ml-2 text-xs font-medium text-gray-900 cursor-pointer"
                  >
                    Edit ePUB HTML
                  </label>
                </div>
                {editCheckbox && (
                  <div className="col-span-6">
                    <p className="my-3 text-sm font-semibold text-center">
                      Edit ePUB
                    </p>
                    <CreateEPUB
                      {...{
                        state: epubState,
                        setState: setEpubState,
                        deleteChapter: true,
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
            {/* Modal footer */}
            <div className="flex items-center p-4 border-t border-gray-200 rounded-b">
              <button
                type="button"
                onClick={handleSubmit}
                className="flex items-center justify-center w-full px-5 py-3 text-xs font-medium text-center text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 disabled:cursor-not-allowed"
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
          </div>
        </div>
      </div>
    </>
  );
};

export default PublishBook;
