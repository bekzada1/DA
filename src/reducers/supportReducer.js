import { UPDATE_SUPPORT } from "../constants/support";

const initialState = {
  message: "",
  success: {
    text: null
  }
};

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_SUPPORT:
      return {
        ...state,
        [action.payload.name]: action.payload.value
      };

    default:
      return state;
  }
};
