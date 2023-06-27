import React, { useContext, useEffect, useState } from "react";
import AdvancedTable from "../../components/Tables/AdvancedTable";
import {
  CreateNewModal,
  EditModal,
  Actions,
  Page,
  ViewModal,
} from "../../components";
import { BiSearch } from "react-icons/bi";
import { DropdownFilter } from "../../components/helpers";
import { base_url } from "../../utils/url";
import { fetchData } from "../../utils";
import { AppContext } from "../../context";
import { toast } from "react-hot-toast";

const showAllPopups = `${base_url}/popup`;
const editUrl = `${base_url}/popup-edit`;
const createUrl = `${base_url}/popup-store`;
const deleteUrl = `${base_url}/popup-delete`;

const PopupPromotion = () => {
  const { user } = useContext(AppContext);
  const popup = user.privilage["Promotion Management"]["Pop-up"];
  const hasDeleteAccess = popup.Delete;
  const hasEditAccess = popup.Edit;
  const hasCreateAccess = popup.Create;
  const initial_filters = {
    searchInput: "",
    toggleStatus: false,
    togglePlatform: false,
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
  const [editModal, setEditModal] = useState({ isVisible: false, data: null });
  const [viewModal, setViewModal] = useState({ isVisible: false, data: null });
  const [createNewModal, setCreateNewModal] = useState({
    isVisible: false,
    data: {
      _platform: "Android",
      title: "",
      _tag: "",
      image: "",
      book_name: "",
      app_page: "",
      status: "ACTIVE",
    },
  });
  const { searchInput, toggleStatus, togglePlatform } = filters;

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
        items: data.filter((item) =>
          item.title.toLowerCase().includes(value.toLowerCase())
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
    "_platform",
    "title",
    "_tag",
    "image",
    "book_name",
    "app_page",
    "status",
  ];

  useEffect(() => {
    fetchData(setPaginatedData, setData, neededProps, showAllPopups);
  }, []);

  return (
    <Page title={"Popup Promotion"}>
      <main>
        <AdvancedTable
          {...{
            data,
            setData,
            paginatedData,
            setPaginatedData,
            deleteUrl,
            Actions,
            actionCols: ["View", "Edit", "Delete"],
            props: {
              setEditModal,
              setViewModal,
              hasDeleteAccess,
              hasEditAccess,
              hasCreateAccess,
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
                placeholder="Search for promotion"
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

                <DropdownFilter
                  arr={["Android", "IOS"]}
                  title={"Platform"}
                  toggle={togglePlatform}
                  curFilter={curFilter}
                  setToggle={() =>
                    setSingleFilter("togglePlatform", !togglePlatform)
                  }
                  handleClick={(value) =>
                    setCurFilter({
                      filter: value ? "_platform" : null,
                      value,
                    })
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
                      createUrl,
                      setData,
                      setPaginatedData,
                      statusType: "active/inactive",
                      page: "Popup Promotion",
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
                      statusType: "active/inactive",
                      page: "Popup Promotion",
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

export default PopupPromotion;
