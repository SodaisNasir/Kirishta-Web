import moment from "moment/moment";
import { base_url } from "./url";

export const typeCheck = (elem, page) => {
  let str = elem.toLowerCase();
  let result = null;

  if (str.includes("phone") || str.includes("contact_number")) {
    result = "tel";
  } else if (str.includes("flag_code") || str.includes("country_code")) {
    result = "text";
  } else if (str.includes("email_verified_at")) {
    result = "date";
  } else if (str.includes("app_page")) {
    result = "url";
  } else if (str.includes("code") && page === "Provinces Management") {
    result = "text";
  } else if (
    str.includes("id") ||
    str.includes("number") ||
    str.includes("code") ||
    str.includes("amount")
  ) {
    result = "number";
  } else if (str.includes("email")) {
    result = "email";
  } else if (str.includes("password")) {
    result = "password";
  } else if (str.includes("date")) {
    result = "date";
  } else if (str.includes("time")) {
    result = "time";
  } else {
    result = "text";
  }

  return result;
};

// export const convertAMPMto24HourTime = (timeString) => {
//   const [hours, minutes, ampm] = timeString.split(/:|\s/g);
//   let hour = parseInt(hours);
//   if (timeString.toLowerCase().includes("pm")) {
//     hour += 12;
//   }
//   return `${hour}:${minutes}`;
// };

export const convertAMPMto24HourTime = (timeString) =>
  moment(timeString, "h:mm A").format("HH:mm");

export const modifyData = (data, neededProps) => {
  let keys = Object.keys(data[0]);

  const updateObj = (obj) =>
    neededProps
      .map((e) => [e, ""])
      .map(([key, value]) => {
        console.log({
          key,
          value: obj[key.replace(/^_/, "")],
        });
        if (keys.includes(key.replace(/^_/, ""))) {
          return [key, obj[key.replace(/^_/, "")]];
        } else {
          return [key, obj[key]];
        }
      });

  return data.map((obj) => Object.fromEntries(updateObj(obj)));
};

export const excludeTags = (htmlString, resultType = "boolean") => {
  const pattern = /<\/?[a-z][^>]*>/gi;
  const result = htmlString.replace(pattern, "");
  return resultType === "boolean" ? result === "" : result;
};

export const replaceParaWithDivs = (htmlString) =>
  htmlString
    .replace(/<p(.*?)>/gi, (m) =>
      m.includes("class") ? m.replace("p", "div") : "<div>"
    )
    .replace(/<\/p>/gi, "</div>");
// .replace(/class="ql-align-center"/g, 'style="text-align: center;"');

export const fetchData = async ({
  setPaginatedData,
  setData,
  neededProps,
  url,
  page,
  setIsDataFetched,
  sort,
}) => {
  try {
    const res = await fetch(url);
    const json = await res.json();

    console.log("response =>", json);
    if (json.success) {
      let data = json.success.data.length
        ? modifyData(json.success.data, neededProps)
        : json.success.data;
      data = sort ? sort(data) : data;

      console.log("response =>", json.success.data);

      setPaginatedData((prev) => ({
        ...prev,
        items:
          page === "Roles"
            ? data.map((elem) => ({
                ...elem,
                _privilage: JSON.parse(elem._privilage),
              }))
            : data,
      }));
      setData(
        page === "Roles"
          ? data.map((elem) => ({
              ...elem,
              _privilage: JSON.parse(elem._privilage),
            }))
          : data
      );
    } else if (json.error) {
      setPaginatedData((prev) => ({
        ...prev,
        items: [],
      }));
      setData([]);
    }
  } catch (err) {
    console.error(err);
  } finally {
    setIsDataFetched(true);
  }
};

export const fetchDataByLang = async (
  setIsLoading,
  setState,
  type,
  language,
  setTitle
) => {
  try {
    setIsLoading(true);

    let formdata = new FormData();
    formdata.append("type", type);
    formdata.append("language", language);

    let requestOptions = {
      headers: {
        accept: "application/json",
      },
      method: "POST",
      body: formdata,
      redirect: "follow",
    };

    const res = await fetch(`${base_url}/show-about`, requestOptions);
    const json = await res.json();

    if (json.success) {
      const data = json.success.data;
      // console.log(data);
      setState({ value: data.description });
      setTitle && setTitle(data.text);
    }
  } catch (error) {
    console.error(error);
  } finally {
    setIsLoading(false);
  }
};

export const fetchChapters = async (setState, id) => {
  try {
    const res = await fetch(`${base_url}/book-chapter/${id}`);
    const json = await res.json();

    if (json.success) {
      console.log("json.success.data", json.success.data);
      const data =
        json.success.data.length === 0
          ? [{ title: "", description: "" }]
          : json.success.data
              .filter((e) => e)
              .map((elem) => ({
                ...elem,
                title: excludeTags(elem.title, "data"),
              }));
      setState && setState(data);
    }
  } catch (error) {
    console.error(error);
  }
};

export const fetchBooks = async (setBooks, callback) => {
  try {
    const res = await fetch(`${base_url}/books`);
    const json = await res.json();

    if (json.success) {
      const data = json.success.data;
      console.log("books ===>", data);
      setBooks &&
        setBooks(
          data.map((obj) => {
            let newObj = { ...obj };
            delete newObj.updated_at;
            delete newObj.created_at;
            return newObj;
          })
        );
      callback && callback(data);
    }
  } catch (error) {
    console.error(error);
  }
};

export const fetchBookLanguages = async (setState) => {
  try {
    const res = await fetch(`${base_url}/book-language`);
    const json = await res.json();

    if (json.success) {
      const data = json.success.data;
      setState(data);
    }
  } catch (error) {
    console.error(error);
  }
};

export const fetchRoles = async (setState, callback) => {
  try {
    const res = await fetch(`${base_url}/role-privilage`);
    const json = await res.json();

    if (json.success) {
      const data = json.success.data;
      setState && setState(data);
      callback && callback(data);
    }
  } catch (error) {
    console.error(error);
  }
};

export const fetchGeneralCountries = async (setGeneralCountries, callback) => {
  try {
    const res = await fetch(`${base_url}/country`);
    const json = await res.json();

    if (json.success) {
      const data = json.success.data;
      setGeneralCountries(data);
      callback && callback(data);
    }
  } catch (error) {
    console.error(error);
  }
};

export const fetchParishCountries = async (setParishCountries, callback) => {
  try {
    const res = await fetch(`${base_url}/parish-country`);
    const json = await res.json();

    if (json.success) {
      const data = json.success.data;
      setParishCountries(data);
      callback && callback(data);
    }
  } catch (error) {
    console.error(error);
  }
};

export const fetchParishProvinces = async (setParishProvionces, callback) => {
  try {
    const res = await fetch(`${base_url}/province`);
    const json = await res.json();

    if (json.success) {
      const data = json.success.data;
      setParishProvionces(data);
      callback && callback(data);
    }
  } catch (error) {
    console.error(error);
  }
};

export const fetchParishRegions = async (setParishRegions, callback) => {
  try {
    const res = await fetch(`${base_url}/region`);
    const json = await res.json();

    if (json.success) {
      const data = json.success.data;
      setParishRegions(data);
      callback && callback(data);
    }
  } catch (error) {
    console.error(error);
  }
};
