import React, { useContext, useEffect, useState } from "react";
import { Account, DropdownContainer } from "../components/helpers";
import { MdFeedback, MdOutlineDoneAll } from "react-icons/md";
import { dashboardCards, notificationIcons } from "../constants/data";
import { useNavigate } from "react-router-dom";
import { base_url } from "../utils/url";
import { Loader } from "../components";
import { VscClose } from "react-icons/vsc";
import { FaUser } from "react-icons/fa";
import { AppContext } from "../context";

const Dashboard = () => {
  const { user } = useContext(AppContext);
  const userId = user?.id;
  const initialState = { notifications: false, account: false };
  const [toggle, setToggle] = useState(initialState);
  const [contacts, setContacts] = useState(null);
  const [feedbacks, setFeedbacks] = useState(null);
  const [analytics, setAnalytics] = useState(null);
  const [notifications, setNotifications] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const setSingleToggle = (key, value) =>
    setToggle({ ...initialState, [key]: value });

  const fetchAnalytics = async () => {
    const url = base_url + "/count";

    try {
      const res = await fetch(url);
      const json = await res.json();

      if (json.success) {
        const data = json.success.data;
        return data;
      }

      return [];
    } catch (err) {
      console.error(err);
    }
  };

  const fetchFeedbacks = async () => {
    const url = base_url + "/feedback";

    try {
      const res = await fetch(url);
      const json = await res.json();

      if (json.success) {
        const data = json.success.data;
        return data;
      }

      return [];
    } catch (err) {
      console.error(err);
    }
  };

  const fetchContacts = async () => {
    const url = base_url + "/contact";

    try {
      const res = await fetch(url);
      const json = await res.json();

      if (json.success) {
        const data = json.success.data;
        return data;
      }

      return [];
    } catch (err) {
      console.error(err);
    }
  };

  const fetchNotifications = async () => {
    const url = `${base_url}/show-admin-notification/${userId}`;

    try {
      const res = await fetch(url);
      const json = await res.json();

      if (json.success) {
        const data = json.success.data;
        return data;
      }

      return [];
    } catch (err) {
      console.error(err);
    }
  };

  const fetchData = async () => {
    const analytics = await fetchAnalytics();
    const contacts = await fetchContacts();
    const feedbacks = await fetchFeedbacks();
    const notifications = await fetchNotifications();

    //* console.log("Analytics =============>", analytics);
    //* console.log("Feedbacks ========>", feedbacks);
    //* console.log("Contacts ========>", contacts);
    //* console.log("notifications ========>", notifications);

    setAnalytics(analytics);
    setContacts(contacts);
    setFeedbacks(feedbacks);
    setNotifications(notifications);

    if (analytics && feedbacks && contacts) setIsLoading(false);
  };

  useEffect(() => {
    document.title = "Dashboard - Kirista";

    fetchData();
  }, []);

  useEffect(() => {
    let interval = setInterval(async () => {
      const notifications = await fetchNotifications();
      //* console.log("notifications", notifications);
      setNotifications(notifications);
    }, 20000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div
      className={`relative ${
        isLoading ? "flex justify-center items-center min-h-[90vh]" : ""
      }`}
    >
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <header className="flex items-center justify-between p-3 pt-0 md:px-6 md:pt-8">
            <h1 className="text-lg font-bold text-[#314156]">Dashboard</h1>
            <div className="flex items-center space-x-5">
              <Notifications
                {...{
                  toggle,
                  setSingleToggle,
                  notifications,
                  setNotifications,
                  userId,
                }}
              />
              <Account
                {...{
                  toggle: toggle.account,
                  setToggle: (val) => setSingleToggle("account", val),
                }}
              />
            </div>
          </header>

          <main className="grid grid-cols-2 gap-3 gap-x-4 sm:gap-x-8 bg-[#EEF2F5] p-8">
            <DashboardCards {...{ arr: dashboardCards, analytics }} />
            <ContactList contacts={contacts} />
            <FeedbackList feedbacks={feedbacks} />
          </main>
        </>
      )}
    </div>
  );
};

