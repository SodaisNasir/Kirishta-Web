import React, { useEffect, useState, useContext } from "react";
import AdvancedTable from "../../components/Tables/AdvancedTable";
import { Page, Actions, NotificationModal, Loader } from "../../components";
import { BiSearch } from "react-icons/bi";
import { DropdownFilter } from "../../components/helpers";
import { base_url } from "../../utils/url";
import { fetchData } from "../../utils";
import { toast } from "react-hot-toast";
import { AppContext } from "../../context";

const showAllNotifications = `${base_url}/make-notification`;
const deleteUrl = `${base_url}/delete-device-token`;
const deleteBulkNotificationUrl = `${base_url}/delete-bulk-device-token`;
const notificationUrl = `${base_url}/notification/`;
const notificationUrlBulk = `${base_url}/notification-bulk`;

const Notification = () => {
  const { user } = useContext(AppContext);
  const notification = user.privilage.Notification;
  const hasDeleteAccess = notification.Delete;
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
  const [selected, setSelected] = useState([]);
  const [filters, setFilters] = useState(initial_filters);
  const [isDataFetched, setIsDataFetched] = useState(false);
  const [toggleBulkDeleteBtn, setToggleBulkDeleteBtn] = useState(false);
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
            item.u_id
              .toString()
              .toLowerCase()
              .includes(value.toString().toLowerCase())
        ),
      }));
    }
  };

  const handleDeleteBulkNotification = async () => {
    setToggleBulkDeleteBtn(true);

    const deviceTokens = paginatedData.items
      .filter((e) => selected.includes(e.id))
      .map((e) => e.device_token);

    try {
      let formdata = new FormData();
      formdata.append("device_token", JSON.stringify(deviceTokens));

      let requestOptions = {
        headers: {
          Accept: "application/json",
        },
        method: "POST",
        body: formdata,
        redirect: "follow",
      };

      const res = await fetch(deleteBulkNotificationUrl, requestOptions);
      const json = await res.json();

      if (res.status == 200) {
        //* console.log("deleteBulkNotification =============>", json);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setToggleBulkDeleteBtn(false);
    }
  };

  const handleBulkNotification = () =>
    setNotificationModal((prev) => ({ ...prev, isVisible: true }));

  useEffect(() => {
    const filterData = (cb) =>
      setPaginatedData({
        ...paginatedData,
        items: data.filter(cb),
      });

    if (curFilter.filter === "user") {
      filterData((item) =>
        curFilter.value === "Users"
          ? item.name !== "Guest"
          : item.name === "Guest"
      );
    } else if (curFilter.filter === "platform") {
      filterData((item) => item.device_name === curFilter.value);
    } else if (curFilter.filter !== "searchInput") {
      setPaginatedData((prev) => ({
        ...prev,
        items: data,
      }));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [curFilter]);

  const neededProps = ["id", "name", "u_id", "device_token", "device_name"];

  useEffect(() => {
    fetchData({
      setPaginatedData,
      setData,
      neededProps,
      url: showAllNotifications,
      setIsDataFetched,
      sort: (data) => data.sort((a, b) => b.id - a.id),
    });
  }, []);

  const tableTemplate = Object.fromEntries(neededProps.map((e) => [e, ""]));

  return (
    <Page title={"Notification Promotion"}>
      <main>
        <AdvancedTable
          {...{
            data,
            setData,
            isDataFetched,
            tableTemplate,
            paginatedData,
            setPaginatedData,
            deleteUrl,
            selected,
            setSelected,
            Actions,
            page: "Notification Promotion",
            checkboxesEnabled: true,
            actionCols: ["Push Notification", "Delete"],
            props: { setNotificationModal, hasDeleteAccess },
          }}
        >
          <div
            className={`flex flex-col py-4 bg-white ${
              selected.length > 1
                ? ""
                : "lg:flex-row lg:items-center lg:justify-between"
            }`}
          >
            {/* Search bar start */}
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
                placeholder="Search for names or user ids"
              />
            </div>
            {/* Search bar end */}
            {/* Dropdown Filters Start */}
            <div
              className={`flex items-center self-end justify-between w-full mt-3 lg:self-auto lg:w-auto ${
                selected.length > 1 ? "" : "lg:mt-0"
              }`}
            >
              <div className="hidden text-xs font-medium text-gray-700 xs:block lg:hidden">
                {paginatedData.items.length <= 1
                  ? `${paginatedData.items.length} result`
                  : `${paginatedData.items.length} results`}
              </div>

              {selected.length > 1 && (
                <div className="flex items-center">
                  <button
                    onClick={
                      hasDeleteAccess
                        ? handleDeleteBulkNotification
                        : toast.error(
                            "You don't have access to delete on this page!",
                            { duration: 2000 }
                          )
                    }
                    className="flex items-center justify-center px-5 py-2 text-xs font-medium text-center text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-200 disabled:opacity-50 disabled:saturate-30 disabled:py-[1px] disabled:pl-1 disabled:hover:bg-blue-500 disabled:cursor-not-allowed"
                    disabled={toggleBulkDeleteBtn}
                  >
                    {toggleBulkDeleteBtn ? (
                      <>
                        <Loader extraStyles="!static !inset-auto !block !scale-50 !bg-transparent !saturate-100" />
                        Deleting Notifications
                      </>
                    ) : (
                      "Delete Bulk Notifications"
                    )}
                  </button>
                  <button
                    onClick={handleBulkNotification}
                    className="px-4 py-2 ml-2 text-xs font-medium text-center text-white truncate bg-blue-500 rounded-lg justify-self-end hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-200 disabled:cursor-not-allowed"
                  >
                    Send Bulk Notification
                  </button>
                </div>
              )}

              <div className="flex justify-between w-full xs:w-auto xs:justify-normal">
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
      </main>
    </Page>
  );
};

export default Notification;
