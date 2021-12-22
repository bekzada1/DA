import { UPDATE_AUTH, INITIAL_AUTH, UPDATE_AUTH_USER } from "../constants/auth";

const initialState = {
  email: "",
  login: "",
  iin: "",
  password: "",
  rePassword: "",
  confirmed: true,

  user_iin: null,
  user_name: "",
  user_phone: "",
  user_email: "",
  user_verified: false,
  user_authorized: false,
  user_photo: "",

  user: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_AUTH:
      return {
        ...state,
        [action.payload.name]: action.payload.value
      };

    case UPDATE_AUTH_USER:
      return {
        ...state,
        user_authorized: true,
        user_iin: action.payload.iin ? action.payload.iin : null,
        user_email: action.payload.email ? action.payload.email : "",
        user_phone: action.payload.phone ? action.payload.phone : "",
        user_name: action.payload.name ? action.payload.name : "",
        user_verified: action.payload.verified,
        user_photo: action.payload.photo ? action.payload.photo : null
      };

    case INITIAL_AUTH:
      return {
        ...initialState
      };

    default:
      return state;
  }
};
