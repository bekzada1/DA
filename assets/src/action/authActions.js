import instance from "./axios";
import jwtDecode from "jwt-decode";
import { AsyncStorage } from "react-native";

import { UPDATE_AUTH, UPDATE_AUTH_USER, INITIAL_AUTH } from "../constants/auth";
import { UPDATE_ERR, INITIAL_ERR } from "../constants/err";
import { UPDATE_LOADER } from "../constants/loader";
import { navigate } from "../routes/NavigationService";
import { saveItem, getItem, removeItem } from "./storage";

/**
 * [авторизация пользователя]
 * @param  {[type]} email [email]
 * @return {[type]}   [description]
 */
const updateAuth = (name, value) => dispatch => {
  dispatch({
    type: UPDATE_AUTH,
    payload: {
      name,
      value
    }
  });
};

/**
 * [авторизация пользователя]
 * @param  {[type]} email [email]
 * @return {[type]}   [description]
 */
const login = (user, callback) => dispatch => {
  dispatch({ type: INITIAL_ERR });
  dispatch({ type: UPDATE_LOADER, payload: true });
  if (!user.email || (user.email && user.email.trim() === "")) {
    dispatch({
      type: UPDATE_ERR,
      payload: {
        screen: "SigninScreen",
        name: "auth",
        text: "Введите почту"
      }
    });
  } else if (!user.password || !user.email.length) {
    dispatch({
      type: UPDATE_ERR,
      payload: {
        screen: "SigninScreen",
        name: "auth",
        text: "Введите пароль"
      }
    });
  } else {
    instance
      .post(`/api/new/auth/signin`, {
        login: user.email.trim(),
        password: user.password.trim()
      })
      .then(async res => {
        await removeItem("user");
        dispatch({ type: INITIAL_AUTH });
        await saveItem("token", res.data.token);
        dispatch({ type: UPDATE_LOADER, payload: false });
        dispatch({
          type: UPDATE_AUTH_USER,
          payload: res.data.user
        });
        callback();
      })
      .catch(err => {
        dispatch({ type: UPDATE_LOADER, payload: false });
        if (err.response && err.response.data.error) {
          dispatch({
            type: UPDATE_ERR,
            payload: {
              screen: "SigninScreen",
              name: "auth",
              text: err.response.data.error
            }
          });
        }
      });
  }
};

/**
 * [  переотправляет код доступа]
 * @param  {[string]} user_id [id пользователя]
 * @return {[type]}   [description]
 */
const checkLogin = (login, nextScreen, callback, getback) => dispatch => {
  dispatch({ type: UPDATE_LOADER, payload: true });
  instance
    .post(`/api/new/auth/checklogin`, { login })
    .then(async res => {
      dispatch({ type: UPDATE_LOADER, payload: false });
      if (res.data && res.data.token) {
        await removeItem("user");
        await saveItem("token", res.data.token);
        if (nextScreen) navigate(nextScreen);
        else callback();
        dispatch({
          type: UPDATE_AUTH_USER,
          payload: res.data.user
        });
      } else getback();
    })
    .catch(err => {
      dispatch({ type: UPDATE_LOADER, payload: false });
      if (err && err.response && err.response.data) {
        dispatch({
          type: UPDATE_ERR,
          payload: {
            name: "login",
            text: err.response.data.error
          }
        });
      }
    });
};

/**
 * [  переотправляет код доступа]
 * @param  {[string]} user_id [id пользователя]
 * @return {[type]}   [description]
 */
const resendCode = callback => {
  instance.post(`/api/new/auth/resendcode`, {}).then(res => {
    callback(60);
  });
};

/**
 * [ проверяет код доступа]
 * @param  {[type]} a []
 * @return {[type]}   [description]
 */
const checkSms = (user, code, successAction) => async dispatch => {
  const token = await getItem("token");
  dispatch({
    type: INITIAL_ERR
  });
  instance
    .post(`/api/new/auth/checksms`, { code, user })
    .then(async res => {
      if (token) {
        await dispatch({
          type: UPDATE_AUTH,
          payload: { name: "user_verified", value: true }
        });
        successAction();
      } else {
        await saveItem("user", res.data.user);
        dispatch({
          type: UPDATE_AUTH,
          payload: { name: "user", value: res.data.user }
        });
        successAction();
      }
    })
    .catch(err => {
      if (err.response && err.response.data && err.response.data.error) {
        dispatch({
          type: UPDATE_ERR,
          payload: {
            name: "",
            text: err.response.data.error
          }
        });
      }
    });
};

