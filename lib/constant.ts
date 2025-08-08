// password
export const PASSWORD_MIN_LENGTH = 4;
export const PASSWORD_REGEX = new RegExp(
  /^(?=.*[a-z])(?=.*\d)(?=.*?[#?!@$%^&*-]).+$/
);
export const PASSWORD_REGEX_ERROR =
  "A password must have numbers and special characters.";

// time
export const TIME_REGEX = /^([01]\d|2[0-3]):([0-5]\d)$/;
export const TIME_REGEX_ERROR = "Time must be in HH:mm format.";
