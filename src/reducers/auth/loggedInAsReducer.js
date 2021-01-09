import {
  GET_LOGGEDINAS_REQUEST,
  GET_LOGGEDINAS_SUCCESS,
  GET_LOGGEDINAS_FAILURE,
} from "../../actions/types";
import { INITIAL_STATE_BASE } from "../../constants";

const INITIAL_STATE = {
  ...INITIAL_STATE_BASE,
  current_user: {
    email: "",
    name: "",
    profile_picture: "",
  },
};

export default (state = INITIAL_STATE, { type, payload }) => {
  const { isLoading, errorMessage, current_user } = INITIAL_STATE;

  switch (type) {
    case GET_LOGGEDINAS_REQUEST:
      return {
        ...state,
        errorMessage,
        current_user,
        isLoading: true,
      };
    case GET_LOGGEDINAS_SUCCESS:
      return {
        ...state,
        isLoading,
        errorMessage,
        current_user: {
          email: payload.email,
          name: payload.name,
          profile_picture: payload.profile_picture,
          is_initial_setup_complete: payload.is_initial_setup_complete,
        },
      };
    case GET_LOGGEDINAS_FAILURE:
      return {
        ...state,
        isLoading,
        current_user,
        errorMessage: payload,
      };
    default:
      return state;
  }
};