/**
 * [ добавляет ИИН в базу пользователя]
 * @param  {[type]} a []
 * @return {[type]}   [description]
 */
const addIIN = (iin, callback) => async dispatch => {
  const user = await getItem("user");
  dispatch({ type: INITIAL_ERR });
  dispatch({ type: UPDATE_LOADER, payload: true });
  if (iin.length < 11) {
    dispatch({ type: UPDATE_LOADER, payload: false });
    dispatch({
      type: UPDATE_ERR,
      payload: {
        name: "iin",
        text: "Введите корректный ИИН"
      }
    });
  } else {
    instance
      .post(`/api/new/auth/addiin`, { iin, user: user ? user : null })
      .then(async res => {
        dispatch({ type: UPDATE_LOADER, payload: false });
        if (user && user._id) {
          await saveItem("user", res.data);
          dispatch({
            type: UPDATE_AUTH,
            payload: { name: "user", value: res.data }
          });
          callback();
        } else {
          dispatch({ type: UPDATE_AUTH_USER, payload: res.data });
          callback();
        }
      })
      .catch(err => {
        if (err && err.response && err.response.data) {
          dispatch({
            type: UPDATE_ERR,
            payload: {
              name: "iin",
              text: err.response.data.error
            }
          });
        }
        dispatch({ type: UPDATE_LOADER, payload: false });
      });
  }
};

/**
 * [ берет информацию с базы о пользователк ]
 * @param  {[type]} a []
 * @return {[type]}   [description]
 */
const getUser = () => async dispatch => {
  const user = await getItem("user");
  dispatch({ type: UPDATE_LOADER, payload: true });
  instance
    .get(`/api/new/auth/user`)
    .then(async res => {
      await removeItem("user");
      dispatch({
        type: UPDATE_AUTH_USER,
        payload: res.data.user
      });
      dispatch({ type: UPDATE_LOADER, payload: false });
    })
    .catch(async err => {
      dispatch({ type: INITIAL_AUTH });
      await removeItem("token");
      user
        ? dispatch({
            type: UPDATE_AUTH,
            payload: { name: "user", value: user }
          })
        : null;
      dispatch({ type: UPDATE_LOADER, payload: false });
    });
};

/**
 * [ проверяет авторизован ли пользователь ]
 * @param  {[type]} a []
 * @return {[type]}   [description]
 */
const isLoggedIn = async () => {
  const token = await getItem("token");
  let payload = null;
  if (token) {
    payload = jwtDecode(token);
    if (!(payload.exp > Date.now() / 1000)) await removeItem("token");
    return payload.exp > Date.now() / 1000;
  } else {
    return false;
  }
};

const signupCabinet = user => dispatch => {
  dispatch({ type: INITIAL_ERR });
  dispatch({ type: UPDATE_LOADER, payload: true });
  if (
    !user.password ||
    (user.password && !user.password.length) ||
    !user.rePassword ||
    !user.rePassword.length ||
    user.password !== user.rePassword
  ) {
    dispatch({
      type: UPDATE_ERR,
      payload: {
        screen: "CabinetScreen",
        name: "auth",
        text: "Пароли не совпадают"
      }
    });
  } else if (!user.email || (user.email && user.email.trim() === "")) {
    dispatch({
      type: UPDATE_ERR,
      payload: {
        screen: "CabinetScreen",
        name: "auth",
        text: "Введите почту"
      }
    });
  } else {
    instance
      .post(`/api/new/auth/cabinet/signup`, {
        email: user.email,
        password: user.password,
        phone: user.phone ? user.phone : null
      })
      .then(async res => {
        await removeItem("user");
        dispatch({ type: INITIAL_AUTH });
        await saveItem("token", res.data.token);
        dispatch({ type: UPDATE_LOADER, payload: false });
        dispatch({
          type: UPDATE_AUTH_USER,
          payload: res.data.user
        });
        navigate("HomeViewScreen");
      })
      .catch(err => {
        dispatch({ type: UPDATE_LOADER, payload: false });
        if (err.response && err.response.data.error) {
          dispatch({
            type: UPDATE_ERR,
            payload: {
              screen: "CabinetScreen",
              name: "auth",
              text: err.response.data.error
            }
          });
        }
      });
  }
};

