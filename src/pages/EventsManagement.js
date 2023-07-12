import React, { useContext, useEffect, useState } from "react";
import AdvancedTable from "../components/Tables/AdvancedTable";
import {
  Page,
  ViewModal,
  Actions,
  CreateNewModal,
  EditModal,
} from "../components";
import { BiSearch } from "react-icons/bi";
import { DropdownFilter } from "../components/helpers";
import { base_url } from "../utils/url";
import { fetchData } from "../utils";
import { AppContext } from "../context";
import { toast } from "react-hot-toast";

const showAllEvents = `${base_url}/events`;
const createUrl = `${base_url}/event-store`;
const editUrl = `${base_url}/event-edit`;
const deleteUrl = `${base_url}/event-delete`;

const EventsManagement = () => {
  const { user } = useContext(AppContext);
  const events = user.privilage["Events Management"];
  const hasDeleteAccess = events.Delete;
  const hasEditAccess = events.Edit;
  const hasCreateAccess = events.Create;
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
  const [isDataFetched, setIsDataFetched] = useState(false);
  const [editModal, setEditModal] = useState({ isVisible: false, data: null });
  const [viewModal, setViewModal] = useState({ isVisible: false, data: null });
  const [createNewModal, setCreateNewModal] = useState({
    isVisible: false,
    data: {
      image: "",
      title: "",
      start_date: "",
      _end_date: "",
      start_time: "",
      _end_time: "",
      _location: "",
      _address: "",
      _map: { latitude: "", longitude: "" },
      status: "",
      featured: "",
      _about: "",
    },
  });
  const [filters, setFilters] = useState(initial_filters);
  const { searchInput, toggleStatus } = filters;
  console.log(data);

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
    "image",
    "title",
    "start_date",
    "_end_date",
    "start_time",
    "_end_time",
    "_location",
    "_address",
    "_map",
    "status",
    "featured",
    "_about",
  ];

  useEffect(() => {
    fetchData({
      setPaginatedData,
      setData,
      neededProps,
      url: showAllEvents,
      setIsDataFetched,
    });
  }, []);

  return (
    <Page title={"Events Management"}>
      <main>
        <AdvancedTable
          {...{
            data,
            setData,
            deleteUrl,
            isDataFetched,
            paginatedData,
            setPaginatedData,
            Actions,
            page: "Events Management",
            actionCols: ["View", "Edit", "Delete"],
            props: {
              setEditModal,
              setViewModal,
              hasDeleteAccess,
              hasEditAccess,
            },
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
                placeholder="Search for events"
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
                  className="text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-100 font-semibold rounded-lg text-xs px-4 py-1.5 ml-2 text-center"
                >
                  Create new
                </button>
                {createNewModal.isVisible && (
                  <CreateNewModal
                    {...{
                      createNewModal,
                      setCreateNewModal,
                      setData,
                      setPaginatedData,
                      statusType: "active/inactive",
                      createUrl,
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
                      statusType: "active/inactive",
                      editUrl,
                    }}
                  />
                )}

                {/* View modal */}
                {viewModal.isVisible && (
                  <ViewModal
                    {...{ viewModal, setViewModal, page: "Events Mangement" }}
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

export default EventsManagement;
