import { generalCountries, roles } from "../../constants/data";

export const RoleField = ({ defaultValue = "Admin", state, setState }) => {
  return (
    <div>
      <label
        htmlFor="roles"
        className="block mb-2 text-xs font-medium text-gray-900 dark:text-white capitalize"
      >
        Role
      </label>
      <select
        value={state}
        onChange={(e) => setState(e.target.value)}
        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        id="roles"
      >
        {roles.map((item, indx) => (
          <option className="text-sm" key={item + indx} value={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
};

export const DeviceField = ({
  defaultValue = "Android",
  title = "Device",
  state,
  setState,
}) => {
  return (
    <div>
      <label
        htmlFor="devices"
        className="block mb-2 text-xs font-medium text-gray-900 dark:text-white capitalize"
      >
        {title}
      </label>
      <select
        value={state}
        onChange={(e) => setState(e.target.value)}
        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        id="devices"
      >
        {["Android", "iOS"].map((item, indx) => (
          <option className="text-sm" key={item + indx} value={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
};

export const CountryField = ({
  defaultValue = "Nigeria",
  title = "Country Name",
  state,
  setState,
}) => {
  return (
    <div>
      <label
        htmlFor="countries"
        className="block mb-2 text-xs font-medium text-gray-900 dark:text-white capitalize"
      >
        {title.replace("_", " ")}
      </label>
      <select
        value={state}
        onChange={(e) => setState(e.target.value)}
        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        id="countries"
      >
        {generalCountries.map((item, indx) => (
          <option
            className="text-sm"
            key={item.title + indx}
            value={item.title}
          >
            {item.title}
          </option>
        ))}
      </select>
    </div>
  );
};

export const FeaturedField = ({ defaultValue = "Yes", state, setState }) => {
  return (
    <div>
      <label
        htmlFor="featured"
        className="block mb-2 text-xs font-medium text-gray-900 dark:text-white capitalize"
      >
        Featured
      </label>
      <select
        value={state}
        onChange={(e) => setState(e.target.value)}
        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        id="featured"
      >
        {["Yes", "No"].map((item, indx) => (
          <option className="text-sm" key={item + indx} value={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
};

export const StatusField = ({ defaultValue = "Pending", state, setState }) => {
  return (
    <div>
      <label
        htmlFor="status"
        className="block mb-2 text-xs font-medium text-gray-900 dark:text-white capitalize"
      >
        Status
      </label>
      <select
        value={state}
        onChange={(e) => setState(e.target.value)}
        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        id="status"
      >
        {["Pending", "Resolved"].map((item, indx) => (
          <option className="text-sm" key={item + indx} value={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
};

export const UploadField = ({
  title = "Upload Images",
  accept = "image/*",
  state,
  setState,
}) => {
  return (
    <div className="col-span-2 sm:col-span-1">
      <label
        className="block mb-2 text-xs font-medium text-gray-900 dark:text-white capitalize"
        htmlFor="upload-files"
      >
        {title + " (You can upload multiple)"}
      </label>
      <input
        className="block w-full text-[10px] text-gray-900 border border-gray-300 p-2 py-2 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
        id="upload-files"
        type="file"
        onChange={(e) => console.log(e.target.files)}
        multiple={true}
        accept={accept}
        placeholder="https://www.example.com"
      />
    </div>
  );
};

export const TextArea = ({ elem, defaultValue = "", state, setState }) => {
  return (
    <div className="col-span-2">
      <label
        htmlFor={elem.toLowerCase()}
        className="block mb-2 text-xs font-medium text-gray-900 dark:text-white capitalize"
      >
        {elem.replace("_", "")}
      </label>
      <textarea
        rows={10}
        name={elem.toLowerCase()}
        id={elem.toLowerCase()}
        value={state}
        onChange={(e) => setState(e.target.value)}
        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder={
          "Write " + elem.replace("_", "").toLowerCase() + " here..."
        }
        required={true}
      />
    </div>
  );
};