const DashboardCards = ({ arr, analytics }) => {
  return arr.map(({ title, icon, colSpan }) => (
    <div
      key={title}
      className={`${colSpan} flex justify-between items-center px-6 py-4 bg-white rounded-xl`}
    >
      <div className="flex items-center">
        {icon}
        <span className="text-xs font-medium text-[#8B8B93] ml-2">
          {title.toLowerCase() === "total_ios_users"
            ? "Total iOS Users"
            : title.replaceAll("_", " ")}
        </span>
      </div>
      <span className="text-base font-semibold">{analytics[title]}</span>
    </div>
  ));
};

const Notifications = ({
  toggle,
  setSingleToggle,
  notifications,
  setNotifications,
  userId,
}) => {
  const navigate = useNavigate();

  const handleReadAll = async () => {
    const url = `${base_url}/read-admin-notification/${userId}`;

    try {
      const requestOptions = {
        headers: {
          Accept: "application/json",
        },
        method: "POST",
        redirect: "follow",
      };

      const res = await fetch(url, requestOptions);
      const json = await res.json();
      //* console.log("json", json);

      if (res.status === 200) {
        setNotifications([]);
        setSingleToggle("notifications", !toggle.notifications);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="relative">
      <button
        className="flex items-center space-x-3"
        onClick={() => setSingleToggle("notifications", !toggle.notifications)}
      >
        <svg
          className="w-4 h-4"
          width="19"
          height="22"
          viewBox="0 0 19 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9.52022 19.5297C7.18539 19.5321 4.86549 19.1573 2.65022 18.4197C1.81022 18.1302 1.16972 17.5399 0.889973 16.7697C0.599723 16.0002 0.700224 15.1497 1.15997 14.3899L2.30972 12.4797C2.54972 12.0799 2.77022 11.2797 2.77022 10.8102V7.91969C2.77022 4.19969 5.80022 1.16969 9.52022 1.16969C13.2402 1.16969 16.2702 4.19969 16.2702 7.91969V10.8102C16.2702 11.2699 16.49 12.0799 16.73 12.4902L17.87 14.3899C18.2997 15.1099 18.38 15.9799 18.0897 16.7697C17.7995 17.5594 17.1702 18.1602 16.3797 18.4197C14.1682 19.158 11.8517 19.5329 9.52022 19.5297ZM9.52022 2.66969C6.62972 2.66969 4.27022 5.02019 4.27022 7.91969V10.8102C4.27022 11.5399 3.97022 12.6199 3.59972 13.2499L2.44997 15.1602C2.22947 15.5299 2.16947 15.9199 2.29997 16.2499C2.41997 16.5897 2.71997 16.8499 3.12947 16.9902C7.27803 18.3903 11.7714 18.3903 15.92 16.9902C16.28 16.8702 16.5597 16.6002 16.6902 16.2402C16.8207 15.8802 16.79 15.4902 16.5897 15.1602L15.44 13.2499C15.0597 12.5997 14.7695 11.5302 14.7695 10.7997V7.91969C14.7695 6.5273 14.2164 5.19194 13.2318 4.20738C12.2472 3.22281 10.9119 2.66969 9.51947 2.66969H9.52022ZM11.3802 2.93969C11.3097 2.93969 11.2392 2.92994 11.1702 2.90969C10.8941 2.83267 10.6136 2.77256 10.3302 2.72969C9.51313 2.6169 8.68142 2.67824 7.88972 2.90969C7.60922 2.99969 7.30922 2.90969 7.11947 2.69969C6.92972 2.48969 6.86972 2.18969 6.97922 1.91969C7.38947 0.869687 8.38922 0.179688 9.52922 0.179688C10.6692 0.179688 11.6697 0.859937 12.0792 1.91969C12.1797 2.18969 12.1295 2.48969 11.9397 2.69969C11.7897 2.86019 11.5805 2.93969 11.3802 2.93969ZM9.51947 21.8097C8.52947 21.8097 7.56947 21.4099 6.86972 20.7102C6.1673 20.0067 5.77176 19.0538 5.76947 18.0597H7.26947C7.26947 18.6499 7.50947 19.2297 7.92947 19.6497C8.34947 20.0697 8.92922 20.3097 9.51947 20.3097C10.7592 20.3097 11.7695 19.3002 11.7695 18.0597H13.2695C13.2695 20.1297 11.5895 21.8097 9.51947 21.8097Z"
            fill="#212121"
          />
        </svg>

        {notifications?.length ? (
          <>
            <div
              className={`absolute -top-[4px] -right-[4px] w-3.5 h-3.5 tracking-tighter text-[9.5px] ${
                notifications?.length > 9 ? "pl-0.5" : ""
              } flex items-center justify-center text-white rounded-full bg-red-500`}
            >
              {notifications?.length > 9 ? "9+" : notifications?.length}
            </div>
          </>
        ) : (
          ""
        )}
      </button>
      {toggle.notifications && (
        <DropdownContainer extraStyles="pr-0.5 hidden min-[930px]:block !-z-0">
          <div
            className={`${
              !notifications?.length ? "flex justify-center items-center" : ""
            } overflow-y-scroll overflow-x-auto w-full min-[930px]:min-w-[300px] min-h-[150px] max-h-[200px] pr-3.5`}
          >
            {notifications?.length
              ? notifications
                  .sort((a, b) => b.id - a.id)
                  .map((elem, indx) => {
                    const notificationType = elem.message
                      .toLowerCase()
                      .includes("new user")
                      ? "user"
                      : elem.message.toLowerCase().includes("new contact")
                      ? "contact"
                      : "feedback";
                    const navigateTo =
                      notificationType === "user"
                        ? "/users-management"
                        : notificationType === "contact"
                        ? "/contact-management"
                        : "/feedback-management";
                    const icon =
                      notificationType === "user"
                        ? notificationIcons.user
                        : notificationType === "contact"
                        ? notificationIcons.contact
                        : notificationIcons.feedback;

                    const handleClick = async (id) => {
                      const url = `${base_url}/edit-admin-notification/${id}`;

                      try {
                        const requestOptions = {
                          headers: {
                            Accept: "application/json",
                          },
                          method: "POST",
                          redirect: "follow",
                        };
                        const res = await fetch(url, requestOptions);
                        const json = await res.json();
                        //* console.log("json", json);

                        if (json.success) navigate(navigateTo);
                      } catch (err) {
                        console.error(err);
                      }
                    };

                    return (
                      <li
                        key={elem.id}
                        onClick={() => handleClick(elem.id)}
                        className={`${
                          notifications?.length - 1 !== indx
                            ? "border-b border-[#efefef]"
                            : ""
                        } flex py-2 ${
                          elem?.markAsRead ? "font-semibold" : ""
                        } cursor-pointer text-gray-600 hover:text-black`}
                      >
                        {icon}
                        <span className="ml-2 whitespace-nowrap">{`${
                          elem.message
                        } - ${elem.name} - ${elem.user_id} - ${new Date(
                          elem.created_at
                        ).toLocaleDateString()}`}</span>
                      </li>
                    );
                  })
              : "No notifications found!"}
          </div>
          {notifications?.length ? (
            <div className="pr-3.5">
              <button
                onClick={handleReadAll}
                type="button"
                className="w-full flex justify-center items-center hover:text-blue-600 border-t focus:outline-none font-medium text-base py-1 pt-1.5 mr-5 text-center"
              >
                <MdOutlineDoneAll />
                <span className="ml-1 text-xs">Read All</span>
              </button>
            </div>
          ) : (
            ""
          )}
        </DropdownContainer>
      )}
      <DropdownContainer
        onClick={() => setSingleToggle("notifications", !toggle.notifications)}
        extraStyles={`!p-0 min-[930px]:hidden !fixed !inset-0 ${
          toggle.notifications
            ? "!bg-black/50"
            : "!bg-transparent !pointer-events-none"
        } transition-all duration-500 !border-0 border-l !rounded-none`}
      >
        <div
          className={`fixed top-0 ${
            toggle.notifications ? "!right-0" : "!-right-full"
          } w-full min-[550px]:max-w-max h-screen bg-white transition-all duration-500 pointer-events-none`}
        >
          <div className="h-full px-4 py-2 pt-4 overflow-x-hidden overflow-y-scroll pointer-events-auto">
            <div className="flex items-center justify-between w-full mb-3">
              <h2 className="text-lg font-medium">Notificaitons</h2>
              <button
                onClick={() =>
                  setSingleToggle("notifications", !toggle.notifications)
                }
                className="text-lg hover:text-gray-600"
              >
                <VscClose />
              </button>
            </div>
            <div
              className={`${
                !notifications?.length ? "flex justify-center items-center" : ""
              } w-full min-h-[150px]`}
            >
              {notifications?.length
                ? notifications
                    .sort((a, b) => b.id - a.id)
                    .map((elem, indx) => {
                      const notificationType = elem.message
                        .toLowerCase()
                        .includes("new user")
                        ? "user"
                        : elem.message.toLowerCase().includes("new contact")
                        ? "contact"
                        : "feedback";
                      const navigateTo =
                        notificationType === "user"
                          ? "/users-management"
                          : notificationType === "contact"
                          ? "/contact-management"
                          : "/feedback-management";
                      const icon =
                        notificationType === "user"
                          ? notificationIcons.user
                          : notificationType === "contact"
                          ? notificationIcons.contact
                          : notificationIcons.feedback;

                      const handleClick = async (id) => {
                        const url = `${base_url}/edit-admin-notification/${id}`;

                        try {
                          const requestOptions = {
                            headers: {
                              Accept: "application/json",
                            },
                            method: "POST",
                            redirect: "follow",
                          };
                          const res = await fetch(url, requestOptions);
                          const json = await res.json();
                          //* console.log("json", json);

                          if (json.success) navigate(navigateTo);
                        } catch (err) {
                          console.error(err);
                        }
                      };

                      return (
                        <li
                          key={elem.id}
                          onClick={() => handleClick(elem.id)}
                          className={`${
                            notifications?.length - 1 !== indx
                              ? "border-b border-[#efefef]"
                              : ""
                          } flex py-2 ${
                            elem?.markAsRead ? "font-semibold" : ""
                          } cursor-pointer text-gray-600 hover:text-black`}
                        >
                          {icon}
                          <span className="ml-2 whitespace-nowrap">{`${
                            elem.message
                          } - ${elem.name} - ${elem.user_id} - ${new Date(
                            elem.created_at
                          ).toLocaleDateString()}`}</span>
                        </li>
                      );
                    })
                : "No notifications found!"}
            </div>
            {notifications?.length ? (
              <button
                onClick={handleReadAll}
                type="button"
                className="w-full flex justify-center items-center hover:text-blue-600 border-t focus:outline-none font-medium text-base py-1 pt-1.5 mr-5 text-center"
              >
                <MdOutlineDoneAll />
                <span className="ml-1 text-xs">Read All</span>
              </button>
            ) : (
              ""
            )}
          </div>
        </div>
      </DropdownContainer>
    </div>
  );
};

const ContactList = ({ contacts }) => {
  const [toggleRead, setToggleRead] = useState([]);

  return (
    <div className="flex flex-col col-span-2 p-2 mt-5 bg-white sm:col-span-1 rounded-xl">
      <div className="flex text-sm font-medium p-2 border-b border-[#EEEEEE]">
        <svg
          className="w-4 h-4 mr-2 text-blue-500"
          width="13"
          height="16"
          viewBox="0 0 13 16"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6.4 6.4C8.16731 6.4 9.6 4.96731 9.6 3.2C9.6 1.43269 8.16731 0 6.4 0C4.63269 0 3.2 1.43269 3.2 3.2C3.2 4.96731 4.63269 6.4 6.4 6.4Z"
            fill="currentColor"
          />
          <path
            d="M6.4 16C12.8 16 12.8 14.3882 12.8 12.4C12.8 10.4118 9.93462 8.8 6.4 8.8C2.86538 8.8 0 10.4118 0 12.4C0 14.3882 0 16 6.4 16Z"
            fill="currentColor"
          />
        </svg>
        Contact ({contacts.length})
      </div>

      <div
        className={`w-full h-full min-h-[300px] max-h-[400px] pl-2 pr-4 overflow-y-auto ${
          !contacts.length ? "flex justify-center items-center text-sm" : ""
        }`}
      >
        {contacts.length
          ? contacts
              .slice(-20)
              .reverse()
              .map(({ name, message, profile_image, created_at }, indx) => (
                <div
                  key={name + indx}
                  className={`${
                    contacts.length - 1 !== indx
                      ? "border-b border-[#F2F2F2]"
                      : ""
                  } flex flex-col items-start py-3`}
                >
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center">
                      {profile_image ? (
                        <img
                          className="w-[30px] h-[30px] rounded-full text-xs bg-gray-100"
                          src={profile_image}
                          alt="profile"
                        />
                      ) : (
                        <div className="flex justify-center items-center w-[30px] h-[30px] rounded-full text-gray-400/40 bg-gray-100">
                          <FaUser />
                        </div>
                      )}
                      <p className="ml-2 text-xs font-medium">{name}</p>
                    </div>
                    <p className="text-xs font-medium">
                      {new Date(created_at).toLocaleString()}
                    </p>
                  </div>
                  <p className="mt-2 ml-10 text-xs">
                    {toggleRead.includes(indx) && message.length > 25 ? (
                      <>
                        {message}
                        &nbsp;
                        <em
                          onClick={() =>
                            setToggleRead((prev) =>
                              prev.filter((e) => e !== indx)
                            )
                          }
                          className="text-blue-500 cursor-pointer hover:underline"
                        >
                          read less
                        </em>
                      </>
                    ) : message.length > 25 ? (
                      <>
                        {message.slice(0, message.length / 2) + "... "}
                        <em
                          onClick={() =>
                            setToggleRead((prev) => [...prev, indx])
                          }
                          className="text-blue-500 cursor-pointer hover:underline"
                        >
                          read more
                        </em>
                      </>
                    ) : (
                      message
                    )}
                  </p>
                </div>
              ))
          : "No contacts found!"}
      </div>
    </div>
  );
};

const FeedbackList = ({ feedbacks }) => {
  const [toggleRead, setToggleRead] = useState([]);

  return (
    <div className="flex flex-col col-span-2 p-2 mt-5 bg-white sm:col-span-1 rounded-xl">
      <div className="flex text-sm font-medium p-2 border-b border-[#EEEEEE]">
        <MdFeedback className="mr-2 text-lg text-blue-500" />
        Feedback ({feedbacks.length})
      </div>

      <div
        className={`w-full h-full max-h-[400px] pl-2 pr-4 overflow-y-auto ${
          !feedbacks.length ? "flex justify-center items-center text-sm" : ""
        }`}
      >
        {feedbacks.length
          ? feedbacks
              .slice(-20)
              .reverse()
              .map(({ name, text, profile_image, created_at }, indx) => (
                <div
                  key={name + indx}
                  className={`${
                    feedbacks.length - 1 !== indx
                      ? "border-b border-[#F2F2F2]"
                      : ""
                  } flex flex-col items-start py-3`}
                >
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center">
                      {profile_image ? (
                        <img
                          className="w-[30px] h-[30px] rounded-full text-xs bg-gray-100"
                          src={profile_image}
                          alt="profile"
                        />
                      ) : (
                        <div className="flex justify-center items-center w-[30px] h-[30px] rounded-full text-gray-400/40 bg-gray-100">
                          <FaUser />
                        </div>
                      )}
                      <p className="flex flex-col items-center ml-2 text-xs font-medium">
                        {name}
                      </p>
                    </div>
                    <p className="text-xs font-medium">
                      {new Date(created_at).toLocaleString()}
                    </p>
                  </div>
                  <p className="mt-2 ml-10 text-xs">
                    {toggleRead.includes(indx) && text.length > 25 ? (
                      <>
                        {text}
                        &nbsp;
                        <em
                          onClick={() =>
                            setToggleRead((prev) =>
                              prev.filter((e) => e !== indx)
                            )
                          }
                          className="text-blue-500 cursor-pointer hover:underline"
                        >
                          read less
                        </em>
                      </>
                    ) : text.length > 25 ? (
                      <>
                        {text.slice(0, text.length / 2) + "... "}
                        <em
                          onClick={() =>
                            setToggleRead((prev) => [...prev, indx])
                          }
                          className="text-blue-500 cursor-pointer hover:underline"
                        >
                          read more
                        </em>
                      </>
                    ) : (
                      text
                    )}
                  </p>
                </div>
              ))
          : "No feedbacks found!"}
      </div>
    </div>
  );
};

export default Dashboard;
