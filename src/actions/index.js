import Cookies from "universal-cookie";

import IcarusRest from "../api/IcarusRest";
import {
  COOKIE_IS_AUTHENTICATED,
  COOKIE_U,
  COOKIE_MAX_AGE,
  LS_XS,
  COOKIE_SETUP_REQUIRED,
  COOKIE_U_TYPE,
  COOKIE_IS_CONFIRMED,
} from "../constants";
import * as types from "./types";

const cookie = new Cookies();

/* CSRF ENDPOINT ACTIONS */
export const fetchCsrf = () => async (dispatch) => {
  dispatch({ type: types.GET_CSRF_REQUEST });

  try {
    const response = await IcarusRest.get("/csrf");
    dispatch({
      type: types.GET_CSRF_SUCCESS,
      payload: response.data,
    });
    // Set the csrf token into local storage.
    localStorage.setItem(LS_XS, response.data.xs);
  } catch (e) {
    dispatch({
      type: types.GET_CSRF_FAILURE,
      payload: e.response.data.message,
    });
  }
};

/* LOGGEDINAS ENDPOINT ACTIONS */
export const loggedInAs = () => async (dispatch) => {
  dispatch({ type: types.GET_LOGGEDINAS_REQUEST });

  try {
    const response = await IcarusRest.get("/loggedInAs", {
      headers: {
        common: {
          "X-CSRF-Token": localStorage.getItem(LS_XS),
        },
      },
    });

    response.data.is_initial_setup_complete &&
      cookie.remove(COOKIE_SETUP_REQUIRED);

    dispatch({ type: types.GET_LOGGEDINAS_SUCCESS, payload: response.data });
  } catch (e) {
    dispatch({
      type: types.GET_LOGGEDINAS_FAILURE,
      payload: e.response.data.message,
    });
  }
};

/* REGISTER ENDPOINT ACTIONS */
export const register = (
  { first_name, last_name, email, password },
  callback
) => async (dispatch) => {
  const name = `${first_name} ${last_name}`;

  dispatch({ type: types.POST_REGISTER_REQUEST });

  try {
    const response = await IcarusRest.post(
      "register",
      {
        name,
        email,
        password,
      },
      {
        headers: {
          common: {
            "X-CSRF-Token": localStorage.getItem(LS_XS),
          },
        },
      }
    );

    cookie.set(COOKIE_SETUP_REQUIRED, true, {
      path: "/",
      maxAge: COOKIE_MAX_AGE,
    });
    cookie.set(COOKIE_IS_AUTHENTICATED, true, {
      path: "/",
      maxAge: COOKIE_MAX_AGE,
    });
    cookie.set(COOKIE_U, response.data.u, {
      path: "/",
      maxAge: COOKIE_MAX_AGE,
    });
    cookie.set(COOKIE_IS_CONFIRMED, false, {
      path: "/",
      maxAge: COOKIE_MAX_AGE,
    });

    dispatch({ type: types.POST_REGISTER_SUCCESS, payload: response.data });

    callback();
  } catch (e) {
    dispatch({
      type: types.POST_REGISTER_FAILURE,
      payload: e.response.data.message,
    });
  }
};

/* CONFIRM ENDPOINT ACTIONS */
export const confirm = (confirmationToken, callback) => async (dispatch) => {
  dispatch({ type: types.POST_CONFIRM_REQUEST });

  try {
    const response = await IcarusRest.post(
      `/confirm/${confirmationToken}`,
      {},
      {
        headers: {
          common: {
            "X-CSRF-Token": localStorage.getItem(LS_XS),
          },
        },
      }
    );

    cookie.remove(COOKIE_IS_CONFIRMED);

    dispatch({ type: types.POST_CONFIRM_SUCCESS, payload: response.data });
    callback();
  } catch (e) {
    dispatch({
      type: types.POST_CONFIRM_FAILURE,
      payload: e.response.data.message,
    });
  }
};

export const resendConfirmation = () => async (dispatch) => {
  dispatch({ type: types.POST_RESEND_CONFIRMATION_REQUEST });

  try {
    const response = await IcarusRest.get("/confirm/resend", {
      headers: {
        common: {
          "X-CSRF-Token": localStorage.getItem(LS_XS),
        },
      },
    });

    dispatch({
      type: types.POST_RESEND_CONFIRMATION_SUCCESS,
      payload: response.data,
    });
  } catch (e) {
    dispatch({
      type: types.POST_RESEND_CONFIRMATION_FAILURE,
      payload: e.response.data.message,
    });
  }
};

