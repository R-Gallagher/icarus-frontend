import {
  POST_LOGIN_REQUEST,
  POST_LOGIN_SUCCESS,
  POST_LOGIN_FAILURE,
} from "../../actions/types";
import { INITIAL_STATE_BASE } from "../../constants";

const INITIAL_STATE = {
  ...INITIAL_STATE_BASE,
  responseMessage: "",
  u: "",
  user_type: "",
};

export default (state = INITIAL_STATE, { type, payload }) => {
  const {
    isLoading,
    errorMessage,
    responseMessage,
    u,
    user_type,
  } = INITIAL_STATE;

  switch (type) {
    case POST_LOGIN_REQUEST:
      return {
        ...state,
        responseMessage,
        u,
        errorMessage,
        user_type,
        isLoading: true,
      };
    case POST_LOGIN_SUCCESS:
      return {
        ...state,
        isLoading,
        errorMessage,
        responseMessage: payload.message,
        u: payload.u,
        is_confirmed: payload.is_confirmed,
        is_initial_setup_complete: payload.is_initial_setup_complete,
        user_type: payload.user_type,
      };
    case POST_LOGIN_FAILURE:
      return {
        ...state,
        isLoading,
        responseMessage,
        u,
        user_type,
        errorMessage: payload,
      };
    default:
      return state;
  }
};
