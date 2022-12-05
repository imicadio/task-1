// e-mail
export const regexEmail = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);

// Minimum eight characters, at least one letter and one number:
export const regexPassword = new RegExp(
  /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
);

export const regexphone = new RegExp(
  /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/
);

export const regexpLogin = new RegExp(/^.{6,}$/);

export const formValid = (type: string, value: string): boolean => {
  switch (type) {
    case "login":
      return !regexpLogin.test(value);
    case "email":
      return !regexEmail.test(value);
    case "password":
      return !regexPassword.test(value);
    case "phone":
      return !regexphone.test(value);
    default:
      return false;
  }
};
