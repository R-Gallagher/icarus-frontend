import {
  GET_DESIGNATIONS_REQUEST,
  GET_DESIGNATIONS_SUCCESS,
  GET_DESIGNATIONS_FAILURE,
} from "../../actions/types";
import { INITIAL_STATE_BASE } from "../../constants";

const INITIAL_STATE = {
  ...INITIAL_STATE_BASE,
  designations: [],
};

export default (state = INITIAL_STATE, { type, payload }) => {
  const { isLoading, errorMessage, designations } = INITIAL_STATE;

  switch (type) {
    case GET_DESIGNATIONS_REQUEST:
      return {
        ...state,
        errorMessage,
        designations,
        isLoading: true,
      };
    case GET_DESIGNATIONS_SUCCESS:
      return {
        ...state,
        isLoading,
        errorMessage,
        designations: payload.designations,
      };
    case GET_DESIGNATIONS_FAILURE:
      return {
        ...state,
        isLoading,
        designations,
        errorMessage: payload,
      };
    default:
      return state;
  }
};
