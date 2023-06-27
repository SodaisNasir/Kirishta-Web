import React, { useContext, useEffect, useState } from "react";
import AdvancedTable from "../../components/Tables/AdvancedTable";
import { CreateNewModal, EditModal, Page, Actions } from "../../components";
import { BiSearch } from "react-icons/bi";
import { base_url } from "../../utils/url";
import { fetchData } from "../../utils";
import { toast } from "react-hot-toast";
import { AppContext } from "../../context";

const showAllCountries = `${base_url}/parish-country`;
const editUrl = `${base_url}/edit-parish-country`;
const createUrl = `${base_url}/create-parish-country`;
const deleteUrl = `${base_url}/delete-parish-country`;

const ParishCountriesManagement = () => {
  const { user } = useContext(AppContext);
  const countries = user.privilage["Settings Management"]["Parish Countries"];
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
  const [parishCategories, setParishCategories] = useState([]);
  const [editModal, setEditModal] = useState({ isVisible: false, data: null });
  const [createNewModal, setCreateNewModal] = useState({
    isVisible: false,
    data: {
      country: "",
      category: parishCategories[0],
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
            item.country.toLowerCase().includes(value.toLowerCase()) ||
            item.category.toLowerCase().includes(value.toLowerCase())
        ),
      }));
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await fetch(`${base_url}/parish-category`);
      const json = await res.json();

      if (json.success) {
        const data = json.success.data;
        setParishCategories(data);
        setCreateNewModal({
          isVisible: false,
          data: {
            country: "",
            category: data[0].category,
          },
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const neededProps = ["id", "country", "category"];

  useEffect(() => {
    fetchCategories();
    fetchData(setPaginatedData, setData, neededProps, showAllCountries);
  }, []);

  return (
    <Page title={"Parish Countries Management"}>
      <main>
        <AdvancedTable
          {...{
            data,
            setData,
            deleteUrl,
            paginatedData,
            setPaginatedData,
            Actions,
            actionCols: ["Edit", "Remove"],
            props: { setEditModal, hasDeleteAccess, hasEditAccess },
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
                placeholder="Search for parish countries"
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
                      createUrl,
                      setData,
                      setPaginatedData,
                      gridCols: 1,
                      page: "Parish Countries",
                      parishCategories,
                    }}
                  />
                )}

                {/* Edit user modal */}
                {editModal.isVisible && (
                  <EditModal
                    {...{
                      editModal,
                      setEditModal,
                      editUrl,
                      setData,
                      setPaginatedData,
                      gridCols: 1,
                      page: "Parish Countries",
                      parishCategories,
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

export default ParishCountriesManagement;
