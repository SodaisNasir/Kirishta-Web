import React, { useEffect, useState } from "react";
import AdvancedTable from "../components/Tables/AdvancedTable";
import { CreateEPUB, Page, Actions, Loader } from "../components";
import { BiSearch } from "react-icons/bi";
import { CountryFilter } from "../components";
import { DropdownFilter } from "../components/helpers";
import { VscClose } from "react-icons/vsc";
import { base_url } from "../utils/url";
import { fetchChapters, fetchData } from "../utils";

const showAllBooks = `${base_url}/books`;
const editUrl = `${base_url}/update-publish`;
const deleteUrl = `${base_url}/delete-book`;

const BooksManagement = () => {
  const initial_filters = {
    searchInput: "",
    toggleCountry: false,
    toggleStatus: false,
  };
  const [paginatedData, setPaginatedData] = useState({
    items: [],
    curItems: [],
  });
  const [curFilter, setCurFilter] = useState({
    filter: null,
    value: null,
  });
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState(initial_filters);
  const { searchInput, toggleCountry, toggleStatus } = filters;
  const [bookCategories, setBookCategories] = useState(null);
  const [bookLanguages, setBookLanguages] = useState(null);
  const [editUser, setEditUser] = useState({ isVisible: false, data: null });
  const [viewModal, setViewModal] = useState({ isVisible: false, data: null });
  const setSingleFilter = (key, value) => {
    setFilters({ ...initial_filters, [key]: value });
  };

  const fetchBookCategories = async () => {
    try {
      const res = await fetch(`${base_url}/book-category`);
      const json = await res.json();

      if (json.success) {
        const data = json.success.data;
        setBookCategories(data);
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
      }
    } catch (error) {
      console.error(error);
    }
  };

  const filterUsersBySearch = (e) => {
    const value = e.target.value;
    setSingleFilter("searchInput", value);
    setCurFilter({ filter: "searchInput", value });

    if (value === "") {
      setPaginatedData((prev) => ({ ...prev, items: data }));
    } else if (value) {
      setPaginatedData((prev) => ({
        ...prev,
        items: data.filter(
          (user) =>
            user.title.toLowerCase().includes(value.toLowerCase()) ||
            user._about.toLowerCase().includes(value.toLowerCase())
        ),
      }));
    }
  };

  useEffect(() => {
    if (curFilter.filter && curFilter.filter !== "searchInput") {
      setPaginatedData((prev) => ({
        ...prev,
        items: data.filter(
          (item) =>
            item[curFilter.filter].toLowerCase() ===
            curFilter.value.toLowerCase()
        ),
      }));
    } else if (curFilter.filter !== "searchInput") {
      setPaginatedData((prev) => ({
        ...prev,
        items: data,
      }));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [curFilter]);

  const neededProps = [
    "id",
    "title",
    "_author",
    "cover_image",
    "category",
    "_release_year",
    "_language",
    "_about",
    "status",
    "download",
    "read",
  ];

  useEffect(() => {
    fetchBookCategories();
    fetchBookLanguages();
    fetchData(setPaginatedData, setData, neededProps, showAllBooks);
  }, []);

  return (
    <Page title={"Books Management"}>
      <main>
        <AdvancedTable
          {...{
            data,
            setData,
            deleteUrl,
            paginatedData,
            setPaginatedData,
            Actions,
            actionCols: ["View", "Edit", "Delete"],
            props: { setEditModal: setEditUser, setViewModal },
          }}
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between py-4 bg-white dark:bg-gray-800">
            {/* Search bar start */}
            <label htmlFor="table-search" className="sr-only">
              Search
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <BiSearch />
              </div>
              <input
                type="text"
                id="table-search-users"
                value={searchInput}
                onChange={filterUsersBySearch}
                className="block w-full md:w-80 p-2 pl-10 text-xs text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search for books"
              />
            </div>
            {/* Search bar end */}
            {/* Dropdown Filters Start */}
            <div className="flex justify-between items-center w-full self-end lg:self-auto lg:w-auto mt-3 lg:mt-0">
              <div className="hidden xs:block lg:hidden text-xs font-medium text-gray-700">
                {paginatedData.items.length} results
              </div>

              <div className="w-full flex justify-between xs:w-auto xs:justify-normal">
                <CountryFilter
                  {...{
                    toggle: toggleCountry,
                    curFilter,
                    setToggle: () =>
                      setSingleFilter("toggleCountry", !toggleCountry),
                    handleClick: (data) =>
                      setCurFilter({
                        filter: data === null ? null : "_country",
                        value: data === null ? null : data.title,
                      }),
                  }}
                />

                <DropdownFilter
                  arr={["ACTIVE", "INACTIVE"]}
                  title={"Status"}
                  toggle={toggleStatus}
                  curFilter={curFilter}
                  setToggle={() =>
                    setSingleFilter("toggleStatus", !toggleStatus)
                  }
                  handleClick={(value) =>
                    setCurFilter({ filter: value ? "status" : null, value })
                  }
                />
                {/* Edit User modal */}
                {editUser.isVisible && (
                  <EditUserModal
                    {...{
                      editUser,
                      setEditUser,
                      editUrl,
                      setData,
                      setPaginatedData,
                      bookCategories,
                      bookLanguages,
                    }}
                  />
                )}

                {/* View modal */}
                {viewModal.isVisible && (
                  <ViewModal {...{ viewModal, setViewModal }} />
                )}
              </div>
            </div>
          </div>
        </AdvancedTable>
      </main>
    </Page>
  );
};

const ViewModal = ({ viewModal, setViewModal }) => {
  const keys = Object.keys(viewModal.data);
  const data = viewModal.data;

  const close = () => setViewModal((prev) => ({ ...prev, isVisible: false }));

  return (
    <>
      <div
        onClick={close}
        className={`${
          viewModal.isVisible ? "" : "hidden"
        } fixed inset-0 flex justify-center items-center z-20 bg-black/50`}
      />
      <div
        tabIndex="-1"
        className={`${
          viewModal.isVisible ? "" : "hidden"
        } fixed z-20 flex items-center justify-center w-full p-4 overflow-x-hidden overflow-y-auto inset-0 h-[calc(100%-1rem)] max-h-full pointer-events-none`}
      >
        <div className="relative w-full max-w-2xl max-h-full pointer-events-auto">
          {/* Modal content */}
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            {/* Modal header */}
            <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                View
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
            <div className="p-5 space-y-6 max-h-[72vh] overflow-y-scroll">
              <div className="grid grid-cols-6 gap-3">
                {keys.map((elem) => (
                  <div
                    key={elem}
                    className="col-span-6 sm:col-span-3 flex flex-col justify-center p-2 border rounded-md bg-gray-50"
                  >
                    <p className="block mb-1.5 text-sm font-semibold text-gray-900 dark:text-white capitalize">
                      {elem === "id" ? "S/N" : elem.replace(/_/g, " ")}
                    </p>
                    <p className="block text-xs font-medium text-gray-700 dark:text-white">
                      {elem.includes("image") ? (
                        <img className="h-10" src={data[elem]} alt="cover" />
                      ) : !data[elem] ? (
                        "No data!"
                      ) : (
                        data[elem]
                      )}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            {/* Modal footer */}
            <div className="flex items-center p-4 border-t border-gray-200 rounded-b dark:border-gray-600">
              <button
                onClick={close}
                type="button"
                className="w-full text-white bg-blue-500 hover:bg-blue-600 focus:ring-2 focus:outline-none focus:ring-blue-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const EditUserModal = ({
  editUser,
  setEditUser,
  editUrl,
  setPaginatedData,
  setData,
  bookCategories,
  bookLanguages,
}) => {
  const initial_state = editUser.data;
  const initialState = [{ title: "", description: "" }];
  const [state, setState] = useState(initial_state);
  const [toggleBtn, setToggleBtn] = useState(false);
  const [editCheckbox, setEditCheckbox] = useState(false);
  const [epubState, setEpubState] = useState(initialState);

  console.log("epubState", epubState);

  const keys = Object.keys(state);

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
    setToggleBtn(true);

    try {
      let formdata = new FormData();
      keys.forEach((key) => formdata.append(key.replace(/^_/, ""), state[key]));
      Object.keys(epubState).forEach((key) => {
        formdata.append(`chapters[${key}][title]`, epubState[key].title);
        formdata.append(
          `chapters[${key}][description]`,
          epubState[key].description
        );
      });
      // formdata.append("chapters", JSON.stringify(epubState));

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

      if (json.success) {
        const updatedData = json.success.data;
        let data = { id: null, ...state };
        Object.keys(data).forEach(
          (key) => (data[key] = updatedData[key.replace(/^_/, "")])
        );

        console.log("EditModal =============>", data);

        setData((prev) =>
          prev.map((item) => (item.id === state.id ? data : item))
        );
        setPaginatedData((prev) => ({
          ...prev,
          items: prev.items.map((item) => (item.id === state.id ? data : item)),
        }));
      }
    } catch (err) {
      console.error(err);
      setToggleBtn(false);
    } finally {
      setEditUser({
        data: null,
        isVisible: false,
      });
    }
  };

  const close = () => setEditUser((prev) => ({ ...prev, isVisible: false }));

  useEffect(() => {
    fetchChapters(setEpubState, state.id);
  }, []);

  return (
    <>
      <div
        onClick={close}
        className={`${
          editUser.isVisible ? "" : "hidden"
        } fixed inset-0 flex justify-center items-center z-20 bg-black/50`}
      />
      <div
        tabIndex="-1"
        className={`${
          editUser.isVisible ? "" : "hidden"
        } fixed z-20 flex items-center justify-center w-full p-4 overflow-x-hidden overflow-y-auto inset-0 h-[calc(100%-1rem)] max-h-full pointer-events-none`}
      >
        <div className="relative w-full max-w-2xl max-h-full pointer-events-auto">
          {/* Modal content */}
          <div
            // action="#"
            // onSubmit={handleSubmit}
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
                    className="block mb-2 text-xs font-medium text-gray-900 dark:text-white"
                    htmlFor="cover_image"
                  >
                    Cover Image
                  </label>
                  <input
                    className="block w-full text-xs text-gray-900 border border-gray-300 p-2 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                    onChange={handleChange}
                    id="cover_image"
                    name="cover_image"
                    type="file"
                  />
                </div>
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
                    placeholder="Lorem ipsum"
                    defaultValue={editUser.data.Title}
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
                    name="_author"
                    id="author"
                    value={state._author}
                    onChange={handleChange}
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Lorem ipsum"
                    defaultValue={editUser.data.Author}
                  />
                </div>
                {/* {editUser.ePUB_Type === "file" && (
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      className="block mb-2 text-xs font-medium text-gray-900 dark:text-white"
                      htmlFor="ePUB"
                    >
                      Upload ePUB
                    </label>
                    <input
                      className="block w-full text-xs text-gray-900 border border-gray-300 p-2 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
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
                    className="block mb-2 text-xs font-medium text-gray-900 dark:text-white"
                  >
                    Category
                  </label>
                  <select
                    name="category"
                    value={state.category}
                    onChange={handleChange}
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    id="categories"
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
                    className="block mb-2 text-xs font-medium text-gray-900 dark:text-white"
                  >
                    Language
                  </label>
                  <select
                    name="_language"
                    value={state._language}
                    onChange={handleChange}
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    id="languages"
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
                {/* <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="countries"
                    className="block mb-2 text-xs font-medium text-gray-900 dark:text-white"
                  >
                    Country
                  </label>
                  <select
                    defaultValue={editUser.data._Country}
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    id="countries"
                  >
                    {parishCountries.map((country) => (
                      <option
                        className="text-sm"
                        key={country.title}
                        value={country.title}
                      >
                        {country.title}
                      </option>
                    ))}
                  </select>
                </div> */}
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="downloads"
                    className="block mb-2 text-xs font-medium text-gray-900 dark:text-white"
                  >
                    Downloads
                  </label>
                  <input
                    type="number"
                    name="download"
                    id="downloads"
                    value={state.download}
                    onChange={handleChange}
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="1613"
                  />
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="reads"
                    className="block mb-2 text-xs font-medium text-gray-900 dark:text-white"
                  >
                    Reads
                  </label>
                  <input
                    type="number"
                    name="read"
                    id="reads"
                    value={state.read}
                    onChange={handleChange}
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="1613"
                  />
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="status"
                    className="block mb-2 text-xs font-medium text-gray-900 dark:text-white"
                  >
                    Status
                  </label>
                  <select
                    name="status"
                    value={state.status}
                    onChange={handleChange}
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    id="status"
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
                    className="block mb-2 text-xs font-medium text-gray-900 dark:text-white"
                  >
                    Release year
                  </label>
                  <input
                    type="number"
                    name="_release_year"
                    value={state._release_year}
                    onChange={handleChange}
                    id="release_year"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="2020"
                    max={new Date().getFullYear()}
                  />
                </div>
                {/* <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="feature"
                    className="block mb-2 text-xs font-medium text-gray-900 dark:text-white"
                    >
                    Featured
                  </label>
                  <select
                  name="featured"
                    value={state.featured}
                    onChange={handleChange}
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    id="featured"
                  >
                    {["Yes", "No"].map((item) => (
                      <option className="text-sm" key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </div> */}
                <div className="col-span-6 sm:col-span-3 flex items-center justify-center pt-6">
                  <input
                    id="edit-epub-html"
                    type="checkbox"
                    onChange={(e) => setEditCheckbox(e.target.checked)}
                    checked={editCheckbox}
                    value="edit-epub-html"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    htmlFor="edit-epub-html"
                    className="ml-2 text-xs font-medium text-gray-900 dark:text-gray-300 cursor-pointer"
                  >
                    Edit ePUB HTML
                  </label>
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
                    name="_about"
                    rows="10"
                    value={state._about}
                    onChange={handleChange}
                    className="block p-2.5 w-full text-xs text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Write about this book..."
                  ></textarea>
                </div>
                {editCheckbox && (
                  <div className="col-span-6">
                    <p className="text-sm font-semibold text-center my-3">
                      Edit ePUB
                    </p>
                    <CreateEPUB
                      {...{
                        state: epubState,
                        setState: setEpubState,
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
            {/* Modal footer */}
            <div className="flex items-center p-4 border-t border-gray-200 rounded-b dark:border-gray-600">
              <button
                type="button"
                onClick={handleSubmit}
                className="flex justify-center items-center w-full text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xs px-5 py-3 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 disabled:opacity-50 disabled:saturate-30 disabled:py-1 disabled:cursor-not-allowed"
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

export default BooksManagement;
