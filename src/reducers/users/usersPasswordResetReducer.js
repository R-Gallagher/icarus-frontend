import {
  POST_USERS_SETTINGS_PASSWORDRESET_REQUEST,
  POST_USERS_SETTINGS_PASSWORDRESET_SUCCESS,
  POST_USERS_SETTINGS_PASSWORDRESET_FAILURE,
} from "../../actions/types";
import { INITIAL_STATE_BASE } from "../../constants";

const INITIAL_STATE = {
  ...INITIAL_STATE_BASE,
  responseMessage: "",
};

export default (state = INITIAL_STATE, { type, payload }) => {
  const { isLoading, errorMessage, responseMessage } = INITIAL_STATE;

  switch (type) {
    case POST_USERS_SETTINGS_PASSWORDRESET_REQUEST:
      return {
        ...state,
        errorMessage,
        responseMessage,
        isLoading: true,
      };
    case POST_USERS_SETTINGS_PASSWORDRESET_SUCCESS:
      return {
        ...state,
        isLoading,
        errorMessage,
        responseMessage: payload.message,
      };
    case POST_USERS_SETTINGS_PASSWORDRESET_FAILURE:
      return {
        ...state,
        isLoading,
        responseMessage,
        errorMessage: payload,
      };
    default:
      return state;
  }
};
