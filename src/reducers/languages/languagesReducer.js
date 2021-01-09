import {
  GET_LANGUAGES_REQUEST,
  GET_LANGUAGES_SUCCESS,
  GET_LANGUAGES_FAILURE,
} from "../../actions/types";
import { INITIAL_STATE_BASE } from "../../constants";

const INITIAL_STATE = {
  ...INITIAL_STATE_BASE,
  languages: [],
};

export default (state = INITIAL_STATE, { type, payload }) => {
  const { isLoading, errorMessage, languages } = INITIAL_STATE;

  switch (type) {
    case GET_LANGUAGES_REQUEST:
      return {
        ...state,
        errorMessage,
        languages,
        isLoading: true,
      };
    case GET_LANGUAGES_SUCCESS:
      return {
        ...state,
        isLoading,
        errorMessage,
        languages: payload.languages,
      };
    case GET_LANGUAGES_FAILURE:
      return {
        ...state,
        isLoading,
        languages,
        errorMessage: payload,
      };
    default:
      return state;
  }
};
