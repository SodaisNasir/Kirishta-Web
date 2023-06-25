export const RoleField = ({ state, setState, roles }) => {
  return (
    <div>
      <label
        htmlFor="roles"
        className="block mb-2 text-xs font-medium text-gray-900 dark:text-white capitalize">
        Role
      </label>
      <select
        value={state}
        onChange={(e) => setState(e.target.value)}
        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        id="roles"
        required={true}>
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
        className="block mb-2 text-xs font-medium text-gray-900 dark:text-white capitalize">
        {title}
      </label>
      <select
        value={state}
        required={true}
        onChange={(e) => setState(e.target.value)}
        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        id="devices">
        {["Android", "IOS"].map((item, indx) => (
          <option className="text-sm" key={item + indx} value={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
};

export const MapField = ({ state, setState }) => {
  const isStateString = typeof state === "string";
  let stateCopy = isStateString && JSON.parse(state);
  stateCopy = typeof stateCopy === "string" && JSON.parse(state);
  console.log(state);

  return (
    <div>
      <label className="block mb-2 text-xs font-medium text-gray-900 dark:text-white capitalize">
        Map (lat - long)
      </label>
      <div className="flex space-x-2">
        <input
          type="text"
          value={isStateString ? JSON.parse(state)?.latitude : state?.latitude}
          onChange={(e) =>
            isStateString
              ? setState({ ...stateCopy, latitude: e.target.value })
              : setState({ ...state, latitude: e.target.value })
          }
          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="4.5461"
          required={true}
        />
        <input
          type="text"
          value={
            isStateString ? JSON.parse(state)?.longitude : state?.longitude
          }
          onChange={(e) =>
            isStateString
              ? setState({ ...stateCopy, longitude: e.target.value })
              : setState({ ...state, longitude: e.target.value })
          }
          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="2.6436"
          required={true}
        />
      </div>
    </div>
  );
};

export const TimeField = ({ state, setState, title }) => {
  return (
    <div>
      <label className="block mb-2 text-xs font-medium text-gray-900 dark:text-white capitalize">
        {title.replace(/_/g, " ")}
      </label>
      <input
        type="time"
        value={state}
        onChange={(e) => setState(e.target.value)}
        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        required={true}
      />
    </div>
  );
};

export const DateField = ({ state, setState, title }) => {
  return (
    <div>
      <label className="block mb-2 text-xs font-medium text-gray-900 dark:text-white capitalize">
        {title.replace(/_/g, " ")}
      </label>
      <input
        type="date"
        value={state}
        onChange={(e) => setState(e.target.value)}
        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        required={true}
      />
    </div>
  );
};

export const GeneralCountryField = ({
  title = "Country",
  state,
  setState,
  generalCountries,
}) => {
  return (
    <div>
      <label
        htmlFor="countries"
        className="block mb-2 text-xs font-medium text-gray-900 dark:text-white capitalize">
        {title.replace("_", " ")}
      </label>
      <select
        required={true}
        value={state}
        onChange={(e) => setState(e.target.value)}
        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        id="countries">
        {generalCountries.map((item, indx) => (
          <option
            className="text-sm"
            key={item.country_name + indx}
            value={item.country_name}>
            {item.country_name}
          </option>
        ))}
      </select>
    </div>
  );
};

export const ParishCountriesField = ({ state, setState, parishCountries }) => {
  return (
    <div>
      <label
        htmlFor="parish-countries"
        className="block mb-2 text-xs font-medium text-gray-900 dark:text-white capitalize">
        Country
      </label>
      <select
        required={true}
        value={state}
        onChange={(e) => setState(e.target.value)}
        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        id="parish-countries">
        {parishCountries.map((item) => (
          <option className="text-sm" key={item.id} value={item.country}>
            {item.country}
          </option>
        ))}
      </select>
    </div>
  );
};

export const ParishProvincesField = ({ state, setState, parishProvinces }) => {
  return (
    <div>
      <label
        htmlFor="parish-countries"
        className="block mb-2 text-xs font-medium text-gray-900 dark:text-white capitalize">
        Province
      </label>
      <select
        required={true}
        value={state}
        onChange={(e) => setState(e.target.value)}
        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        id="parish-countries">
        {parishProvinces.map((item) => (
          <option className="text-sm" key={item.id} value={item.province}>
            {item.province}
          </option>
        ))}
      </select>
    </div>
  );
};

export const ParishRegionsField = ({ state, setState, parishRegions }) => {
  return (
    <div>
      <label
        htmlFor="parish-regions"
        className="block mb-2 text-xs font-medium text-gray-900 dark:text-white capitalize">
        Region
      </label>
      <select
        required={true}
        value={state}
        onChange={(e) => setState(e.target.value)}
        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        id="parish-regions">
        {parishRegions.map((item) => (
          <option className="text-sm" key={item.id} value={item.region}>
            {item.region}
          </option>
        ))}
      </select>
    </div>
  );
};

export const FeaturedField = ({ state, setState }) => {
  return (
    <div>
      <label
        htmlFor="featured"
        className="block mb-2 text-xs font-medium text-gray-900 dark:text-white capitalize">
        Featured
      </label>
      <select
        value={state}
        onChange={(e) => setState(e.target.value)}
        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        required={true}
        id="featured">
        {["YES", "NO"].map((item, indx) => (
          <option className="text-sm" key={item + indx} value={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
};

export const PlatformField = ({
  defaultValue = "Android",
  state,
  setState,
}) => {
  return (
    <div>
      <label
        htmlFor="platform"
        className="block mb-2 text-xs font-medium text-gray-900 dark:text-white capitalize">
        Platform
      </label>
      <select
        defaultValue={defaultValue}
        value={state}
        onChange={(e) => setState(e.target.value)}
        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        required={true}
        id="platform">
        {["Android", "iOS"].map((item, indx) => (
          <option className="text-sm" key={item + indx} value={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
};

export const LanguageField = ({ state, setState, languages }) => {
  return (
    <div className="col-span-2 sm:col-span-1">
      <label
        htmlFor="languages"
        className="block mb-2 text-xs font-medium text-gray-900 dark:text-white">
        Language
      </label>
      <select
        id="languages"
        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        value={state}
        onChange={(e) => setState(e.target.value)}
        required={true}>
        {languages.map((item, indx) => (
          <option className="text-sm" key={item + indx} value={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
};

export const ParishCategoriesField = ({
  parishCategories,
  state,
  setState,
}) => {
  return (
    <div className="col-span-2 sm:col-span-1">
      <label
        htmlFor="parish-categories"
        className="block mb-2 text-xs font-medium text-gray-900 dark:text-white">
        Category
      </label>
      <select
        id="parish-categories"
        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        value={state}
        onChange={(e) => setState(e.target.value)}
        required={true}>
        {parishCategories.map((item, indx) => (
          <option
            className="text-sm"
            key={item.category + indx}
            value={item.category}>
            {item.category}
          </option>
        ))}
      </select>
    </div>
  );
};

export const StatusField = ({ state, setState, statusType }) => {
  const status =
    statusType === "pending/resolved"
      ? ["Pending", "Resolved"]
      : ["ACTIVE", "INACTIVE"];

  return (
    <div>
      <label
        htmlFor="status"
        className="block mb-2 text-xs font-medium text-gray-900 dark:text-white capitalize">
        Status
      </label>
      <select
        required={true}
        value={state.toUpperCase()}
        onChange={(e) => setState(e.target.value)}
        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        id="status">
        {status.map((item, indx) => (
          <option className="text-sm" key={item + indx} value={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
};

export const UploadField = ({
  title = "Upload Image",
  accept = ".jpeg, .png, .jpg, .gif, .svg",
  canUploadMultipleImages,
  fileRequired = false,
  state,
  setState,
}) => {
  return (
    <div className="col-span-2 sm:col-span-1">
      <label
        className="block mb-2 text-xs font-medium text-gray-900 dark:text-white capitalize"
        htmlFor="upload-files">
        {canUploadMultipleImages
          ? title + "s (You can upload multiple)"
          : title}
      </label>
      <input
        className="block w-full text-[10px] text-gray-900 border border-gray-300 p-2 py-2 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
        id="upload-files"
        type="file"
        onChange={(e) => setState(e.target.files[0])}
        multiple={canUploadMultipleImages}
        accept={accept}
        required={fileRequired}
      />
    </div>
  );
};

export const TextArea = ({
  elem,
  defaultValue = "",
  gridCols,
  state,
  setState,
}) => {
  return (
    <div className={gridCols === 1 ? "col-span-1" : "col-span-2"}>
      <label
        htmlFor={elem.toLowerCase()}
        className="block mb-2 text-xs font-medium text-gray-900 dark:text-white capitalize">
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
