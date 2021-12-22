import { UPDATE_ERR, INITIAL_ERR } from "../constants/err";

const initialState = {
  screen: null,
  name: null,
  text: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_ERR:
      return {
        ...state,
        screen: action.payload.screen ? action.payload.screen : null,
        name: action.payload.name,
        text: action.payload.text
      };
    case INITIAL_ERR:
      return {
        ...initialState
      };

    default:
      return state;
  }
};
