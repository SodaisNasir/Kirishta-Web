import React, { useContext, useEffect, useState } from "react";
import AdvancedTable from "../../components/Tables/AdvancedTable";
import { CreateNewModal, Page, Actions, EditModal } from "../../components";
import { BiSearch } from "react-icons/bi";
import { base_url } from "../../utils/url";
import { fetchData, fetchParishRegions } from "../../utils";
import { toast } from "react-hot-toast";
import { AppContext } from "../../context";

const showAllProvinces = `${base_url}/province`;
const editUrl = `${base_url}/edit-province`;
const createUrl = `${base_url}/create-province`;
const deleteUrl = `${base_url}/delete-province`;

const ProvincesManagement = () => {
  const { user } = useContext(AppContext);
  const provinces = user.privilage["Settings Management"].Province;
  const hasDeleteAccess = provinces.Delete;
  const hasEditAccess = provinces.Edit;
  const hasCreateAccess = provinces.Create;

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
  const [parishRegions, setParishRegions] = useState([]);
  const [editModal, setEditModal] = useState({ isVisible: false, data: null });
  const [createNewModal, setCreateNewModal] = useState({
    isVisible: false,
    data: {},
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
            item.code.toLowerCase().includes(value.toLowerCase()) ||
            item.province.toLowerCase().includes(value.toLowerCase()) ||
            item.region.toLowerCase().includes(value.toLowerCase())
        ),
      }));
    }
  };

  const neededProps = ["id", "code", "province", "region"];

  const getData = async () => {
    await fetchParishRegions(setParishRegions, (data) =>
      setCreateNewModal({
        isVisible: false,
        data: {
          code: "",
          province: "",
          region: data[0].region,
        },
      })
    );
    await fetchData({
      setPaginatedData,
      setData,
      neededProps,
      url: showAllProvinces,
      setIsDataFetched,
    });
  };

  useEffect(() => {
    getData();
  }, []);

  const tableTemplate = Object.fromEntries(neededProps.map((e) => [e, ""]));

  return (
    <Page title={"Provinces Management"}>
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
            props: { setEditModal, hasEditAccess, hasDeleteAccess },
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
                placeholder="Search for provinces"
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
                      page: "Provinces Management",
                      parishRegions,
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
                      page: "Provinces Management",
                      parishRegions,
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

export default ProvincesManagement;
