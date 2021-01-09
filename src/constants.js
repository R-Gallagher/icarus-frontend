export const GOOGLE_API_KEY = JSON.stringify(process.env.GOOGLE_API_KEY);
export const GOOGLE_API_RESTRICTIONS = {
  country: ["ca"],
};
export const GOOGLE_API_FIELDS = [
  "formatted_address",
  "geometry",
  "address_components",
];
export const GOOGLE_API_TYPES = [
  "establishment",
  "address",
  "street_address",
  "point_of_interest",
];

export const COUNTRY =
  window.location.hostname === "www.icarusmed.com" ? "US" : "CAN";

export const ICARUS_API_PROD = `https://api.${window.location.hostname.replace(
  "www.",
  ""
)}`;
export const ICARUS_API_DEV = "http://127.0.0.1:5000";

// needs json stringification to cast both to same type
const env = JSON.stringify(process.env.REACT_APP_DEV_ENV);
var url;

// prod is the only env currently in use while open sourced
// due to financial constraints

if (env === JSON.stringify("prod")) {
  url = ICARUS_API_PROD;
} else {
  url = ICARUS_API_DEV;
}

export const ICARUS_API_BASE_URL = url;

export const TIME_PICKER_LIMITS = {
  HOUR_START: 0,
  HOUR_FINISH: 23,
  MINUTES_IN_HOUR: 60,
  STEP_SIZE: 5,
};

export const COOKIE_IS_AUTHENTICATED = "isAuthenticated";
export const COOKIE_SETUP_REQUIRED = "isSetup";
export const COOKIE_IS_CONFIRMED = "isConfirmed";
export const COOKIE_U_TYPE = "u_type";
export const COOKIE_U = "u";
export const LS_XS = "xs";
// expires in 24 hr
export const COOKIE_MAX_AGE = 86400;

export const INITIAL_STATE_BASE = {
  isLoading: false,
  errorMessage: "",
};
