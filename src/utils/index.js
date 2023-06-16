export const typeCheck = (elem) => {
  let str = elem.toLowerCase();
  let result = null;

  if (str.includes("phone number") || str.includes("contact number")) {
    result = "tel";
  } else if (str.includes("flag_code") || str.includes("country_code")) {
    result = "text";
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
