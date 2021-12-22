import { UPDATE_REVIEW, INITIAL_REVIEW } from "../constants/review";

const initialState = {
  rating: 0,
  comment: "",
  ticket_number: "",
  photos: [],
  service: null,
  complaints: [],
  call: false,

  category: 0,
  status: null,

  saved_review: null,

  timer_step: 1,
  timer_called: false,
  timer_solved: false,

  user_reviews: [],
  user_reviews_count: 0,

  review_message: ""
};

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_REVIEW:
      return {
        ...state,
        [action.payload.name]: action.payload.value
      };

    case INITIAL_REVIEW:
      return {
        ...initialState
      };

    default:
      return state;
  }
};
