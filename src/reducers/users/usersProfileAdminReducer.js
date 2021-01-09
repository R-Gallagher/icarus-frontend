import {
  GET_USERS_PROFILE_ADMIN_REQUEST,
  GET_USERS_PROFILE_ADMIN_SUCCESS,
  GET_USERS_PROFILE_ADMIN_FAILURE,
  PUT_USERS_PROFILE_ADMIN_REQUEST,
  PUT_USERS_PROFILE_ADMIN_SUCCESS,
  PUT_USERS_PROFILE_ADMIN_FAILURE,
} from "../../actions/types";
import { INITIAL_STATE_BASE } from "../../constants";

const INITIAL_STATE = {
  ...INITIAL_STATE_BASE,
  managed_providers: [
    {
      email: "",
      is_relationship_confirmed_by_provider: null,
      name: "",
      profile_picture_link: "",
      uuid: "",
      message: "",
    },
  ],
  receivedProviders: [],
  matchingProviders: [],
  notMatchingEmails: [],
};

export default (state = INITIAL_STATE, { type, payload }) => {
  const {
    isLoading,
    errorMessage,
    managed_providers,
    receivedProviders,
    matchingProviders,
    notMatchingEmails,
  } = INITIAL_STATE;

  switch (type) {
    case GET_USERS_PROFILE_ADMIN_REQUEST:
    case PUT_USERS_PROFILE_ADMIN_REQUEST:
      return {
        ...state,
        errorMessage,
        managed_providers,
        receivedProviders,
        matchingProviders,
        notMatchingEmails,
        isLoading: true,
      };
    case GET_USERS_PROFILE_ADMIN_SUCCESS:
      return {
        ...state,
        isLoading,
        errorMessage,
        receivedProviders,
        matchingProviders,
        notMatchingEmails,
        managed_providers: payload.managed_providers,
      };
    case PUT_USERS_PROFILE_ADMIN_SUCCESS:
      return {
        ...state,
        isLoading,
        errorMessage,
        responseMessage: payload.message,
        receivedProviders: payload.recieved_providers,
        matchingProviders: payload.matching_providers,
        notMatchingEmails: payload.not_matching_emails,
        managed_providers: payload.managed_providers,
      };
    case GET_USERS_PROFILE_ADMIN_FAILURE:
    case PUT_USERS_PROFILE_ADMIN_FAILURE:
      return {
        ...state,
        isLoading,
        managed_providers: payload.managed_providers,
        receivedProviders,
        matchingProviders,
        notMatchingEmails,
        errorMessage: payload.message,
      };
    default:
      return state;
  }
};
