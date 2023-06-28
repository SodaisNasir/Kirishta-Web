import React, { useEffect, useState } from "react";
import AdvancedTable from "../../components/Tables/AdvancedTable";
import { Page, Actions, NotificationModal } from "../../components";
import { BiSearch } from "react-icons/bi";
import { DropdownFilter } from "../../components/helpers";
import { base_url } from "../../utils/url";
import { fetchData } from "../../utils";

const showAllNotifications = `${base_url}/make-notification`;
const notificationUrl = `${base_url}/notification/`;
const notificationUrlBulk = `${base_url}/notification-bulk`;

const Notification = () => {
  const initial_filters = {
    searchInput: "",
    toggleUser: false,
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
  const [notificationModal, setNotificationModal] = useState({
    isVisible: false,
    data: null,
    message: null,
  });
  const [filters, setFilters] = useState(initial_filters);
  const [selected, setSelected] = useState([]);
  const { searchInput, toggleUser, togglePlatform } = filters;

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
            item.name.toLowerCase().includes(value.toLowerCase()) ||
            item.id.toString().includes(value.toString())
        ),
      }));
    }
  };

  const handleNotification = () =>
    setNotificationModal((prev) => ({ ...prev, isVisible: true }));

  useEffect(() => {
    if (curFilter.filter === "user" && curFilter.value === "Users") {
      setPaginatedData((prev) => ({
        ...prev,
        items: data.filter((item) => item.name !== "Guest"),
      }));
    } else if (curFilter.filter === "user" && curFilter.value === "Guest") {
      setPaginatedData((prev) => ({
        ...prev,
        items: data.filter((item) => item.name === "Guest"),
      }));
    } else if (curFilter.filter === "platform") {
      setPaginatedData((prev) => ({
        ...prev,
        items: data.filter((item) => item.device_name === curFilter.value),
      }));
    } else if (curFilter.filter !== "searchInput") {
      setPaginatedData((prev) => ({
        ...prev,
        items: data,
      }));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [curFilter]);

  const neededProps = ["id", "name", "device_token", "device_name", "user_id"];

  useEffect(() => {
    fetchData(setPaginatedData, setData, neededProps, showAllNotifications);
  }, []);

  return (
    <Page title={"Notification Promotion"}>
      <main>
        <AdvancedTable
          {...{
            data,
            setData,
            paginatedData,
            setPaginatedData,
            selected,
            setSelected,
            Actions,
            page: "Notification Promotion",
            checkboxesEnabled: true,
            actionCols: ["Push Notification"],
            props: { setNotificationModal },
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
                placeholder="Search for names or ids"
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
                  arr={["Users", "Guest"]}
                  title={"User"}
                  toggle={toggleUser}
                  curFilter={curFilter}
                  setToggle={() => setSingleFilter("toggleUser", !toggleUser)}
                  handleClick={(value) =>
                    setCurFilter({ filter: value ? "user" : null, value })
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
                      filter: value ? "platform" : null,
                      value,
                    })
                  }
                />

                {/* Notification Modal */}
                {notificationModal.isVisible && (
                  <NotificationModal
                    {...{
                      notificationModal,
                      setNotificationModal,
                      notificationUrl,
                      paginatedData,
                      notificationUrlBulk,
                      selected,
                      setSelected,
                    }}
                  />
                )}
              </div>
            </div>
          </div>
        </AdvancedTable>

        <div className="flex justify-end mt-3">
          {selected.length > 1 && (
            <button
              onClick={handleNotification}
              className="justify-self-end text-xs text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 disabled:opacity-50 disabled:saturate-30 disabled:py-1 disabled:cursor-not-allowed"
            >
              Send bulk notification
            </button>
          )}
        </div>
      </main>
    </Page>
  );
};

export default Notification;
