import {
  POST_RESEND_CONFIRMATION_REQUEST,
  POST_RESEND_CONFIRMATION_SUCCESS,
  POST_RESEND_CONFIRMATION_FAILURE,
} from "../../../actions/types";
import { INITIAL_STATE_BASE } from "../../../constants";

const INITIAL_STATE = {
  ...INITIAL_STATE_BASE,
  responseMessage: "",
};

export default (state = INITIAL_STATE, { type, payload }) => {
  const { isLoading, errorMessage, responseMessage } = INITIAL_STATE;

  switch (type) {
    case POST_RESEND_CONFIRMATION_REQUEST:
      return {
        ...state,
        responseMessage,
        errorMessage,
        isLoading: true,
      };
    case POST_RESEND_CONFIRMATION_SUCCESS:
      return {
        ...state,
        isLoading,
        errorMessage,
        responseMessage: payload.message,
      };
    case POST_RESEND_CONFIRMATION_FAILURE:
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
