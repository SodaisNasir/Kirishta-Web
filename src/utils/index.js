import { base_url } from "./url";

export const typeCheck = (elem) => {
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

export const modifyData = (data, neededProps) => {
  let keys = Object.keys(data[0]).filter(
    (e) =>
      e !== "created_at" &&
      e !== "updated_at" &&
      // e !== "about" &&
      (!neededProps.includes("privilage") ? e !== "privilage" : true)
  );

  if (keys.includes("undefined")) {
    keys = keys.filter((e) => e !== "undefined");
  }

  const updateObj = (obj) => {
    let newObj = {};
    keys.forEach((key, indx) =>
      neededProps[indx]?.includes(key)
        ? (newObj[neededProps[indx]] = obj[key])
        : null
    );

    return newObj;
  };

  return data.map((obj) => updateObj(obj));
};

export const fetchData = async (
  setPaginatedData,
  setData,
  neededProps,
  url
) => {
  try {
    const res = await fetch(url);
    const json = await res.json();
    const data = modifyData(json.success.data, neededProps);

    setPaginatedData((prev) => ({
      ...prev,
      items: data,
    }));
    setData(data);
  } catch (err) {
    console.error(err);
  }
};

export const fetchDataByLang = async (
  setIsLoading,
  setState,
  type,
  language
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
      console.log(data);
      setState({ value: data.description });
    }
  } catch (error) {
    console.error(error);
  } finally {
    setIsLoading(false);
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
