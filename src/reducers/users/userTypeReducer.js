import {
  PUT_USERS_USER_TYPE_REQUEST,
  PUT_USERS_USER_TYPE_SUCCESS,
  PUT_USERS_USER_TYPE_FAILURE,
} from "../../actions/types";
import { INITIAL_STATE_BASE } from "../../constants";

const INITIAL_STATE = {
  ...INITIAL_STATE_BASE,
  responseMessage: "",
  userType: null,
};

export default (state = INITIAL_STATE, { type, payload }) => {
  const { isLoading, errorMessage, responseMessage, userType } = INITIAL_STATE;

  switch (type) {
    case PUT_USERS_USER_TYPE_REQUEST:
      return {
        ...state,
        errorMessage,
        responseMessage,
        userType,
        isLoading: true,
      };
    case PUT_USERS_USER_TYPE_SUCCESS:
      return {
        ...state,
        isLoading,
        errorMessage,
        responseMessage: payload.message,
        userType: payload.user_type,
      };
    case PUT_USERS_USER_TYPE_FAILURE:
      return {
        ...state,
        isLoading,
        responseMessage,
        userType,
        errorMessage: payload,
      };
    default:
      return state;
  }
};