const updateProfile = (
  name,
  email,
  password,
  rePassword,
  phone,
  photo
) => dispatch => {
  dispatch({ type: INITIAL_ERR });
  dispatch({ type: UPDATE_LOADER, payload: true });
  if (password !== rePassword) {
    dispatch({
      type: UPDATE_ERR,
      payload: {
        screen: "ProfileEditScreen",
        name: "auth",
        text: "Пароли не совпадают"
      }
    });
  } else {
    instance
      .put(`/api/new/auth/user/profile`, {
        name,
        email,
        phone,
        password,
        photo
      })
      .then(async res => {
        dispatch({ type: UPDATE_LOADER, payload: false });
        dispatch({
          type: UPDATE_AUTH_USER,
          payload: res.data.user
        });
        navigate("ProfileScreen");
      })
      .catch(err => {
        dispatch({ type: UPDATE_LOADER, payload: false });
        if (err.response && err.response.data.error) {
          dispatch({
            type: UPDATE_ERR,
            payload: {
              screen: "ProfileEditScreen",
              name: "auth",
              text: err.response.data.error
            }
          });
        }
      });
  }
};

const resetPassword = email => dispatch => {
  dispatch({ type: INITIAL_ERR });
  dispatch({ type: UPDATE_LOADER, payload: true });

  instance
    .post(`/api/new/auth/password/reset`, {
      email
    })
    .then(async res => {
      dispatch({ type: UPDATE_LOADER, payload: false });
      navigate("CheckEmailScreen");
    })
    .catch(err => {
      dispatch({ type: UPDATE_LOADER, payload: false });
      if (err.response && err.response.data.error) {
        dispatch({
          type: UPDATE_ERR,
          payload: {
            screen: "ResetPasswordScreen",
            name: "auth",
            text: err.response.data.error
          }
        });
      }
    });
};

const deleteUser = () => dispatch => {
  instance
    .delete(`/api/new/auth/user/delete`)
    .then(async res => {
      AsyncStorage.removeItem("token");
      dispatch({ type: INITIAL_AUTH });
      navigate("HomeViewScreen");
    })
    .catch(err => {});
};

const logOut = () => async dispatch => {
  await removeItem("token");
  await removeItem("user");
  dispatch({ type: INITIAL_AUTH });
};

const addEmail = (email, callback) => dispatch => {
  dispatch({ type: INITIAL_ERR });
  dispatch({ type: UPDATE_LOADER, payload: true });

  instance
    .post(`/api/new/auth/email`, { email: email })
    .then(async res => {
      if (res.data.user) {
        await saveItem("user", {
          _id: res.data.user._id,
          email: res.data.user.email
        });
        dispatch({
          type: UPDATE_AUTH,
          payload: {
            name: "user",
            value: {
              _id: res.data.user._id,
              email: res.data.user.email
            }
          }
        });
        dispatch({ type: UPDATE_LOADER, payload: false });
        callback();
      }
    })
    .catch(err => {
      if (err && err.response && err.response.data) {
        dispatch({
          type: UPDATE_ERR,
          payload: {
            screen: "InsertEmailScreen",
            name: "email",
            text: err.response.data.error
          }
        });
      }
      dispatch({ type: UPDATE_LOADER, payload: false });
    });
};

/**
 * [ добавляет Телефон в базу пользователя]
 * @param  {[type]} a []
 * @return {[type]}   [description]
 */
const savePhone = (phone, screen) => async dispatch => {
  dispatch({ type: INITIAL_ERR });
  dispatch({ type: UPDATE_LOADER, payload: true });
  const user = await getItem("user");
  let number = phone.trim().replace(/[^0-9]/g, "");
  if (number.length < 11) {
    dispatch({
      type: UPDATE_ERR,
      payload: {
        name: "phone",
        text: "Введите корректный номер"
      }
    });
    dispatch({ type: UPDATE_LOADER, payload: false });
  } else {
    instance
      .post(`/api/new/auth/phone`, { phone: number, user })
      .then(res => {
        navigate("CodeSmsScreen", {
          next: screen,
          user_id: res.data.user_id,
          phone: phone
        });
        dispatch({ type: UPDATE_LOADER, payload: false });
      })
      .catch(err => {
        if (err && err.response && err.response.data) {
          dispatch({
            type: UPDATE_ERR,
            payload: {
              screen: "InsertPhoneScreen",
              name: "phone",
              text: err.response.data.error
            }
          });
        }
        dispatch({ type: UPDATE_LOADER, payload: false });
      });
  }
};

module.exports = {
  resendCode,
  checkSms,
  updateAuth,
  addIIN,
  getUser,
  isLoggedIn,
  checkLogin,
  login,
  signupCabinet,
  logOut,
  updateProfile,
  resetPassword,
  deleteUser,
  addEmail,
  savePhone
};
