export const typeCheck = (elem) => {
  let str = elem.toLowerCase();
  let result = null;

  if (str.includes("phone_number") || str.includes("contact_number")) {
    result = "tel";
  } else if (str.includes("flag_code") || str.includes("country_code")) {
    result = "text";
  } else if (str.includes("app_page")) {
    result = "url";
  } else if (
    str.includes("id") ||
    str.includes("number") ||
    str === "toll free (one)" ||
    str.includes("code") ||
    str.includes("amount") ||
    str.includes("ksn") ||
    str.includes("people involved")
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

const modifyData = (data, neededProps) => {
  const keys = Object.keys(data[0]).filter(
    (e) => e !== "created_at" && e !== "updated_at"
  );
  const updateObj = (obj) => {
    let newObj = {};
    keys.forEach((key, indx) => (newObj[neededProps[indx]] = obj[key]));
    console.log(obj, newObj);
    return newObj;
  };

  return data.map(({ created_at, updated_at, ...obj }) => updateObj(obj));
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