/* LOGIN ENDPOINT ACTIONS */
export const login = (email, password, callback) => async (dispatch) => {
  dispatch({ type: types.POST_LOGIN_REQUEST });

  try {
    const response = await IcarusRest.post(
      "/login",
      {
        email,
        password,
      },
      {
        headers: {
          common: {
            "X-CSRF-Token": localStorage.getItem(LS_XS),
          },
        },
      }
    );

    // If initial setup is complete, remove the cookie, otherwise set it.
    if (response.data.is_initial_setup_complete) {
      cookie.remove(COOKIE_SETUP_REQUIRED);
    } else {
      cookie.set(COOKIE_SETUP_REQUIRED, true, { path: "/" });
    }

    if (!response.data.is_confirmed) {
      cookie.set(COOKIE_IS_CONFIRMED, false, { path: "/" });
    } else {
      cookie.remove(COOKIE_IS_CONFIRMED);
    }

    // We do not set cookie expiration here because these need to be session cookies. (Expire when the browser is closed)
    cookie.set(COOKIE_IS_AUTHENTICATED, true, {
      path: "/",
      maxAge: COOKIE_MAX_AGE,
    });

    cookie.set(COOKIE_U, response.data.u, {
      path: "/",
      maxAge: COOKIE_MAX_AGE,
    });

    cookie.set(COOKIE_U_TYPE, response.data.user_type, {
      path: "/",
      maxAge: COOKIE_MAX_AGE,
    });

    /* just send response.data so that first_login can be seen in the response,
    rather than just the message (like in other action creators here) */
    dispatch({ type: types.POST_LOGIN_SUCCESS, payload: response.data });

    // Redirect using the callback
    callback();
  } catch (e) {
    dispatch({
      type: types.POST_LOGIN_FAILURE,
      payload: e.response.data.message,
    });
  }
};

/* LOGOUT ENDPOINT ACTIONS */
export const logout = (callback) => async (dispatch) => {
  dispatch({ type: types.POST_LOGOUT_REQUEST });

  try {
    const response = await IcarusRest.post(
      "/logout",
      {},
      {
        headers: {
          common: {
            "X-CSRF-Token": await localStorage.getItem(LS_XS),
          },
        },
      }
    );

    // Delete the cookies to deauthenticate the user on the frontend.
    cookie.remove(COOKIE_IS_AUTHENTICATED);
    cookie.remove(COOKIE_U);
    cookie.remove(COOKIE_SETUP_REQUIRED);
    cookie.remove(COOKIE_U_TYPE);

    dispatch({
      type: types.POST_LOGOUT_SUCCESS,
      payload: response.data.message,
    });
    // Redirect using the callback
    callback();
  } catch (e) {
    dispatch({
      type: types.POST_LOGOUT_FAILURE,
      payload: e.response.data.message,
    });
  }
};

/* USERS ENDPOINT ACTIONS */
export const fetchUsers = (
  search_key,
  radius,
  page,
  sort_by,
  lat,
  lon,
  name,
  languages_spoken,
  designations,
  is_wheelchair_accessible,
  is_accepting_new_patients
) => async (dispatch) => {
  dispatch({ type: types.GET_USERS_REQUEST });

  try {
    const response = await IcarusRest.get(
      `/users/${search_key}&${radius}&${page}&${sort_by}?lat=${lat}&lon=${lon}${
        name ? `&name=${name}` : ""
      }${languages_spoken ? `&language_ids=${languages_spoken}` : ""}${
        designations ? `&designation_ids=${designations}` : ""
      }${
        is_wheelchair_accessible
          ? `&is_wheelchair_accessible=${is_wheelchair_accessible}`
          : ""
      }${
        is_accepting_new_patients
          ? `&is_accepting_new_patients=${is_accepting_new_patients}`
          : ""
      }`,
      {
        headers: {
          common: {
            "X-CSRF-Token": localStorage.getItem(LS_XS),
          },
        },
      }
    );

    dispatch({ type: types.GET_USERS_SUCCESS, payload: response.data });
    dispatch({ type: "GET_USERS_COMPLETE" });
  } catch (e) {
    dispatch({
      type: types.GET_USERS_FAILURE,
      payload: e.response.data.message,
    });
  }
};

export const fetchUsersProfile = (uuid = null) => async (dispatch) => {
  dispatch({ type: types.GET_USERS_PROFILE_REQUEST });

  try {
    const response = await IcarusRest.get(
      `/users/${uuid || cookie.get(COOKIE_U)}/profile`,
      {
        headers: {
          common: {
            "X-CSRF-Token": localStorage.getItem(LS_XS),
          },
        },
      }
    );

    dispatch({ type: types.GET_USERS_PROFILE_SUCCESS, payload: response.data });
  } catch (e) {
    dispatch({
      type: types.GET_USERS_PROFILE_FAILURE,
      payload: e.response.data.message,
    });
  }
};

