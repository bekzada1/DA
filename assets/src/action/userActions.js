import instance from "./axios";

import { INITIAL_ERR, UPDATE_ERR } from "../constants/err";
import { UPDATE_SUPPORT } from "../constants/support";

const updateSupport = (name, value) => dispatch => {
  dispatch({
    type: UPDATE_SUPPORT,
    payload: {
      name,
      value
    }
  });
};

/**
 * [получает версию обновления кэш]
 * @return {[type]}   [description]
 */
const sendMessageToSupport = message => dispatch => {
  dispatch({ type: INITIAL_ERR });
  dispatch({
    type: UPDATE_SUPPORT,
    payload: {
      name: "success",
      value: ""
    }
  });
  if (!message || message.trim().length == 0) {
    dispatch({
      type: UPDATE_ERR,
      payload: {
        screen: "SupportScreen",
        name: "support",
        text: "Заполните поле"
      }
    });
  } else {
    return instance
      .post(`/api/new/review/support`, { message })
      .then(async res => {
        dispatch({
          type: UPDATE_SUPPORT,
          payload: {
            name: "message",
            value: ""
          }
        });
        dispatch({
          type: UPDATE_SUPPORT,
          payload: {
            name: "success",
            value: {
              text: "Ваше сообщение успешно отправлено!"
            }
          }
        });
      })
      .catch(err => {
        if (err.response && err.response.data && err.response.data.error) {
          dispatch({
            type: UPDATE_ERR,
            payload: {
              screen: "SupportScreen",
              name: "support",
              text: err.response.data.error
            }
          });
        }
      });
  }
};

module.exports = {
  updateSupport,
  sendMessageToSupport
};
