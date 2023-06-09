import React, { useContext, useEffect, useState } from "react";
import AdvancedTable from "../../components/Tables/AdvancedTable";
import { Page, Actions, EditModal, CreateNewModal } from "../../components";
import { BiSearch } from "react-icons/bi";
import { base_url } from "../../utils/url";
import { fetchData } from "../../utils";
import { toast } from "react-hot-toast";
import { AppContext } from "../../context";

const showAllCountries = `${base_url}/country`;
const editUrl = `${base_url}/country-edit`;
const createUrl = `${base_url}/country-store`;
const deleteUrl = `${base_url}/country-delete`;

const GeneralCountriesManagement = () => {
  const { user } = useContext(AppContext);
  const countries = user.privilage["Settings Management"]["General Countries"];
  const hasDeleteAccess = countries.Delete;
  const hasEditAccess = countries.Edit;
  const hasCreateAccess = countries.Create;

  const initial_filters = {
    searchInput: "",
  };
  const [paginatedData, setPaginatedData] = useState({
    items: [],
    curItems: [],
  });
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState(initial_filters);
  const [isDataFetched, setIsDataFetched] = useState(false);
  const [editModal, setEditModal] = useState({ isVisible: false, data: null });
  const [createNewModal, setCreateNewModal] = useState({
    isVisible: false,
    data: {
      country_name: "",
      country_code: "",
      flag_code: "",
      featured: "",
    },
  });
  const { searchInput } = filters;

  const setSingleFilter = (key, value) => {
    setFilters({ ...initial_filters, [key]: value });
  };

  const filterUsersBySearch = (e) => {
    const value = e.target.value;
    setSingleFilter("searchInput", value);

    if (value === "") {
      setPaginatedData((prev) => ({ ...prev, items: data }));
    } else if (value) {
      setPaginatedData((prev) => ({
        ...prev,
        items: data.filter(
          (item) =>
            item["country_name"].toLowerCase().includes(value.toLowerCase()) ||
            item["country_code"].toLowerCase().includes(value.toLowerCase())
        ),
      }));
    }
  };

  const neededProps = [
    "id",
    "country_name",
    "country_code",
    "flag_code",
    "featured",
  ];

  useEffect(() => {
    fetchData({
      setPaginatedData,
      setData,
      neededProps,
      url: showAllCountries,
      setIsDataFetched,
    });
  }, []);

  return (
    <Page title={"General Countries Management"}>
      <main>
        <AdvancedTable
          {...{
            data,
            setData,
            paginatedData,
            setPaginatedData,
            deleteUrl,
            isDataFetched,
            Actions,
            actionCols: ["Edit", "Remove"],
            props: { setEditModal, hasDeleteAccess, hasEditAccess },
          }}
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between py-4 bg-white">
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
                className="block w-full md:w-80 p-2 pl-10 text-xs text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Search for general countries"
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
                  className="text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-200 font-semibold rounded-lg text-xs px-4 py-1.5 ml-2 text-center"
                >
                  Create new
                </button>

                {/* Create new modal */}
                {createNewModal.isVisible && (
                  <CreateNewModal
                    {...{
                      setData,
                      createNewModal,
                      setCreateNewModal,
                      setPaginatedData,
                      createUrl,
                      page: "General Countries",
                    }}
                  />
                )}

                {/* Edit user modal */}
                {editModal.isVisible && (
                  <EditModal
                    {...{
                      setData,
                      editModal,
                      setEditModal,
                      setPaginatedData,
                      editUrl,
                      page: "General Countries",
                    }}
                  />
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
//         <div className="relative w-full max-w-lg max-h-full">
//           {/* Modal content */}
//           <form
//             action="#"
//             onSubmit={handleSubmit}
//             className="relative bg-white rounded-lg shadow"
//           >
//             {/* Modal header */}
//             <div className="flex items-start justify-between p-4 border-b rounded-t">
//               <h3 className="text-xl font-semibold text-gray-900">
//                 Edit
//               </h3>
//               <button
//                 onClick={close}
//                 type="button"
//                 className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-base p-1.5 ml-auto inline-flex items-center
//               >
//                 <VscClose />
//               </button>
//             </div>
//             {/* Modal body */}
//             <div className="p-5 space-y-6 max-h-[72vh] overflow-y-scroll">
//               <div className="grid grid-cols-1 gap-6">
//                 <div>
//                   <label
//                     htmlFor="country"
//                     className="block mb-2 text-xs font-medium text-gray-900"
//                   >
//                     Country Name
//                   </label>
//                   <input
//                     type="text"
//                     name="country"
//                     id="country"
//                     defaultValue={editModal.data["country name"]}
//                     className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
//                     placeholder="Nigeria"
//                     required={true}
//                   />
//                 </div>
//                 <div>
//                   <label
//                     htmlFor="country-code"
//                     className="block mb-2 text-xs font-medium text-gray-900"
//                   >
//                     Country Code
//                   </label>
//                   <input
//                     type="number"
//                     name="country-code"
//                     id="country-code"
//                     defaultValue={editModal.data["country code"]}
//                     className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
//                     placeholder="234"
//                     required={true}
//                   />
//                 </div>
//                 <div>
//                   <label
//                     htmlFor="country-flag"
//                     className="block mb-2 text-xs font-medium text-gray-900"
//                   >
//                     Country Flag
//                   </label>
//                   <input
//                     type="text"
//                     name="country-flag"
//                     id="country-flag"
//                     defaultValue={editModal.data["country flag"]}
//                     className="font-emoji shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-xl rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 py-1"
//                     placeholder="e.g. 🇧🇷"
//                     required={true}
//                   />
//                 </div>
//                 <div>
//                   <label
//                     htmlFor="feature"
//                     className="block mb-2 text-xs font-medium text-gray-900"
//                   >
//                     Featured
//                   </label>
//                   <select
//                     defaultValue={editModal.data._Featured}
//                     className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
//                     id="featured"
//                   >
//                     {["Yes", "No"].map((item) => (
//                       <option className="text-sm" key={item} value={item}>
//                         {item}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//               </div>
//             </div>
//             {/* Modal footer */}
//             <div className="flex items-center p-4 px-6 space-x-2 border-t border-gray-200 rounded-b">
//               <button
//                 type="submit"
//                 className="w-full text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-200 font-medium rounded-lg text-xs px-5 py-2.5 text-center"
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

// const AddModal = ({ addModal, setAddModal }) => {
//   const handleSubmit = (e) => {
//     e.preventDefault();

//     setAddModal({
//       isVisible: false,
//       data: {},
//     });
//   };

//   const close = () => setAddModal((prev) => ({ ...prev, isVisible: false }));

//   return (
//     <>
//       <div
//         className={`${
//           addModal.isVisible ? "" : "hidden"
//         } fixed inset-0 flex justify-center items-center z-20 bg-black/50`}
//       />
//       <div
//         tabIndex="-1"
//         className={`${
//           addModal.isVisible ? "" : "hidden"
//         } fixed z-20 flex items-center justify-center w-full p-4 overflow-x-hidden overflow-y-auto inset-0 h-[calc(100%-1rem)] max-h-full`}
//       >
//         <div className="relative w-full max-w-lg max-h-full">
//           {/* Modal content */}
//           <form
//             action="#"
//             onSubmit={handleSubmit}
//             className="relative bg-white rounded-lg shadow"
//           >
//             {/* Modal header */}
//             <div className="flex items-start justify-between p-4 border-b rounded-t">
//               <h3 className="text-xl font-semibold text-gray-900">
//                 Add new country
//               </h3>
//               <button
//                 onClick={close}
//                 type="button"
//                 className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-base p-1.5 ml-auto inline-flex items-center
//               >
//                 <VscClose />
//               </button>
//             </div>
//             {/* Modal body */}
//             <div className="p-5 space-y-6 max-h-[72vh] overflow-y-scroll">
//               <div className="grid grid-cols-1 gap-6">
//                 <div>
//                   <label
//                     htmlFor="country"
//                     className="block mb-2 text-xs font-medium text-gray-900"
//                   >
//                     Country Name
//                   </label>
//                   <input
//                     type="text"
//                     name="country"
//                     id="country"
//                     className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
//                     placeholder="Nigeria"
//                     required={true}
//                   />
//                 </div>
//                 <div>
//                   <label
//                     htmlFor="country-code"
//                     className="block mb-2 text-xs font-medium text-gray-900"
//                   >
//                     Country Code
//                   </label>
//                   <input
//                     type="number"
//                     name="country-code"
//                     id="country-code"
//                     className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
//                     placeholder="234"
//                     required={true}
//                   />
//                 </div>
//                 <div>
//                   <label
//                     htmlFor="country-flag"
//                     className="block mb-2 text-xs font-medium text-gray-900"
//                   >
//                     Country Flag
//                   </label>
//                   <input
//                     type="text"
//                     name="country-flag"
//                     id="country-flag"
//                     className="font-emoji shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-xl rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 py-1"
//                     placeholder="e.g. 🇧🇷"
//                     required={true}
//                   />
//                 </div>
//                 <div>
//                   <label
//                     htmlFor="feature"
//                     className="block mb-2 text-xs font-medium text-gray-900"
//                   >
//                     Featured
//                   </label>
//                   <select
//                     className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
//                     id="featured"
//                   >
//                     {["Yes", "No"].map((item) => (
//                       <option className="text-sm" key={item} value={item}>
//                         {item}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//               </div>
//             </div>
//             {/* Modal footer */}
//             <div className="flex items-center px-6 py-4 border-t border-gray-200 rounded-b">
//               <button
//                 type="submit"
//                 className="w-full text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xs px-5 py-2.5 text-center"
//               >
//                 Submit
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </>
//   );
// };

// const Actions = ({
//   tableStructure,
//   data,
//   SN,
//   selectedUsers,
//   setSelectedUsers,
//   paginatedData,
//   setPaginatedData,
//   setEditModal,
// }) => {
//   const remove = () => {
//     setPaginatedData((prev) => ({
//       ...prev,
//       items: prev.items.filter((user) => user["S/N"] !== SN),
//     }));
//   };

//   return (
//     <>
//       <td className="text-center text-base px-6 py-4">
//         <button
//           onClick={() => setEditModal({ isVisible: true, data })}
//           className="font-medium text-gray-600 hover:text-gray-800"
//         >
//           <MdModeEdit />
//         </button>
//       </td>
//       <td className="text-center text-base px-6 py-4">
//         <button
//           onClick={remove}
//           className="font-medium text-gray-600 hover:text-gray-800"
//         >
//           <MdDelete />
//         </button>
//       </td>
//     </>
//   );
// };

export default GeneralCountriesManagement;
