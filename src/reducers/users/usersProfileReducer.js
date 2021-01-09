import {
  GET_USERS_PROFILE_REQUEST,
  GET_USERS_PROFILE_SUCCESS,
  GET_USERS_PROFILE_FAILURE,
  PUT_USERS_PROFILE_REQUEST,
  PUT_USERS_PROFILE_SUCCESS,
  PUT_USERS_PROFILE_FAILURE,
} from "../../actions/types";
import { INITIAL_STATE_BASE } from "../../constants";

const INITIAL_STATE = {
  ...INITIAL_STATE_BASE,
  profile: {
    email: "",
    name: "",
    profile_picture_link: "",
    user_type: "",
    provider: {
      consultation_wait: "",
      addresses: [
        {
          fax: "",
          phone: "",
          address: "",
          latitude: "",
          longitude: "",
          is_wheelchair_accessible: "",
          start_hour: null,
          end_hour: null,
        },
      ],
      education_and_qualifications: "",
      procedural_wait_times: "",
      research_interests: "",
      services_not_provided: "",
      services_provided: "",
      subspecialty_or_special_interests: "",
    },
  },
  isProfileUpdate: null,
  responseMessage: "",
  isVerified: null,
};

export default (state = INITIAL_STATE, { type, payload }) => {
  const {
    isLoading,
    errorMessage,
    responseMessage,
    isVerified,
    profile,
  } = INITIAL_STATE;

  /* We are setting isProfileUpdate because we need to know whether or not the request is an update 
    (to give the user feedback) or just grabbing the current profile info to populate the form. */
  switch (type) {
    case GET_USERS_PROFILE_REQUEST:
    case PUT_USERS_PROFILE_REQUEST:
      return {
        ...state,
        errorMessage,
        responseMessage,
        isVerified,
        profile,
        isLoading: true,
        isProfileUpdate: type === PUT_USERS_PROFILE_REQUEST ? true : false,
      };
    case GET_USERS_PROFILE_SUCCESS:
      // The profile data is only returned when a get occurs.
      return {
        ...state,
        isLoading,
        errorMessage,
        responseMessage,
        isVerified: payload.is_verified_professional,
        profile: payload,
        isProfileUpdate: false,
      };
    case PUT_USERS_PROFILE_SUCCESS:
      return {
        ...state,
        isLoading,
        errorMessage,
        profile: payload.profile,
        isProfileUpdate: true,
        responseMessage: payload.message,
        isVerified: payload.profile.is_verified_professional,
      };
    case GET_USERS_PROFILE_FAILURE:
    case PUT_USERS_PROFILE_FAILURE:
      // We aren't returning the profile because we don't want to clear the fields that they have updated.
      return {
        ...state,
        isLoading,
        responseMessage,
        isVerified,
        errorMessage: payload.message,
        profile: payload.profile,
        isProfileUpdate: type === PUT_USERS_PROFILE_FAILURE ? true : false,
      };
    default:
      return state;
  }
};
