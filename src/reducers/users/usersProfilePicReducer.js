import {
  POST_PROFILEPIC_REQUEST,
  POST_PROFILEPIC_SUCCESS,
  PUT_USERS_PROFILE_FAILURE,
} from "../../actions/types";
import { INITIAL_STATE_BASE } from "../../constants";

const INITIAL_STATE = {
  ...INITIAL_STATE_BASE,
  responseMessage: "",
  profile_picture: "",
};

export default (state = INITIAL_STATE, { type, payload }) => {
  const {
    isLoading,
    errorMessage,
    responseMessage,
    profile_picture,
  } = INITIAL_STATE;

  switch (type) {
    case POST_PROFILEPIC_REQUEST:
      return {
        ...state,
        responseMessage,
        profile_picture,
        errorMessage,
        isLoading: true,
      };
    case POST_PROFILEPIC_SUCCESS:
      return {
        ...state,
        isLoading,
        profile_picture,
        errorMessage,
        responseMessage: payload.message,
      };
    case PUT_USERS_PROFILE_FAILURE:
      return {
        ...state,
        isLoading,
        responseMessage,
        profile_picture,
        errorMessage: payload,
      };
    default:
      return state;
  }
};
