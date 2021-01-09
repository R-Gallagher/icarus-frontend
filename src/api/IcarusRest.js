import axios from "axios";
import Cookies from "universal-cookie";

import {
  ICARUS_API_BASE_URL,
  COOKIE_IS_AUTHENTICATED,
  COOKIE_U,
} from ".././constants";
import { GET_CSRF_FAILURE } from "../actions/types";
import store from "../store";

const cookie = new Cookies();

function csrfError() {
  // action creator for csrf expiry
  return {
    type: GET_CSRF_FAILURE,
    payload:
      "Your session has expired after 10 minutes of inactivity, please click okay to continue.",
  };
}

var IcarusRest = axios.create({
  baseURL: ICARUS_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": true,
  },
  withCredentials: true,
});

IcarusRest.interceptors.response.use(
  function(response) {
    return response;
  },
  function(error) {
    if (error.response.status === 400) {
      if (error.response.data.message === "The CSRF token has expired.") {
        store.dispatch(csrfError());
      }
    } else if (error.response.status === 401) {
      // console.log(error.response.data.message)
    } else if (error.response.status === 427) {
      // When the server responds with the user no longer being authenticated delete the cookies.
      cookie.remove(COOKIE_IS_AUTHENTICATED);
      cookie.remove(COOKIE_U);
    }

    return Promise.reject(error);
  }
);

export default IcarusRest;
