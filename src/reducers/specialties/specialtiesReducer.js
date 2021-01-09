import {
  GET_SPECIALTIES_REQUEST,
  GET_SPECIALTIES_SUCCESS,
  GET_SPECIALTIES_FAILURE,
} from "../../actions/types";
import { INITIAL_STATE_BASE } from "../../constants";

const INITIAL_STATE = {
  ...INITIAL_STATE_BASE,
  specialties: [],
};

export default (state = INITIAL_STATE, { type, payload }) => {
  const { isLoading, errorMessage, specialties } = INITIAL_STATE;

  switch (type) {
    case GET_SPECIALTIES_REQUEST:
      return {
        ...state,
        errorMessage,
        specialties,
        isLoading: true,
      };
    case GET_SPECIALTIES_SUCCESS:
      return {
        ...state,
        isLoading,
        errorMessage,
        specialties: payload.specialties,
      };
    case GET_SPECIALTIES_FAILURE:
      return {
        ...state,
        isLoading,
        specialties,
        errorMessage: payload,
      };
    default:
      return state;
  }
};