export const updateUsersProfile = (
  values,
  uuid = null,
  callback = null
) => async (dispatch) => {
  dispatch({ type: types.PUT_USERS_PROFILE_REQUEST });

  try {
    const response = await IcarusRest.put(
      `/users/${uuid || cookie.get(COOKIE_U)}/profile`,
      values,
      {
        headers: {
          common: {
            "X-CSRF-Token": localStorage.getItem(LS_XS),
          },
        },
      }
    );

    // Once a user successfully updates their profile they shouldn't be in first login anymore.
    cookie.remove(COOKIE_SETUP_REQUIRED);

    dispatch({ type: types.PUT_USERS_PROFILE_SUCCESS, payload: response.data });

    callback && callback();
  } catch (e) {
    dispatch({
      type: types.PUT_USERS_PROFILE_FAILURE,
      payload: e.response.data.message,
    });
  }
};

export const usersProfilePic = (image) => async (dispatch) => {
  dispatch({ type: types.POST_PROFILEPIC_REQUEST });

  try {
    const response = await IcarusRest.post(
      `/users/${cookie.get(COOKIE_U)}/profile_pic`,
      { image },
      {
        headers: {
          common: {
            "X-CSRF-Token": localStorage.getItem(LS_XS),
          },
        },
      }
    );

    dispatch({ type: types.POST_PROFILEPIC_SUCCESS, payload: response.data });
  } catch (e) {
    dispatch({
      type: types.POST_PROFILEPIC_FAILURE,
      payload: e.response.data.message,
    });
  }
};

export const usersPasswordReset = (newPassword, oldPassword) => async (
  dispatch
) => {
  dispatch({ type: types.POST_USERS_SETTINGS_PASSWORDRESET_REQUEST });

  try {
    const response = await IcarusRest.post(
      "/users/settings/password_reset",
      { new_password: newPassword, old_password: oldPassword },
      {
        headers: {
          common: {
            "X-CSRF-Token": localStorage.getItem(LS_XS),
          },
        },
      }
    );

    dispatch({
      type: types.POST_USERS_SETTINGS_PASSWORDRESET_SUCCESS,
      payload: response.data,
    });
  } catch (e) {
    dispatch({
      type: types.POST_USERS_SETTINGS_PASSWORDRESET_FAILURE,
      payload: e.response.data.message,
    });
  }
};

export const usersForgotPasswordRequest = (email) => async (dispatch) => {
  dispatch({ type: types.POST_FORGOTPASSWORD_REQUEST });

  try {
    const response = await IcarusRest.post(
      "/users/forgot_password/request",
      {
        email,
      },
      {
        headers: {
          common: {
            "X-CSRF-Token": localStorage.getItem(LS_XS),
          },
        },
      }
    );

    dispatch({
      type: types.POST_FORGOTPASSWORD_SUCCESS,
      payload: response.data,
    });
  } catch (e) {
    dispatch({
      type: types.POST_FORGOTPASSWORD_FAILURE,
      payload: e.response.data.message,
    });
  }
};

export const usersForgotPasswordUpdate = (
  resetToken,
  newPassword,
  callback
) => async (dispatch) => {
  dispatch({ type: types.POST_USERS_FORGOTPASSWORD_UPDATE_REQUEST });

  try {
    const response = await IcarusRest.post(
      `/users/forgot_password/update/${resetToken}`,
      {
        password: newPassword,
      },
      {
        headers: {
          common: {
            "X-CSRF-Token": localStorage.getItem(LS_XS),
          },
        },
      }
    );

    dispatch({
      type: types.POST_USERS_FORGOTPASSWORD_UPDATE_SUCCESS,
      payload: response.data,
    });
    callback();
  } catch (e) {
    dispatch({
      type: types.POST_USERS_FORGOTPASSWORD_UPDATE_FAILURE,
      payload: e.response.data.message,
    });
  }
};

export const fetchUsersProfileAdmin = () => async (dispatch) => {
  dispatch({ type: types.GET_USERS_PROFILE_ADMIN_REQUEST });

  try {
    const response = await IcarusRest.get(
      `/users/${cookie.get(COOKIE_U)}/profile/admin`,
      {},
      {
        headers: {
          common: {
            "X-CSRF-Token": localStorage.getItem(LS_XS),
          },
        },
      }
    );

    dispatch({
      type: types.GET_USERS_PROFILE_ADMIN_SUCCESS,
      payload: response.data,
    });
  } catch (e) {
    dispatch({
      type: types.GET_USERS_PROFILE_ADMIN_FAILURE,
      payload: e.response.data.message,
    });
  }
};

