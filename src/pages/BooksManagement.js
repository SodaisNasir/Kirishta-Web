import React, { useContext, useEffect, useState } from "react";
import AdvancedTable from "../components/Tables/AdvancedTable";
import { CreateEPUB, Page, Actions, Loader } from "../components";
import { BiSearch } from "react-icons/bi";
import { CountryFilter } from "../components";
import { DropdownFilter } from "../components/helpers";
import { VscClose } from "react-icons/vsc";
import { base_url } from "../utils/url";
import {
  excludeTags,
  fetchBookLanguages,
  fetchChapters,
  fetchData,
  fetchGeneralCountries,
} from "../utils";
import { AppContext } from "../context";
import { toast } from "react-hot-toast";

const showAllBooks = `${base_url}/books`;
const editUrl = `${base_url}/update-publish`;
const deleteUrl = `${base_url}/delete-book`;

const BooksManagement = () => {
  const { user } = useContext(AppContext);
  const books = user.privilage["Books Management"];
  const hasDeleteAccess = books.Delete;
  const hasEditAccess = books.Edit;
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
  const [isDataFetched, setIsDataFetched] = useState(false);
  const [bookCategories, setBookCategories] = useState(null);
  const [bookLanguages, setBookLanguages] = useState(null);
  const [generalCountries, setGeneralCountries] = useState(null);
  const [editModal, setEditModal] = useState({ isVisible: false, data: null });
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
          (item) =>
            item.title.toLowerCase().includes(value.toLowerCase()) ||
            item._about.toLowerCase().includes(value.toLowerCase())
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
            item[curFilter.filter]?.toLowerCase() ===
            curFilter.value?.toLowerCase()
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
    "_about",
    "_language",
    "country",
    "_featured",
    "status",
    "download",
    "read",
  ];

  const getData = async () => {
    await fetchBookCategories();
    await fetchGeneralCountries(setGeneralCountries);
    await fetchBookLanguages(setBookLanguages);
    await fetchData({
      setPaginatedData,
      setData,
      neededProps,
      url: showAllBooks,
      setIsDataFetched,
      sort: (data) => data.sort((a, b) => b.id - a.id),
    });
  };

  useEffect(() => {
    getData();
  }, []);

  const tableTemplate = Object.fromEntries(neededProps.map((e) => [e, ""]));

  return (
    <Page title={"Books Management"}>
      <main>
        <AdvancedTable
          {...{
            data,
            setData,
            deleteUrl,
            isDataFetched,
            tableTemplate,
            paginatedData,
            setPaginatedData,
            Actions,
            actionCols: ["View", "Edit", "Delete"],
            props: {
              setEditModal,
              setViewModal,
              hasDeleteAccess,
              hasEditAccess,
            },
          }}
        >
          <div className="flex flex-col py-4 bg-white lg:flex-row lg:items-center lg:justify-between">
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
                className="block w-full p-2 pl-10 text-xs text-gray-900 border border-gray-300 rounded-lg md:w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Search for books"
              />
            </div>
            {/* Search bar end */}
            {/* Dropdown Filters Start */}
            <div className="flex items-center self-end justify-between w-full mt-3 lg:self-auto lg:w-auto lg:mt-0">
              <div className="hidden text-xs font-medium text-gray-700 xs:block lg:hidden">
                {paginatedData.items.length} results
              </div>

              <div className="flex justify-between w-full xs:w-auto xs:justify-normal">
                <CountryFilter
                  {...{
                    toggle: toggleCountry,
                    curFilter,
                    setToggle: () =>
                      setSingleFilter("toggleCountry", !toggleCountry),
                    handleClick: (data) =>
                      setCurFilter({
                        filter: data === null ? null : "country",
                        value: data === null ? null : data.country_name,
                      }),
                    countries: generalCountries,
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
                {editModal.isVisible && (
                  <EditModal
                    {...{
                      editModal,
                      setEditModal,
                      editUrl,
                      setData,
                      setPaginatedData,
                      bookCategories,
                      bookLanguages,
                      generalCountries,
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
          <div className="relative bg-white rounded-lg shadow">
            {/* Modal header */}
            <div className="flex items-start justify-between p-4 border-b rounded-t">
              <h3 className="text-xl font-semibold text-gray-900">View</h3>
              <button
                onClick={close}
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-base p-1.5 ml-auto inline-flex items-center"
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
                    className={`flex flex-col justify-center ${
                      elem === "_about"
                        ? "col-span-6"
                        : "col-span-6 sm:col-span-3"
                    } p-2 border rounded-md bg-gray-50`}
                  >
                    <p className="block mb-1.5 text-sm font-semibold text-gray-900 capitalize">
                      {elem === "id" ? "S/N" : elem.replace(/_/g, " ")}
                    </p>
                    <p className="block text-xs font-medium text-gray-700">
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
            <div className="flex items-center p-4 border-t border-gray-200 rounded-b">
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

const EditModal = ({
  editModal,
  setEditModal,
  editUrl,
  setPaginatedData,
  setData,
  bookCategories,
  bookLanguages,
  generalCountries,
}) => {
  const initial_state = editModal.data;
  const initialState = [{ title: "", description: "" }];
  const [state, setState] = useState(initial_state);
  const [toggleBtn, setToggleBtn] = useState(false);
  const [editCheckbox, setEditCheckbox] = useState(false);
  const [epubState, setEpubState] = useState([]);

  //* console.log("epubState", epubState);

  const keys = Object.keys(state);

  const handleChange = (e) => {
    const key = e.target.name;
    const value = e.target.value;

    if (key === "cover_image" || key === "epub") {
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
      keys.forEach((key) => {
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

      //* console.log("json", json);

      if (json.success) {
        const updatedData = json.success.book;
        let data = { id: null, ...state };
        Object.keys(data).forEach((key) => {
          data[key] = updatedData[key.replace(/^_/, "")];
        });

        //* console.log("EditModal =============>", data);

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
      setEditModal({
        data: null,
        isVisible: false,
      });
    }
  };

  //* console.log("state", state);

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
                    className="block mb-2 text-xs font-medium text-gray-900"
                    htmlFor="cover_image"
                  >
                    Cover Image
                  </label>
                  <input
                    className="block w-full p-2 text-xs text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50"
                    onChange={handleChange}
                    id="cover_image"
                    name="cover_image"
                    type="file"
                  />
                </div>
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
                    placeholder="Lorem ipsum"
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
                    value={state._author}
                    onChange={handleChange}
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                    placeholder="Lorem ipsum"
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
                  >
                    <option className="text-sm" value="">
                      select category
                    </option>
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
                    value={state._language}
                    onChange={handleChange}
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                    id="languages"
                  >
                    <option className="text-sm" value="">
                      select language
                    </option>
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
                  >
                    <option className="text-sm" value="">
                      select country
                    </option>
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
                  >
                    <option className="text-sm" value="">
                      select status
                    </option>
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
                    value={state._release_year}
                    onChange={handleChange}
                    id="release_year"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                    placeholder="2020"
                    max={new Date().getFullYear()}
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
                    name="_featured"
                    value={state._featured}
                    onChange={handleChange}
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                    id="featured"
                  >
                    <option className="text-sm" value="">
                      select featured
                    </option>
                    {["YES", "NO"].map((item) => (
                      <option className="text-sm" key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex items-center justify-center col-span-6 pt-6 sm:col-span-3">
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
                    value={state._about}
                    onChange={handleChange}
                    className="block p-2.5 w-full text-xs text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Write about this book..."
                  ></textarea>
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
                className="flex items-center justify-center w-full px-5 py-3 text-xs font-medium text-center text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 disabled:opacity-50 disabled:saturate-30 disabled:py-1 disabled:cursor-not-allowed"
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
