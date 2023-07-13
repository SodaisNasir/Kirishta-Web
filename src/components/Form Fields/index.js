import { languages } from "../../constants/data";
import { convertAMPMto24HourTime } from "../../utils";

export const RoleField = ({ state, setState, roles }) => {
  return (
    <div>
      <label
        htmlFor="roles"
        className="block mb-2 text-xs font-medium text-gray-900 capitalize"
      >
        Role
      </label>
      <select
        value={state}
        onChange={(e) => setState(e.target.value)}
        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
        id="roles"
        required={true}
      >
        <option className="text-sm" value="">
          select role
        </option>
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
        className="block mb-2 text-xs font-medium text-gray-900 capitalize"
      >
        {title}
      </label>
      <select
        value={state}
        required={true}
        onChange={(e) => setState(e.target.value)}
        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
        id="devices"
      >
        <option className="text-sm" value="">
          select device
        </option>
        {["Android", "IOS"].map((item, indx) => (
          <option className="text-sm" key={item + indx} value={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
};

export const PopupAppPage = ({ state, setState, radio, setRadio, books }) => {
  return (
    <>
      <div className="flex items-center justify-around pt-6">
        <div className="flex items-center">
          <input
            id="app_page"
            type="radio"
            name="app-page_book-name_radio"
            onChange={(e) => setRadio(e.target.value)}
            checked={radio === "app_page"}
            value="app_page"
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
          />
          <label
            htmlFor="app_page"
            className="ml-2 text-xs font-medium text-gray-900 cursor-pointer"
          >
            Web Link
          </label>
        </div>
        <div className="flex items-center">
          <input
            id="book_name"
            type="radio"
            name="app-page_book-name_radio"
            onChange={(e) => setRadio(e.target.value)}
            checked={radio === "book_name"}
            value="book_name"
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
          />
          <label
            htmlFor="book_name"
            className="ml-2 text-xs font-medium text-gray-900 cursor-pointer"
          >
            Book Name
          </label>
        </div>
      </div>

      {radio === "app_page" ? (
        <div>
          <label
            htmlFor="app-page"
            className="block mb-2 text-xs font-medium text-gray-900 capitalize"
          >
            Web Link
          </label>
          <input
            type="url"
            id="app-page"
            value={state}
            onChange={(e) => setState(e.target.value)}
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
            placeholder="https://www.google.com"
            required={true}
          />
        </div>
      ) : (
        <div>
          <label
            htmlFor="book-name"
            className="block mb-2 text-xs font-medium text-gray-900 capitalize"
          >
            Book name
          </label>
          <select
            required={true}
            value={state}
            onChange={(e) => setState(e.target.value)}
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
            id="parish-countries"
          >
            <option className="text-sm" value="">
              select book name
            </option>
            {books.map((item) => (
              <option className="text-sm" key={item.id} value={item.id}>
                {item.title}
              </option>
            ))}
          </select>
          {/* <input
            type="text"
            id="book-name"
            value={state}
            onChange={(e) => setState(e.target.value)}
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
            required={true}
          /> */}
        </div>
      )}
    </>
  );
};

export const MapField = ({ state, setState }) => {
  const isStateString = typeof state === "string";
  let stateCopy = isStateString && JSON.parse(state);
  stateCopy = typeof stateCopy === "string" && JSON.parse(state);

  return (
    <div>
      <label className="block mb-2 text-xs font-medium text-gray-900 capitalize">
        Map (lat - long)
      </label>
      <div className="flex space-x-2">
        <input
          type="number"
          value={
            (isStateString ? JSON.parse(state)?.latitude : state?.latitude) ==
            "undefined"
              ? ""
              : isStateString
              ? JSON.parse(state)?.latitude
              : state?.latitude
          }
          onChange={(e) =>
            isStateString
              ? setState({ ...stateCopy, latitude: e.target.value })
              : setState({ ...state, latitude: e.target.value })
          }
          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
          placeholder="4.5461"
        />
        <input
          type="number"
          value={
            (isStateString ? JSON.parse(state)?.longitude : state?.longitude) ==
            "undefined"
              ? ""
              : isStateString
              ? JSON.parse(state)?.longitude
              : state?.longitude
          }
          onChange={(e) =>
            isStateString
              ? setState({ ...stateCopy, longitude: e.target.value })
              : setState({ ...state, longitude: e.target.value })
          }
          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
          placeholder="2.6436"
        />
      </div>
    </div>
  );
};

export const TimeField = ({ state, setState, title, required = true }) => {
  const isTimeFormat12h =
    state.toLowerCase().includes("pm") || state.toLowerCase().includes("am");
  const modifiedTimeFormat = isTimeFormat12h
    ? convertAMPMto24HourTime(state)
    : state;

  console.log({
    state,
    modifiedTimeFormat,
  });

  return (
    <div>
      <label className="block mb-2 text-xs font-medium text-gray-900 capitalize">
        {title.replace(/_/g, " ")}
      </label>
      <input
        id={title}
        type="time"
        defaultValue={modifiedTimeFormat}
        onChange={(e) => setState(e.target.value)}
        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
        required={required}
      />
    </div>
  );
};

export const DateField = ({ state, setState, title, required = true }) => {
  return (
    <div>
      <label className="block mb-2 text-xs font-medium text-gray-900 capitalize">
        {title.replace(/_/g, " ")}
      </label>
      <input
        type="date"
        defaultValue={state.replace(" 00:00:00", "")}
        onChange={(e) => setState(e.target.value)}
        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
        required={required}
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
        className="block mb-2 text-xs font-medium text-gray-900 capitalize"
      >
        {title.replace("_", " ")}
      </label>
      <select
        required={true}
        value={state}
        onChange={(e) => setState(e.target.value)}
        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
        id="countries"
      >
        <option className="text-sm" value="">
          select a country
        </option>
        {generalCountries.map((item, indx) => (
          <option
            className="text-sm"
            key={item.country_name + indx}
            value={item.country_name}
          >
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
        className="block mb-2 text-xs font-medium text-gray-900 capitalize"
      >
        Country
      </label>
      <select
        required={true}
        value={state}
        onChange={(e) => setState(e.target.value)}
        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
        id="parish-countries"
      >
        <option className="text-sm" value="">
          select country
        </option>
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
        className="block mb-2 text-xs font-medium text-gray-900 capitalize"
      >
        Province
      </label>
      <select
        value={state}
        onChange={(e) => setState(e.target.value)}
        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
        id="parish-countries"
        required={true}
        disabled={parishProvinces.length === 0}
      >
        {parishProvinces.length === 0 ? (
          <option className="text-sm" value="">
            No provinces found
          </option>
        ) : (
          <>
            <option className="text-sm" value="">
              select province
            </option>
            {parishProvinces.map((item) => (
              <option className="text-sm" key={item.id} value={item.province}>
                {item.province}
              </option>
            ))}
          </>
        )}
      </select>
    </div>
  );
};

export const ParishRegionsField = ({ state, setState, parishRegions }) => {
  return (
    <div>
      <label
        htmlFor="parish-regions"
        className="block mb-2 text-xs font-medium text-gray-900 capitalize"
      >
        Region
      </label>
      <select
        required={true}
        value={state}
        onChange={(e) => setState(e.target.value)}
        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
        id="parish-regions"
        disabled={parishRegions.length === 0}
      >
        {parishRegions.length === 0 ? (
          <option className="text-sm" value="">
            No regions found
          </option>
        ) : (
          <>
            <option className="text-sm" value="">
              select region
            </option>
            {parishRegions.map((item) => (
              <option className="text-sm" key={item.id} value={item.region}>
                {item.region}
              </option>
            ))}
          </>
        )}
      </select>
    </div>
  );
};

export const FeaturedField = ({ state, setState }) => {
  return (
    <div>
      <label
        htmlFor="featured"
        className="block mb-2 text-xs font-medium text-gray-900 capitalize"
      >
        Featured
      </label>
      <select
        value={state}
        onChange={(e) => setState(e.target.value)}
        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
        required={true}
        id="featured"
      >
        <option className="text-sm" value="">
          select an option
        </option>
        {["YES", "NO"].map((item, indx) => (
          <option className="text-sm" key={item + indx} value={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
};

export const PlatformField = ({ state, setState }) => {
  return (
    <div>
      <label
        htmlFor="platform"
        className="block mb-2 text-xs font-medium text-gray-900 capitalize"
      >
        Platform
      </label>
      <select
        value={state}
        onChange={(e) => setState(e.target.value)}
        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
        required={true}
        id="platform"
      >
        <option className="text-sm" value="">
          select an option
        </option>
        {["Android", "iOS"].map((item, indx) => (
          <option className="text-sm" key={item + indx} value={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
};

export const FAQLanguageField = ({ state, setState }) => {
  return (
    <div className="col-span-2 sm:col-span-1">
      <label
        htmlFor="languages"
        className="block mb-2 text-xs font-medium text-gray-900"
      >
        Language
      </label>
      <select
        id="languages"
        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
        value={state}
        onChange={(e) => setState(e.target.value)}
        required={true}
      >
        <option className="text-sm" value="">
          select language
        </option>
        {languages.map((language) => (
          <option className="text-sm" key={language} value={language}>
            {language}
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
        className="block mb-2 text-xs font-medium text-gray-900"
      >
        Language
      </label>
      <select
        id="languages"
        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
        value={state}
        onChange={(e) => setState(e.target.value)}
        required={true}
      >
        <option className="text-sm" value="">
          select language
        </option>
        {languages.map(({ language }) => (
          <option className="text-sm" key={language} value={language}>
            {language}
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
        className="block mb-2 text-xs font-medium text-gray-900"
      >
        Category
      </label>
      <select
        id="parish-categories"
        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
        value={state}
        onChange={(e) => setState(e.target.value)}
        required={true}
      >
        <option className="text-sm" value="">
          select category
        </option>
        {parishCategories.map((item, indx) => (
          <option
            className="text-sm"
            key={item.category + indx}
            value={item.category}
          >
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
        className="block mb-2 text-xs font-medium text-gray-900 capitalize"
      >
        Status
      </label>
      <select
        required={true}
        value={state.toUpperCase()}
        onChange={(e) => setState(e.target.value)}
        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
        id="status"
      >
        <option className="text-sm" value="">
          select status
        </option>
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
  setState,
}) => {
  return (
    <div>
      <label
        className="block mb-2 text-xs font-medium text-gray-900 capitalize"
        htmlFor="upload-files"
      >
        {canUploadMultipleImages
          ? title + "s (You can upload multiple)"
          : title}
      </label>
      <input
        className="block w-full text-[10px] text-gray-900 border border-gray-300 p-2 py-2 rounded-lg cursor-pointer bg-gray-50"
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
        className="block mb-2 text-xs font-medium text-gray-900 capitalize"
      >
        {elem.replace("_", "")}
      </label>
      <textarea
        rows={10}
        name={elem.toLowerCase()}
        id={elem.toLowerCase()}
        value={state}
        onChange={(e) => setState(e.target.value)}
        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
        placeholder={
          "Write " + elem.replace("_", "").toLowerCase() + " here..."
        }
        required={true}
      />
    </div>
  );
};