export const setUsersProfileAdmin = (providers, callback) => async (
  dispatch
) => {
  dispatch({ type: types.PUT_USERS_PROFILE_ADMIN_REQUEST });

  try {
    const response = await IcarusRest.put(
      `/users/${cookie.get(COOKIE_U)}/profile/admin`,
      {
        providers,
      },
      {
        headers: {
          common: {
            "X-CSRF-Token": localStorage.getItem(LS_XS),
          },
        },
      }
    );

    dispatch({
      type: types.PUT_USERS_PROFILE_ADMIN_SUCCESS,
      payload: response.data,
    });

    callback();
  } catch (e) {
    dispatch({
      type: types.PUT_USERS_PROFILE_ADMIN_FAILURE,
      payload: e.response.data,
    });
  }
};

export const usersAcceptAdminRequest = (
  acceptToken,
  adminUuid,
  callback
) => async (dispatch) => {
  dispatch({ type: types.POST_USERS_ACCEPT_ADMIN_REQUEST });
  try {
    const response = await IcarusRest.post(
      `/users/accept_admin_request/${acceptToken}/${adminUuid}`,
      {},
      {
        headers: {
          common: {
            "X-CSRF-Token": localStorage.getItem(LS_XS),
          },
        },
      }
    );

    dispatch({
      type: types.POST_USERS_ACCEPT_ADMIN_SUCCESS,
      payload: response.data,
    });

    callback();
  } catch (e) {
    dispatch({
      type: types.POST_USERS_ACCEPT_ADMIN_FAILURE,
      payload: e.response.data.message,
    });
  }
};

export const usersRejectAdminRequest = (
  acceptToken,
  adminUuid,
  callback
) => async (dispatch) => {
  dispatch({ type: types.POST_USERS_REJECT_ADMIN_REQUEST });
  try {
    const response = await IcarusRest.post(
      `/users/reject_admin_request/${acceptToken}/${adminUuid}`,
      {},
      {
        headers: {
          common: {
            "X-CSRF-Token": localStorage.getItem(LS_XS),
          },
        },
      }
    );

    dispatch({
      type: types.POST_USERS_REJECT_ADMIN_SUCCESS,
      payload: response.data,
    });

    callback();
  } catch (e) {
    dispatch({
      type: types.POST_USERS_REJECT_ADMIN_FAILURE,
      payload: e.response.data.message,
    });
  }
};

export const setUserType = (selected, callback) => async (dispatch) => {
  dispatch({ type: types.PUT_USERS_USER_TYPE_REQUEST });

  try {
    // this is where we will send the user type back to the server based on what has been selected
    const response = await IcarusRest.put(
      `/users/${cookie.get("u")}/user_type`,
      { user_type: selected },
      { headers: { common: { "X-CSRF-Token": localStorage.getItem("xs") } } }
    );

    cookie.set(COOKIE_U_TYPE, response.data.user_type, {
      path: "/",
    });

    dispatch({
      type: types.PUT_USERS_USER_TYPE_SUCCESS,
      payload: response.data,
    });

    callback();
  } catch (e) {
    dispatch({
      type: types.PUT_USERS_USER_TYPE_FAILURE,
      payload: e.response.data.message || e.response.data.user_type[0],
    });
  }
};

/* 
  DROPDOWN LIST ENDPOINTS -> 
  SPECIALTIES, DESIGNATIONS, LANGUAGES 
*/

/* SPECIALTIES ENDPOINT ACTIONS */
export const fetchSpecialties = () => async (dispatch) => {
  dispatch({ type: types.GET_SPECIALTIES_REQUEST });
  try {
    const response = await IcarusRest.get("/specialties", {
      headers: {
        common: {
          "X-CSRF-Token": localStorage.getItem(LS_XS),
        },
      },
    });

    dispatch({ type: types.GET_SPECIALTIES_SUCCESS, payload: response.data });
  } catch (e) {
    dispatch({
      type: types.GET_SPECIALTIES_FAILURE,
      payload: e.response.data.message,
    });
  }
};

export const fetchDesignations = () => async (dispatch) => {
  dispatch({ type: types.GET_DESIGNATIONS_REQUEST });

  try {
    const response = await IcarusRest.get("/designations", {
      headers: {
        common: {
          "X-CSRF-Token": localStorage.getItem(LS_XS),
        },
      },
    });

    dispatch({ type: types.GET_DESIGNATIONS_SUCCESS, payload: response.data });
  } catch (e) {
    dispatch({
      type: types.GET_DESIGNATIONS_FAILURE,
      payload: e.response.data.message,
    });
  }
};

export const fetchLanguages = () => async (dispatch) => {
  dispatch({ type: types.GET_LANGUAGES_REQUEST });

  try {
    const response = await IcarusRest.get("/languages", {
      headers: {
        common: {
          "X-CSRF-Token": localStorage.getItem(LS_XS),
        },
      },
    });

    dispatch({ type: types.GET_LANGUAGES_SUCCESS, payload: response.data });
  } catch (e) {
    dispatch({
      type: types.GET_LANGUAGES_FAILURE,
      payload: e.response.data.message,
    });
  }
};
