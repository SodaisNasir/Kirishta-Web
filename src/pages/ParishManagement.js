import React, { useContext, useEffect, useState } from "react";
import AdvancedTable from "../components/Tables/AdvancedTable";
import {
  CreateNewModal,
  EditModal,
  Page,
  ViewModal,
  Actions,
} from "../components";
import { BiSearch } from "react-icons/bi";
import { DropdownFilter } from "../components/helpers";
import { base_url } from "../utils/url";
import {
  fetchData,
  fetchParishCountries,
  fetchParishProvinces,
  fetchParishRegions,
} from "../utils";
import { AppContext } from "../context";
import { toast } from "react-hot-toast";

const showAllParishes = `${base_url}/parish`;
const createUrl = `${base_url}/parish-store`;
const editUrl = `${base_url}/parish-edit`;
const deleteUrl = `${base_url}/parish-delete`;

const ParishManagement = () => {
  const { user } = useContext(AppContext);
  const parishes = user.privilage["Parish Management"];
  const hasDeleteAccess = parishes.Delete;
  const hasEditAccess = parishes.Edit;
  const hasCreateAccess = parishes.Create;
  const initial_filters = {
    searchInput: "",
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
  const [parishRegions, setParishRegions] = useState([]);
  const [parishProvinces, setParishProvinces] = useState([]);
  const [parishCountries, setParishCountries] = useState([]);
  const [editModal, setEditModal] = useState({ isVisible: false, data: null });
  const [viewModal, setViewModal] = useState({ isVisible: false, data: null });
  const [createNewModal, setCreateNewModal] = useState({
    isVisible: false,
    data: {
      title: "",
      image: "",
      email: "",
      _phone_number: "",
      _website: "",
      _location: "",
      _map: { latitude: "", longitude: "" },
      _address: "",
      country: "",
      _province: "",
      _region: "",
      status: "",
      _about: "",
      _featured: ''
    },
  });
  const { searchInput, toggleStatus } = filters;

  const setSingleFilter = (key, value) => {
    setFilters({ ...initial_filters, [key]: value });
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
            item._about.toLowerCase().includes(value.toLowerCase()) ||
            item._location.toLowerCase().includes(value.toLowerCase()) ||
            item._address.toLowerCase().includes(value.toLowerCase())
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

  const neededProps = [
    "id",
    "title",
    "image",
    "email",
    "_phone_number",
    "_website",
    "_location",
    "_map",
    "_address",
    "country",
    "_province",
    "_region",
    "status",
    "_about",
    "_featured",
  ];

  useEffect(() => {
    fetchParishRegions(setParishRegions, (data) =>
      setCreateNewModal((prev) => ({
        ...prev,
        data: { ...prev.data, _region: data[0].region },
      }))
    );
    fetchParishProvinces(setParishProvinces, (data) =>
      setCreateNewModal((prev) => ({
        ...prev,
        data: { ...prev.data, _province: data[0].province },
      }))
    );
    fetchParishCountries(setParishCountries, (data) =>
      setCreateNewModal((prev) => ({
        ...prev,
        data: { ...prev.data, country: data[0].country },
      }))
    );
    fetchData(setPaginatedData, setData, neededProps, showAllParishes);
  }, []);

  return (
    <Page title={"Parish Management"}>
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
            props: {
              setEditModal,
              setViewModal,
              hasDeleteAccess,
              hasEditAccess,
            },
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
                placeholder="Search for parishes"
              />
            </div>
            {/* Search bar end */}
            {/* Dropdown Filters Start */}
            <div className="flex justify-between items-center w-full self-end lg:self-auto lg:w-auto mt-3 lg:mt-0">
              <div className="hidden xs:block lg:hidden text-xs font-medium text-gray-700">
                {paginatedData.items.length <= 1
                  ? `${paginatedData.items.length} result`
                  : `${paginatedData.items.length} results`}
              </div>

              <div className="w-full flex justify-between xs:w-auto xs:justify-normal">
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

                <button
                  onClick={() =>
                    hasCreateAccess
                      ? setCreateNewModal((prev) => ({
                          ...prev,
                          isVisible: true,
                        }))
                      : toast.error(
                          "You don't have access to create on this page!",
                          { duration: 2000 }
                        )
                  }
                  className="text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-200 font-semibold rounded-lg text-xs px-4 py-1.5 ml-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800/50"
                >
                  Create new
                </button>
                {/* Create new modal */}
                {createNewModal.isVisible && (
                  <CreateNewModal
                    {...{
                      createNewModal,
                      setCreateNewModal,
                      setData,
                      setPaginatedData,
                      createUrl,
                      parishCountries,
                      parishProvinces,
                      parishRegions,
                      statusType: "active/inactive",
                      page: "Parish Management",
                    }}
                  />
                )}

                {/* Edit user modal */}
                {editModal.isVisible && (
                  <EditModal
                    {...{
                      editModal,
                      setEditModal,
                      setData,
                      setPaginatedData,
                      editUrl,
                      parishCountries,
                      parishProvinces,
                      parishRegions,
                      statusType: "active/inactive",
                      page: "Parish Management",
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

// const EditModal = ({ editModal, setEditModal }) => {
//   const handleSubmit = (e) => {
//     e.preventDefault();

//     setEditModal({
//       isVisible: false,
//       data: {},
//     });
//   };

//   const close = () => setEditModal((prev) => ({ ...prev, isVisible: false }));

//   return (
//     <>
//       <div
//         className={`${
//           editModal.isVisible ? "" : "hidden"
//         } fixed inset-0 flex justify-center items-center z-20 bg-black/50`}
//       />
//       <div
//         tabIndex="-1"
//         className={`${
//           editModal.isVisible ? "" : "hidden"
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
//                 Edit
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
//             <div className="p-6 space-y-6 max-h-[70vh] overflow-y-scroll">
//               <div className="grid grid-cols-6 gap-6">
//                 <div className="col-span-6 sm:col-span-3">
//                   <label
//                     className="block mb-2 text-xs font-medium text-gray-900 dark:text-white"
//                     htmlFor="image"
//                   >
//                     Image
//                   </label>
//                   <input
//                     className="block w-full text-xs text-gray-900 border border-gray-300 p-2 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
//                     id="image"
//                     type="file"
//                   />
//                 </div>
//                 <div className="col-span-6 sm:col-span-3">
//                   <label
//                     htmlFor="title"
//                     className="block mb-2 text-xs font-medium text-gray-900 dark:text-white"
//                   >
//                     Title
//                   </label>
//                   <input
//                     type="text"
//                     name="title"
//                     id="title"
//                     className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                     placeholder="Lorem ipsum"
//                     required={true}
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
//                     placeholder="example@gmail.com"
//                     required={true}
//                   />
//                 </div>
//                 <div className="col-span-6 sm:col-span-3">
//                   <label
//                     htmlFor="phone"
//                     className="block mb-2 text-xs font-medium text-gray-900 dark:text-white"
//                   >
//                     Phone
//                   </label>
//                   <input
//                     type="tel"
//                     name="phone"
//                     id="phone"
//                     className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                     placeholder="+21 165 6847 545"
//                     required={true}
//                   />
//                 </div>
//                 <div className="col-span-6 sm:col-span-3">
//                   <label
//                     htmlFor="website"
//                     className="block mb-2 text-xs font-medium text-gray-900 dark:text-white"
//                   >
//                     Website
//                   </label>
//                   <input
//                     type="text"
//                     name="website"
//                     id="website"
//                     className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                     placeholder="www.example.com"
//                     required={true}
//                   />
//                 </div>
//                 <div className="col-span-6 sm:col-span-3">
//                   <label
//                     htmlFor="location"
//                     className="block mb-2 text-xs font-medium text-gray-900 dark:text-white"
//                   >
//                     Location
//                   </label>
//                   <input
//                     type="text"
//                     name="location"
//                     id="location"
//                     className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                     placeholder="Abuja"
//                     required={true}
//                   />
//                 </div>
//                 <div className="col-span-6 sm:col-span-3">
//                   <label
//                     htmlFor="address"
//                     className="block mb-2 text-xs font-medium text-gray-900 dark:text-white"
//                   >
//                     Address
//                   </label>
//                   <input
//                     type="text"
//                     name="address"
//                     id="address"
//                     className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                     placeholder="steet no.3, Abuja, southie"
//                     required={true}
//                   />
//                 </div>
//                 <div className="col-span-6 sm:col-span-3">
//                   <label
//                     htmlFor="map"
//                     className="block mb-2 text-xs font-medium text-gray-900 dark:text-white"
//                   >
//                     Map
//                   </label>
//                   <input
//                     type="text"
//                     name="map"
//                     id="map"
//                     className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                     placeholder="41°24'12.2'N - 2°10'26.5'E"
//                     required={true}
//                   />
//                 </div>
//                 <div className="col-span-6 sm:col-span-3">
//                   <label
//                     htmlFor="countries"
//                     className="block mb-2 text-xs font-medium text-gray-900 dark:text-white"
//                   >
//                     Country
//                   </label>
//                   <select
//                     defaultValue={editModal.data.Country}
//                     className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                     id="countries"
//                   >
//                     {parishCountries.map((country) => (
//                       <option
//                         className="text-sm"
//                         key={country.title}
//                         value={country.title}
//                       >
//                         {country.title}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//                 <div className="col-span-6 sm:col-span-3">
//                   <label
//                     htmlFor="provinces"
//                     className="block mb-2 text-xs font-medium text-gray-900 dark:text-white"
//                   >
//                     Province
//                   </label>
//                   <select
//                     defaultValue={editModal.data._Province}
//                     className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                     id="provinces"
//                   >
//                     {provinces.map((province) => (
//                       <option
//                         className="text-sm"
//                         key={province["S/N"]}
//                         value={province.state}
//                       >
//                         {province.state}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//                 <div className="col-span-6 sm:col-span-3">
//                   <label
//                     htmlFor="regions"
//                     className="block mb-2 text-xs font-medium text-gray-900 dark:text-white"
//                   >
//                     Region
//                   </label>
//                   <select
//                     defaultValue={editModal.data._Region}
//                     className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                     id="regions"
//                   >
//                     {regions.map((region) => (
//                       <option
//                         className="text-sm"
//                         key={region["S/N"]}
//                         value={region.region}
//                       >
//                         {region.region}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//                 <div className="col-span-6 sm:col-span-3">
//                   <label
//                     htmlFor="status"
//                     className="block mb-2 text-xs font-medium text-gray-900 dark:text-white"
//                   >
//                     Status
//                   </label>
//                   <select
//                     className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                     defaultValue={editModal.data.Status}
//                     id="status"
//                   >
//                     {["ACTIVE", "INACTIVE"].map((elem) => (
//                       <option className="text-sm" key={elem} value={elem}>
//                         {elem}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//                 <div className="col-span-6">
//                   <label
//                     htmlFor="about"
//                     className="block mb-2 text-xs font-medium text-gray-900 dark:text-white"
//                   >
//                     About
//                   </label>
//                   <textarea
//                     id="about"
//                     rows="8"
//                     className="block p-2.5 w-full text-xs text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                     placeholder="Write about this book..."
//                   ></textarea>
//                 </div>
//               </div>
//             </div>
//             {/* Modal footer */}
//             <div className="flex items-center p-4 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
//               <button
//                 type="submit"
//                 className="w-full text-white bg-blue-500 hover:bg-blue-600 focus:ring-2 focus:outline-none focus:ring-blue-200 font-medium rounded-lg text-xs px-5 py-3 text-center"
//               >
//                 Update
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </>
//   );
// };

// const CreateNewModal = ({ createNewModal, setCreateNewModal }) => {
//   const handleSubmit = (e) => {
//     e.preventDefault();

//     setCreateNewModal({
//       isVisible: false,
//       data: {},
//     });
//   };

//   const close = () =>
//     setCreateNewModal((prev) => ({ ...prev, isVisible: false }));

//   return (
//     <>
//       <div
//         className={`${
//           createNewModal.isVisible ? "" : "hidden"
//         } fixed inset-0 flex justify-center items-center z-20 bg-black/50`}
//       />
//       <div
//         tabIndex="-1"
//         className={`${
//           createNewModal.isVisible ? "" : "hidden"
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
//                 Create new
//               </h3>
//               <button
//                 onClick={close}
//                 type="button"
//                 className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-base p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
//               >
//                 <VscClose />
//               </button>
//             </div>
//             {/* Modal body */}
//             <div className="p-6 space-y-6 max-h-[70vh] overflow-y-scroll">
//               <div className="grid grid-cols-6 gap-6">
//                 <div className="col-span-6 sm:col-span-3">
//                   <label
//                     className="block mb-2 text-xs font-medium text-gray-900 dark:text-white"
//                     htmlFor="image"
//                   >
//                     Image
//                   </label>
//                   <input
//                     className="block w-full text-xs text-gray-900 border border-gray-300 p-2 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
//                     id="image"
//                     type="file"
//                   />
//                 </div>
//                 <div className="col-span-6 sm:col-span-3">
//                   <label
//                     htmlFor="title"
//                     className="block mb-2 text-xs font-medium text-gray-900 dark:text-white"
//                   >
//                     Title
//                   </label>
//                   <input
//                     type="text"
//                     name="title"
//                     id="title"
//                     className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                     placeholder="Lorem ipsum"
//                     required={true}
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
//                     placeholder="example@gmail.com"
//                     required={true}
//                   />
//                 </div>
//                 <div className="col-span-6 sm:col-span-3">
//                   <label
//                     htmlFor="phone"
//                     className="block mb-2 text-xs font-medium text-gray-900 dark:text-white"
//                   >
//                     Phone
//                   </label>
//                   <input
//                     type="tel"
//                     name="phone"
//                     id="phone"
//                     className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                     placeholder="+21 165 6847 545"
//                     required={true}
//                   />
//                 </div>
//                 <div className="col-span-6 sm:col-span-3">
//                   <label
//                     htmlFor="website"
//                     className="block mb-2 text-xs font-medium text-gray-900 dark:text-white"
//                   >
//                     Website
//                   </label>
//                   <input
//                     type="text"
//                     name="website"
//                     id="website"
//                     className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                     placeholder="www.example.com"
//                     required={true}
//                   />
//                 </div>
//                 <div className="col-span-6 sm:col-span-3">
//                   <label
//                     htmlFor="location"
//                     className="block mb-2 text-xs font-medium text-gray-900 dark:text-white"
//                   >
//                     Location
//                   </label>
//                   <input
//                     type="text"
//                     name="location"
//                     id="location"
//                     className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                     placeholder="Abuja"
//                     required={true}
//                   />
//                 </div>
//                 <div className="col-span-6 sm:col-span-3">
//                   <label
//                     htmlFor="address"
//                     className="block mb-2 text-xs font-medium text-gray-900 dark:text-white"
//                   >
//                     Address
//                   </label>
//                   <input
//                     type="text"
//                     name="address"
//                     id="address"
//                     className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                     placeholder="steet no.3, Abuja, southie"
//                     required={true}
//                   />
//                 </div>
//                 <div className="col-span-6 sm:col-span-3">
//                   <label
//                     htmlFor="map"
//                     className="block mb-2 text-xs font-medium text-gray-900 dark:text-white"
//                   >
//                     Map
//                   </label>
//                   <input
//                     type="text"
//                     name="map"
//                     id="map"
//                     className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                     placeholder="41°24'12.2'N - 2°10'26.5'E"
//                     required={true}
//                   />
//                 </div>
//                 <div className="col-span-6 sm:col-span-3">
//                   <label
//                     htmlFor="countries"
//                     className="block mb-2 text-xs font-medium text-gray-900 dark:text-white"
//                   >
//                     Country
//                   </label>
//                   <select
//                     className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                     id="countries"
//                   >
//                     {parishCountries.map((country) => (
//                       <option
//                         className="text-sm"
//                         key={country.title}
//                         value={country.title}
//                       >
//                         {country.title}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//                 <div className="col-span-6 sm:col-span-3">
//                   <label
//                     htmlFor="provinces"
//                     className="block mb-2 text-xs font-medium text-gray-900 dark:text-white"
//                   >
//                     Province
//                   </label>
//                   <select
//                     className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                     id="provinces"
//                   >
//                     {provinces.map((province) => (
//                       <option
//                         className="text-sm"
//                         key={province["S/N"]}
//                         value={province.state}
//                       >
//                         {province.state}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//                 <div className="col-span-6 sm:col-span-3">
//                   <label
//                     htmlFor="regions"
//                     className="block mb-2 text-xs font-medium text-gray-900 dark:text-white"
//                   >
//                     Region
//                   </label>
//                   <select
//                     className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                     id="regions"
//                   >
//                     {regions.map((region) => (
//                       <option
//                         className="text-sm"
//                         key={region["S/N"]}
//                         value={region.region}
//                       >
//                         {region.region}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//                 <div className="col-span-6 sm:col-span-3">
//                   <label
//                     htmlFor="status"
//                     className="block mb-2 text-xs font-medium text-gray-900 dark:text-white"
//                   >
//                     Status
//                   </label>
//                   <select
//                     className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                     id="status"
//                   >
//                     {["ACTIVE", "INACTIVE"].map((elem) => (
//                       <option className="text-sm" key={elem} value={elem}>
//                         {elem}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//                 <div className="col-span-6">
//                   <label
//                     htmlFor="about"
//                     className="block mb-2 text-xs font-medium text-gray-900 dark:text-white"
//                   >
//                     About
//                   </label>
//                   <textarea
//                     id="about"
//                     rows="8"
//                     className="block p-2.5 w-full text-xs text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                     placeholder="Write about this book..."
//                   ></textarea>
//                 </div>
//               </div>
//             </div>
//             {/* Modal footer */}
//             <div className="flex items-center p-4 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
//               <button
//                 type="submit"
//                 className="w-full text-white bg-blue-500 hover:bg-blue-600 focus:ring-2 focus:outline-none focus:ring-blue-200 font-medium rounded-lg text-xs px-5 py-3 text-center"
//               >
//                 Create
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </>
//   );
// };

export default ParishManagement;
