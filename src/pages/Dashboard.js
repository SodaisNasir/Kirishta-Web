import React, { useContext, useEffect, useState } from "react";
import { DropdownContainer } from "../components/helpers";
import { MdFeedback, MdLock, MdLogout } from "react-icons/md";
import { FaChevronDown, FaUser } from "react-icons/fa";
import { RiEdit2Fill } from "react-icons/ri";
import { AppContext } from "../context";
import { dashboardCards, notificationIcons } from "../constants/data";
import { useNavigate } from "react-router-dom";
import { base_url } from "../utils/url";
import { Loader } from "../components";

const Dashboard = () => {
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
    } catch (err) {
      console.error(err);
    }
  };

  const fetchContacts = async () => {
    const url = base_url + "/contact";

    try {
      const res = await fetch(url);
      const json = await res.json();

      if (json.success.status == 200) {
        const data = json.success.data;
        return data;
      }
    } catch (err) {
      console.error(err);
    }
  };

  const fetchNotifications = async () => {
    const url = base_url + "/show-admin-notification";

    try {
      const res = await fetch(url);
      const json = await res.json();

      if (json.success) {
        const data = json.success.data;
        return data;
      }
    } catch (err) {
      console.error(err);
    }
  };

  const fetchData = async () => {
    const analytics = await fetchAnalytics();
    const contacts = await fetchContacts();
    const feedbacks = await fetchFeedbacks();
    const notifications = await fetchNotifications();

    // console.log("Analytics =============>", analytics);
    // console.log("Feedbacks ========>", feedbacks);
    // console.log("Contacts ========>", contacts);
    console.log("Notificaitons ========>", notifications);

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
              <Notifications {...{ toggle, setSingleToggle, notifications }} />
              <Account {...{ toggle, setSingleToggle }} />
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
        <span className="text-xs font-medium text-[#8B8B93] ml-2 capitalize">
          {title.replaceAll("_", " ")}
        </span>
      </div>
      <span className="text-base font-semibold">{analytics[title]}</span>
    </div>
  ));
};

const Account = ({ toggle, setSingleToggle }) => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(AppContext);

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const arr = [
    {
      title: "Change Password",
      icon: <MdLock className="text-base text-blue-500" />,
      clickHandler: () => navigate("/change-password/" + user.email),
    },
    {
      title: "Edit Profile",
      icon: <RiEdit2Fill className="text-base text-blue-500" />,
      clickHandler: () => navigate("/edit-profile"),
    },
    {
      title: "Log out",
      icon: <MdLogout className="text-base text-red-600" />,
      clickHandler: logout,
    },
  ];

  return (
    <div
      className="relative flex items-center space-x-3 cursor-pointer"
      onClick={() => setSingleToggle("account", !toggle.account)}
    >
      <img
        className="w-[30px] h-[30px] rounded-full text-xs bg-gray-100"
        src={user.profile_image}
        alt="profile"
      />
      <p className="flex flex-col text-xs font-medium capitalize">
        {user.name}
        <span className="text-[10px] font-light capitalize">{user.role}</span>
      </p>
      <FaChevronDown
        className={`text-xs ${toggle.account ? "rotate-180" : ""}`}
      />

      {toggle.account && (
        <DropdownContainer>
          {arr.map((elem, indx) => (
            <li
              key={elem.title}
              onClick={elem.clickHandler}
              className={`${
                arr.length - 1 !== indx ? "border-b border-[#efefef]" : ""
              } flex py-2 cursor-pointer text-gray-600 hover:text-black`}
            >
              {elem.icon}
              <span className="ml-2 whitespace-nowrap">{elem.title}</span>
            </li>
          ))}
        </DropdownContainer>
      )}
    </div>
  );
};

const Notifications = ({ toggle, setSingleToggle, notifications }) => {
  const navigate = useNavigate();

  return (
    <button
      className="relative flex items-center space-x-3"
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

      {toggle.notifications && (
        <DropdownContainer extraStyles="pr-0.5">
          <div className="overflow-y-scroll max-h-[200px] pr-3.5">
            {notifications.map((elem, indx) => {
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

              return (
                <li
                  key={elem.id}
                  onClick={() => navigate(navigateTo)}
                  className={`${
                    notifications.length - 1 !== indx
                      ? "border-b border-[#efefef]"
                      : ""
                  } flex py-2 ${
                    !elem?.markAsRead ? "font-semibold" : ""
                  } cursor-pointer text-gray-600 hover:text-black`}
                >
                  {icon}
                  <span className="ml-2 whitespace-nowrap">{elem.message}</span>
                </li>
              );
            })}
          </div>
        </DropdownContainer>
      )}
    </button>
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
        Contacts ({contacts.length})
      </div>

      <div className="w-full h-full max-h-[400px] pl-2 pr-4 overflow-y-auto">
        {contacts.map(({ name, message, profile_image }, indx) => (
          <div
            key={name + indx}
            className={`${
              contacts.length - 1 !== indx ? "border-b border-[#F2F2F2]" : ""
            } flex flex-col items-start py-3`}
          >
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
            <p className="mt-2 ml-10 text-xs">
              {toggleRead.includes(indx) && message.length > 25 ? (
                <>
                  {message}
                  &nbsp;
                  <em
                    onClick={() =>
                      setToggleRead((prev) => prev.filter((e) => e !== indx))
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
                    onClick={() => setToggleRead((prev) => [...prev, indx])}
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
        ))}
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
        Feedbacks ({feedbacks.length})
      </div>

      <div className="w-full h-full max-h-[400px] pl-2 pr-4  overflow-y-auto">
        {feedbacks.map(({ name, text, profile_image }, indx) => (
          <div
            key={name + indx}
            className={`${
              feedbacks.length - 1 !== indx ? "border-b border-[#F2F2F2]" : ""
            } flex flex-col items-start py-3`}
          >
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
            <p className="mt-2 ml-10 text-xs">
              {toggleRead.includes(indx) && text.length > 25 ? (
                <>
                  {text}
                  &nbsp;
                  <em
                    onClick={() =>
                      setToggleRead((prev) => prev.filter((e) => e !== indx))
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
                    onClick={() => setToggleRead((prev) => [...prev, indx])}
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
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
