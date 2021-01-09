import {
  POST_REGISTER_REQUEST,
  POST_REGISTER_SUCCESS,
  POST_REGISTER_FAILURE,
} from "../../actions/types";
import { INITIAL_STATE_BASE } from "../../constants";

const INITIAL_STATE = {
  ...INITIAL_STATE_BASE,
  responseMessage: "",
  u: "",
  isFirstLogin: null,
};

export default (state = INITIAL_STATE, { type, payload }) => {
  const {
    isLoading,
    errorMessage,
    responseMessage,
    u,
    isFirstLogin,
  } = INITIAL_STATE;

  switch (type) {
    case POST_REGISTER_REQUEST:
      return {
        ...state,
        responseMessage,
        u,
        isFirstLogin,
        errorMessage,
        isLoading: true,
      };
    case POST_REGISTER_SUCCESS:
      return {
        ...state,
        isLoading,
        errorMessage,
        responseMessage: payload.message,
        u: payload.u,
        isFirstLogin: payload.first_login,
      };
    case POST_REGISTER_FAILURE:
      return {
        ...state,
        isLoading,
        responseMessage,
        u,
        isFirstLogin,
        errorMessage: payload,
      };
    default:
      return state;
  }
};
