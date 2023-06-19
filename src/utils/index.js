export const typeCheck = (elem) => {
  let str = elem.toLowerCase();
  let result = null;

  if (str.includes("phone") || str.includes("contact_number")) {
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
    (e) =>
      e !== "created_at" &&
      e !== "updated_at" &&
      e !== "profile_image" &&
      e !== "about" &&
      (!neededProps.includes("privilage") ? e !== "privilage" : true)
  );

  const updateObj = (obj) => {
    let newObj = {};
    keys.forEach((key, indx) =>
      neededProps[indx].includes(key)
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
