import {
  POST_USERS_FORGOTPASSWORD_UPDATE_REQUEST,
  POST_USERS_FORGOTPASSWORD_UPDATE_SUCCESS,
  POST_USERS_FORGOTPASSWORD_UPDATE_FAILURE,
} from "../../../actions/types";
import { INITIAL_STATE_BASE } from "../../../constants";

const INITIAL_STATE = {
  ...INITIAL_STATE_BASE,
  responseMessage: "",
};

export default (state = INITIAL_STATE, { type, payload }) => {
  const { isLoading, errorMessage, responseMessage } = INITIAL_STATE;

  switch (type) {
    case POST_USERS_FORGOTPASSWORD_UPDATE_REQUEST:
      return {
        ...state,
        responseMessage,
        errorMessage,
        isLoading: true,
      };
    case POST_USERS_FORGOTPASSWORD_UPDATE_SUCCESS:
      return {
        ...state,
        isLoading,
        errorMessage,
        responseMessage: payload.message,
      };
    case POST_USERS_FORGOTPASSWORD_UPDATE_FAILURE:
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
