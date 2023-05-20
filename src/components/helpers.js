export const DropdownContainer = ({ arr, extraStyles = "" }) => {
  return (
    <ul
      className={`absolute top-[140%] right-0 flex flex-col max-w-max text-xs bg-white rounded-xl px-4 py-1 shadow-2xl shadow-gray-300 border ${extraStyles}`}
    >
      {arr.map((elem, indx) => (
        <li
          onClick={elem.clickHandler}
          className={`${
            arr.length - 1 !== indx ? "border-b border-[#efefef]" : ""
          } flex py-2 ${
            !elem.markAsRead ? "font-semibold" : ""
          } cursor-pointer text-gray-600 hover:text-black`}
        >
          {elem.icon}
          <span className="ml-2 whitespace-nowrap">{elem.title}</span>
        </li>
      ))}
    </ul>
  );
};
