import instance from "./axios";

import { navigate } from "../routes/NavigationService";
import { UPDATE_REVIEW } from "../constants/review";
import { UPDATE_LOADER } from "../constants/loader";
import { UPDATE_ERR, INITIAL_ERR } from "../constants/err";
import { getItem } from "./storage";

/**
 * [ сохраняет отзыв в базу review]
 * @param  {[type]} review [отзыва]
 * @return {[type]}   [description]
 */
const updateReview = (name, value) => dispatch => {
  dispatch({
    type: UPDATE_REVIEW,
    payload: {
      name,
      value
    }
  });
};

/**
 * [ сохраняет отзыв в базу review]
 * @param  {[type]} review [отзыва]
 * @param  {[type]} agency [услугодатель]
 * @param  {[type]} screen [следующая страница]
 * @return {[type]}   [description]
 */
const saveReview = (agency, review, location, screen) => async dispatch => {
  const user = await getItem("user");
  dispatch({ type: INITIAL_ERR });
  dispatch({ type: UPDATE_LOADER, payload: true });
  instance
    .post(`/api/new/review/add`, {
      agency_id: agency.agency_id,
      rating: review.rating,
      photos: review.photos,
      comment: review.comment,
      agency_type: agency.agency_type,
      complaints: review.complaints,
      city_id: agency.city_id,
      region_id: agency.district_id,
      ticket_number: review.ticket_number,
      service: review.service,
      call: review.call,
      to: agency.agency_type,
      agency_subtype: agency.agency_subtype ? agency.agency_subtype : null,
      location,
      user: user ? user : null
    })
    .then(res => {
      dispatch({ type: UPDATE_LOADER, payload: false });
      dispatch({
        type: UPDATE_REVIEW,
        payload: {
          name: "review_message",
          value: res.data.message
        }
      });
      dispatch({
        type: UPDATE_REVIEW,
        payload: {
          name: "saved_review",
          value: res.data.review
        }
      });
      if (screen) navigate(screen);
    })
    .catch(err => {
      dispatch({ type: UPDATE_LOADER, payload: false });
      navigate("HomeViewScreen");
    });
};

/**
 * [ проверяет review]
 * @param  {[object]} review [отзыв]
 * @param  {[function]} callback [вызываемая функция при успешном запросе]
 * @return {[function]} callback/dispatch []
 */
const validateReview = (review, callback) => dispatch => {
  dispatch({ type: INITIAL_ERR });
  if (!review.rating) {
    dispatch({
      type: UPDATE_ERR,
      payload: {
        screen: "EstimateAgencyScreen",
        name: "",
        text: "Поставьте оценку"
      }
    });
  }
  // else if(!review.service) {
  //     dispatch({
  //         type: UPDATE_ERR,
  //         payload: {name: '', text: 'Выберите услугу'}
  //     })
  // }
  else {
    callback();
  }
};

/**
 * [ принимает id c базы review или newreview и отправляет отзыв суперАдмину]
 * @param  {[type]} id [id отзыва]
 * @return {[type]}   [description]
 */
const sendReviewToAdmin = (admin, review_id, screen) => {
  instance
    .post(`/api/new/review/sendtoadmin/` + admin + `/` + review_id, {})
    .then(res => {
      navigate(screen);
    })
    .catch(err => {
      navigate("HomeViewScreen");
    });
};

/**
 * [Изменяет статус  отзыва в коллекции review/newreview]
 * @param  {[type]} id [id отзыва]
 * @param  {[type]} called [связались ли с ним после отзыва]
 * @param  {[type]} resolved [решена ли проблема]
 * @return {[type]}   [description]
 */
const updateReviewStatus = (id, called, resolved) => {
  instance.get(
    `/api/new/review/updatestatus/` + id + `/` + called + `/` + resolved,
    {}
  );
};

const getReviewsHistory = () => dispatch => {
  instance.get(`/api/new/review/user/history`).then(res => {
    dispatch({
      type: UPDATE_REVIEW,
      payload: {
        name: "user_reviews",
        value: res.data.reviews
      }
    });
    dispatch({
      type: UPDATE_REVIEW,
      payload: {
        name: "user_reviews_count",
        value: res.data.count ? res.data.count : 0
      }
    });
  });
};

module.exports = {
  saveReview,
  sendReviewToAdmin,
  updateReviewStatus,
  validateReview,
  updateReview,
  getReviewsHistory
};
