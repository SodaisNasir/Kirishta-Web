export const typeCheck = (elem) => {
  let result = null;

  switch (elem) {
    case "Email":
      result = "email";
      break;
    case "Password":
      result = "password";
      break;
    case "Phone Number":
      result = "tel";
      break;

    default:
      result = "text";
      break;
  }

  return result;
};
