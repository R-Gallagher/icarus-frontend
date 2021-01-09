import {
  GET_USERS_REQUEST,
  GET_USERS_SUCCESS,
  GET_USERS_FAILURE,
} from "../../actions/types";
import { INITIAL_STATE_BASE } from "../../constants";

const INITIAL_STATE = {
  ...INITIAL_STATE_BASE,
  specialists: [],
  numSpecialists: 0,
  searchedSpecialty: {},
};

export default (state = INITIAL_STATE, { type, payload }) => {
  const {
    isLoading,
    errorMessage,
    specialists,
    numSpecialists,
    searchedSpecialty,
  } = INITIAL_STATE;

  switch (type) {
    case GET_USERS_REQUEST:
      return {
        ...state,
        specialists,
        numSpecialists,
        searchedSpecialty,
        errorMessage,
        isLoading: true,
      };
    case GET_USERS_SUCCESS:
      return {
        ...state,
        isLoading: true,
        errorMessage,
        numSpecialists: payload.numSpecialists,
        specialists: payload.specialists,
        searchedSpecialty: payload.specialty,
      };
    case "GET_USERS_COMPLETE":
      return {
        ...state,
        isLoading: false,
      };
    case GET_USERS_FAILURE:
      return {
        ...state,
        isLoading,
        specialists,
        numSpecialists,
        searchedSpecialty,
        errorMessage: payload || payload.message,
      };
    default:
      return state;
  }
};
