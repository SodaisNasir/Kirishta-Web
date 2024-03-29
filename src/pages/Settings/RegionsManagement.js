import React, { useContext, useEffect, useState } from "react";
import AdvancedTable from "../../components/Tables/AdvancedTable";
import { CreateNewModal, Page, Actions, EditModal } from "../../components";
import { BiSearch } from "react-icons/bi";
import { base_url } from "../../utils/url";
import { fetchData, fetchParishCountries } from "../../utils";
import { AppContext } from "../../context";
import { toast } from "react-hot-toast";

const showAllRegions = `${base_url}/region`;
const editUrl = `${base_url}/edit-region`;
const createUrl = `${base_url}/create-region`;
const deleteUrl = `${base_url}/delete-region`;

const RegionsManagement = () => {
  const { user } = useContext(AppContext);
  const regions = user.privilage["Settings Management"].Region;
  const hasDeleteAccess = regions.Delete;
  const hasEditAccess = regions.Edit;
  const hasCreateAccess = regions.Create;
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
  const [parishCountries, setParishCountries] = useState([]);
  const [editModal, setEditModal] = useState({ isVisible: false, data: null });
  const [createNewModal, setCreateNewModal] = useState({
    isVisible: false,
    data: {
      country: "",
      region: "",
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
            item.region.toLowerCase().includes(value.toLowerCase()) ||
            item.country.toLowerCase().includes(value.toLowerCase())
        ),
      }));
    }
  };

  const neededProps = ["id", "country", "region"];

  const getData = async () => {
    await fetchParishCountries(setParishCountries, (data) =>
      setCreateNewModal({
        isVisible: false,
        data: {
          country: data[0].country,
          region: "",
        },
      })
    );
    await fetchData({
      setPaginatedData,
      setData,
      neededProps,
      url: showAllRegions,
      setIsDataFetched,
    });
  };

  useEffect(() => {
    getData();
  }, []);

  const tableTemplate = Object.fromEntries(neededProps.map((e) => [e, ""]));

  return (
    <Page title={"Regions Management"}>
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
            actionCols: ["Edit", "Remove"],
            props: { setEditModal, hasDeleteAccess, hasEditAccess },
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
                placeholder="Search for regions"
              />
            </div>
            {/* Search bar end */}
            {/* Dropdown Filters Start */}
            <div className="flex items-center self-end justify-between w-full mt-3 lg:self-auto lg:w-auto lg:mt-0">
              <div className="hidden text-xs font-medium text-gray-700 xs:block lg:hidden">
                {paginatedData.items.length <= 1
                  ? `${paginatedData.items.length} result`
                  : `${paginatedData.items.length} results`}
              </div>

              <div className="flex justify-between w-full xs:w-auto xs:justify-normal">
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
                      createNewModal,
                      setCreateNewModal,
                      createUrl,
                      setData,
                      setPaginatedData,
                      gridCols: 1,
                      page: "Regions Management",
                      parishCountries,
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
                      page: "Regions Management",
                      parishCountries,
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

export default RegionsManagement;
