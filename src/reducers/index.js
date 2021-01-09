import { combineReducers } from "redux";

// Auth reducers.
import csrfReducer from "./auth/csrfReducer";
import loggedInAsReducer from "./auth/loggedInAsReducer";
import loginReducer from "./auth/loginReducer";
import logoutReducer from "./auth/logoutReducer";
import registerReducer from "./auth/registerReducer";
import confirmReducer from "./auth/confirm/confirmReducer";
import resendConfirmationReducer from "./auth/confirm/resendConfirmationReducer";

// DROPDOWN REDUCERS:
// Specialties reducer
import specialtiesReducer from "./specialties/specialtiesReducer";
// Designations reducer
import designationsReducer from "./designations/designationsReducer";
// Specialties reducer
import languagesReducer from "./languages/languagesReducer";

// Users reducers.
import usersPasswordResetReducer from "./users/usersPasswordResetReducer";
import usersProfilePicReducer from "./users/usersProfilePicReducer";
import usersProfileReducer from "./users/usersProfileReducer";
import usersReducer from "./users/usersReducer";
import usersForgotPasswordRequestReducer from "./users/forgot_password/usersForgotPasswordRequestReducer";
import usersForgotPasswordUpdateReducer from "./users/forgot_password/usersForgotPasswordUpdateReducer";
import userTypeReducer from "./users/userTypeReducer";
import usersProfileAdminReducer from "./users/usersProfileAdminReducer";
import usersAcceptAdminReducer from "./users/usersAcceptAdminReducer";
import usersRejectAdminReducer from "./users/usersRejectAdminReducer";

export default combineReducers({
  csrfReducer,
  loggedInAsReducer,
  loginReducer,
  logoutReducer,
  registerReducer,
  confirmReducer,
  resendConfirmationReducer,
  specialtiesReducer,
  designationsReducer,
  languagesReducer,
  usersPasswordResetReducer,
  usersProfilePicReducer,
  usersProfileReducer,
  usersReducer,
  usersForgotPasswordRequestReducer,
  usersForgotPasswordUpdateReducer,
  userTypeReducer,
  usersProfileAdminReducer,
  usersAcceptAdminReducer,
  usersRejectAdminReducer,
});
