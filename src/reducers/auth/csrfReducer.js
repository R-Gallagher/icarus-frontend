import {
  GET_CSRF_REQUEST,
  GET_CSRF_SUCCESS,
  GET_CSRF_FAILURE,
} from "../../actions/types";
import { INITIAL_STATE_BASE } from "../../constants";

const INITIAL_STATE = {
  ...INITIAL_STATE_BASE,
  csrfToken: "",
};

export default (state = INITIAL_STATE, { type, payload }) => {
  const { isLoading, errorMessage, csrfToken } = INITIAL_STATE;

  switch (type) {
    case GET_CSRF_REQUEST:
      return {
        ...state,
        errorMessage,
        csrfToken,
        isLoading: true,
      };
    case GET_CSRF_SUCCESS:
      return {
        ...state,
        isLoading,
        errorMessage,
        csrfToken: payload.xs,
      };
    case GET_CSRF_FAILURE:
      return {
        ...state,
        isLoading,
        csrfToken,
        errorMessage: payload,
      };
    default:
      return state;
  }
};
