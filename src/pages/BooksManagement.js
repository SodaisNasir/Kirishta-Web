import React, { useEffect, useState } from "react";
import AdvancedTable from "../components/Tables/AdvancedTable";
import {
  bookCategories,
  bookLanguages,
  books,
  countries,
} from "../constants/data";
import { Page } from "../components";
import Paginatation from "../components/Pagintation";
import { BiSearch } from "react-icons/bi";
import { CountryFilter } from "../components";
import { DropdownFilter } from "../components/helpers";
import { MdDelete, MdEdit } from "react-icons/md";
import { VscClose } from "react-icons/vsc";

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
  // const [addUser, setAddUser] = useState({ isVisible: false, data: {} });

  const setSingleFilter = (key, value) => {
    setFilters({ ...initial_filters, [key]: value });
  };

  const filterUsersBySearch = (e) => {
    const value = e.target.value.trim();
    setSingleFilter("searchInput", value);
    setCurFilter({ filter: "searchInput", value });

    if (value === "") {
      setPaginatedData((prev) => ({ ...prev, ...prev, items: data }));
    } else if (value) {
      setPaginatedData((prev) => ({
        ...prev,
        items: data.filter(
          (user) =>
            user.Name.toLowerCase().includes(value.toLowerCase()) ||
            user.Email.toLowerCase().includes(value.toLowerCase())
        ),
      }));
    }
  };

  useEffect(() => {
    if (curFilter.filter && curFilter.filter !== "searchInput") {
      setPaginatedData((prev) => ({
        ...prev,
        items: data.filter(
          (user) => user[curFilter.filter] === curFilter.value
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

  useEffect(() => {
    // fetch data
    setTimeout(() => {
      setPaginatedData((prev) => ({ ...prev, items: books }));
      setData(books);
    }, 2000);
  }, []);

  return (
    <Page title={"Books Management"}>
      <main>
        <Paginatation {...{ itemsPerPage: 2, paginatedData, setPaginatedData }}>
          <AdvancedTable
            {...{
              data,
              paginatedData,
              setPaginatedData,
              Actions,
              actionCols: ["Edit", "Delete"],
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
                  {paginatedData.curItems.length || paginatedData.items.length}{" "}
                  results
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
                          filter: data === null ? null : "Country",
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
                      setCurFilter({ filter: value ? "Status" : null, value })
                    }
                  />

                  {/*
                  <button
                    onClick={() =>
                      setAddUser((prev) => ({ ...prev, isVisible: true }))
                    }
                    className="text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-100 font-semibold rounded-lg text-xs px-4 py-1.5 ml-2 text-center dark:bg-blue-700 dark:hover:bg-blue-800 dark:focus:ring-blue-700/40"
                  >
                    Add User
                  </button>
                  Edit user modal
                  {addUser.isVisible && (
                    <AddUserModal {...{ addUser, setAddUser }} />
                  )} 
                  */}
                </div>
              </div>
            </div>
          </AdvancedTable>
        </Paginatation>
      </main>
    </Page>
  );
};

// const AddUserModal = ({ addUser, setAddUser }) => {
//   const handleSubmit = (e) => {
//     e.preventDefault();

//     setAddUser({
//       isVisible: false,
//       data: {},
//     });
//   };

//   const close = () => setAddUser((prev) => ({ ...prev, isVisible: false }));

//   return (
//     <>
//       <div
//         className={`${
//           addUser.isVisible ? "" : "hidden"
//         } fixed inset-0 flex justify-center items-center z-20 bg-black/50`}
//       />
//       <div
//         tabIndex="-1"
//         className={`${
//           addUser.isVisible ? "" : "hidden"
//         } fixed z-20 flex items-center justify-center w-full p-4 overflow-x-hidden overflow-y-auto inset-0 h-[calc(100%-1rem)] max-h-full`}
//       >
//         <div className="relative w-full max-w-2xl max-h-full">
//           {/* Modal content */}
//           <form
//             action="#"
//             onSubmit={handleSubmit}
//             className="relative bg-white rounded-lg shadow dark:bg-gray-700"
//           >
//             {/* Modal header */}
//             <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
//               <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
//                 Add new user
//               </h3>
//               <button
//                 onClick={close}
//                 type="button"
//                 className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-base p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
//                 data-modal-hide="editUserModal"
//               >
//                 <VscClose />
//               </button>
//             </div>
//             {/* Modal body */}
//             <div className="p-6 space-y-6">
//               <div className="grid grid-cols-6 gap-6">
//                 <div className="col-span-6 sm:col-span-3">
//                   <label
//                     htmlFor="first-name"
//                     className="block mb-2 text-xs font-medium text-gray-900 dark:text-white"
//                   >
//                     First Name
//                   </label>
//                   <input
//                     type="text"
//                     name="first-name"
//                     id="first-name"
//                     className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                     placeholder="Bonnie"
//                     required=""
//                   />
//                 </div>
//                 <div className="col-span-6 sm:col-span-3">
//                   <label
//                     htmlFor="last-name"
//                     className="block mb-2 text-xs font-medium text-gray-900 dark:text-white"
//                   >
//                     Last Name
//                   </label>
//                   <input
//                     type="text"
//                     name="last-name"
//                     id="last-name"
//                     className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                     placeholder="Green"
//                     required=""
//                   />
//                 </div>
//                 <div className="col-span-6 sm:col-span-3">
//                   <label
//                     htmlFor="email"
//                     className="block mb-2 text-xs font-medium text-gray-900 dark:text-white"
//                   >
//                     Email
//                   </label>
//                   <input
//                     type="email"
//                     name="email"
//                     id="email"
//                     className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                     placeholder="example@company.com"
//                     required=""
//                   />
//                 </div>
//                 <div className="col-span-6 sm:col-span-3">
//                   <label
//                     htmlFor="phone-number"
//                     className="block mb-2 text-xs font-medium text-gray-900 dark:text-white"
//                   >
//                     Phone Number
//                   </label>
//                   <input
//                     type="number"
//                     name="phone-number"
//                     id="phone-number"
//                     className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                     placeholder="e.g. +(12)3456 789"
//                     required=""
//                   />
//                 </div>
//                 <div className="col-span-6 sm:col-span-3">
//                   <label
//                     htmlFor="department"
//                     className="block mb-2 text-xs font-medium text-gray-900 dark:text-white"
//                   >
//                     Department
//                   </label>
//                   <input
//                     type="text"
//                     name="department"
//                     id="department"
//                     className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                     placeholder="Development"
//                     required=""
//                   />
//                 </div>
//                 <div className="col-span-6 sm:col-span-3">
//                   <label
//                     htmlFor="company"
//                     className="block mb-2 text-xs font-medium text-gray-900 dark:text-white"
//                   >
//                     Company
//                   </label>
//                   <input
//                     type="number"
//                     name="company"
//                     id="company"
//                     className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                     placeholder="123456"
//                     required=""
//                   />
//                 </div>
//                 <div className="col-span-6 sm:col-span-3">
//                   <label
//                     htmlFor="current-password"
//                     className="block mb-2 text-xs font-medium text-gray-900 dark:text-white"
//                   >
//                     Current Password
//                   </label>
//                   <input
//                     type="password"
//                     name="current-password"
//                     id="current-password"
//                     className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                     placeholder="••••••••"
//                     required=""
//                   />
//                 </div>
//                 <div className="col-span-6 sm:col-span-3">
//                   <label
//                     htmlFor="new-password"
//                     className="block mb-2 text-xs font-medium text-gray-900 dark:text-white"
//                   >
//                     New Password
//                   </label>
//                   <input
//                     type="password"
//                     name="new-password"
//                     id="new-password"
//                     className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                     placeholder="••••••••"
//                     required=""
//                   />
//                 </div>
//               </div>
//             </div>
//             {/* Modal footer */}
//             <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
//               <button
//                 type="submit"
//                 className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xs px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
//               >
//                 Save all
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </>
//   );
// };

const EditUserModal = ({ editUser, setEditUser }) => {
  const handleSubmit = (e) => {
    e.preventDefault();

    setEditUser({
      isVisible: false,
      data: {},
    });
  };

  const close = () => setEditUser((prev) => ({ ...prev, isVisible: false }));

  return (
    <>
      <div
        className={`${
          editUser.isVisible ? "" : "hidden"
        } fixed inset-0 flex justify-center items-center z-20 bg-black/50`}
      />
      <div
        tabIndex="-1"
        className={`${
          editUser.isVisible ? "" : "hidden"
        } fixed z-20 flex items-center justify-center w-full p-4 overflow-x-hidden overflow-y-auto inset-0 h-[calc(100%-1rem)] max-h-full`}
      >
        <div className="relative w-full max-w-2xl max-h-full">
          {/* Modal content */}
          <form
            action="#"
            onSubmit={handleSubmit}
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
                    htmlFor="book_image"
                  >
                    Image
                  </label>
                  <input
                    className="block w-full text-xs text-gray-900 border border-gray-300 p-2 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                    aria-describedby="book_image"
                    id="book_image"
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
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Lorem ipsum"
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
                    placeholder="Lorem ipsum"
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
                    htmlFor="country"
                    className="block mb-2 text-xs font-medium text-gray-900 dark:text-white"
                  >
                    Country
                  </label>
                  <input
                    list="countries"
                    name="country"
                    id="country"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Nigria"
                    required={true}
                  />
                  <datalist id="countries">
                    {countries.map((category) => (
                      <option key={category.title} value={category.title} />
                    ))}
                  </datalist>
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="status"
                    className="block mb-2 text-xs font-medium text-gray-900 dark:text-white"
                  >
                    Status
                  </label>
                  <input
                    list="statuses"
                    name="status"
                    id="status"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="ACTIVE"
                    required={true}
                  />
                  <datalist id="statuses">
                    {["ACTIVE", "INACTIVE"].map((status, indx) => (
                      <option key={status + indx} value={status} />
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
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="feature"
                    className="block mb-2 text-xs font-medium text-gray-900 dark:text-white"
                  >
                    Featured
                  </label>
                  <input
                    list="featured"
                    name="feature"
                    id="feature"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Yes"
                    required={true}
                  />
                  <datalist id="featured">
                    {["Yes", "No"].map((item, indx) => (
                      <option key={item} value={item} />
                    ))}
                  </datalist>
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
              </div>
            </div>
            {/* Modal footer */}
            <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
              <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xs px-5 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

const Actions = ({
  tableStructure,
  data,
  SN,
  selectedUsers,
  setSelectedUsers,
  paginatedData,
  setPaginatedData,
}) => {
  const [editUser, setEditUser] = useState({ isVisible: false, data: {} });

  const remove = () => {
    setPaginatedData((prev) => ({
      ...prev,
      items: prev.items.filter((user) => user["S/N"] !== SN),
    }));
  };

  return (
    <>
      {/* Edit User */}
      {editUser.isVisible && <EditUserModal {...{ editUser, setEditUser }} />}

      <td className="text-center text-base px-6 py-4">
        <button
          onClick={() =>
            setEditUser((prev) => ({ ...prev, isVisible: !prev.isVisible }))
          }
          className="font-medium text-gray-600 dark:text-gray-500"
        >
          <MdEdit />
        </button>
      </td>
      <td className="text-center text-base px-6 py-4">
        <button
          onClick={remove}
          className="font-medium text-gray-600 dark:text-gray-500"
        >
          <MdDelete />
        </button>
      </td>
    </>
  );
};

export default BooksManagement;
