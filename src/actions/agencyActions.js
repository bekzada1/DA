import instance from "./axios";

import { UPDATE_AGENCY } from "../constants/agency";
import { UPDATE_LOADER } from "../constants/loader";
import { INITIAL_REVIEW } from "../constants/review";
import { UPDATE_VERSION } from "../constants/version";

import { saveItem, getItem } from "./storage";

/**
 * [изменяет данные в редюсере]
 * @param  {[string]} name [название переменной]
 * @param  {[object]} value [присваемое значение переменной]
 */
const updateAgency = (name, value) => dispatch => {
  dispatch({
    type: UPDATE_AGENCY,
    payload: {
      name,
      value
    }
  });
};

/**
 * [получает всех типов услугодателей которые есть в базе]
 * @return {[array]} res.data [все типы услугодателей]
 */
const getAgencyTypes = () => dispatch => {
  dispatch({
    type: UPDATE_LOADER,
    payload: true
  });
  instance
    .get(`/api/new/review/agencytypes`)
    .then(async res => {
      dispatch({
        type: UPDATE_AGENCY,
        payload: {
          name: "agency_types",
          value: res.data.all ? res.data.all : []
        }
      });
      dispatch({
        type: UPDATE_AGENCY,
        payload: {
          name: "count_all_agencies",
          value: res.data.count ? res.data.count : 0
        }
      });
      dispatch({
        type: UPDATE_AGENCY,
        payload: {
          name: "gos_agency_types",
          value: res.data.gos ? res.data.gos : []
        }
      });
      dispatch({
        type: UPDATE_AGENCY,
        payload: {
          name: "business_agency_types",
          value: res.data.business ? res.data.business : []
        }
      });
      dispatch({
        type: UPDATE_AGENCY,
        payload: {
          name: "all_gos",
          value: res.data.gos ? res.data.gos : []
        }
      });
      dispatch({
        type: UPDATE_AGENCY,
        payload: {
          name: "all_business",
          value: res.data.business ? res.data.business : []
        }
      });
      dispatch({
        type: UPDATE_AGENCY,
        payload: {
          name: "all_agency_types",
          value: res.data.all ? res.data.all : []
        }
      });
      dispatch({
        type: UPDATE_LOADER,
        payload: false
      });
    })
    .catch(err => console.log(err));
};

/**
 * [фильтрует всех типов услугодателей]
 * @return {[array]} [типы услугодателей]
 */
const search = (value, array, field, name) => async dispatch => {
  let regExp = new RegExp(value, "i");
  let filtered = await array.filter(item => item[field].search(regExp) != -1);
  dispatch({
    type: UPDATE_AGENCY,
    payload: {
      name,
      value: filtered
    }
  });
};

/**
 * [получает все города которые есть в базе]
 * @return {data {cities :[array]} cities [все города]
 */
const getAllcities = (agency_type, agency_subtype) => dispatch => {
  dispatch({
    type: UPDATE_LOADER,
    payload: true
  });
  const endpoint = agency_subtype
    ? `/api/new/review/city/all/${agency_type}/${agency_subtype}`
    : `/api/new/review/city/all/${agency_type}`;
  instance
    .get(endpoint)
    .then(res => {
      dispatch({
        type: UPDATE_AGENCY,
        payload: {
          name: "cities",
          value: res.data.cities
        }
      });
      dispatch({
        type: UPDATE_LOADER,
        payload: false
      });
    })
    .catch(err => console.log(err));
};

/**
 * [получает все районы которые относятся к определенному городу]
 * @param  {[string]} city_id [id города]
 * @return {[type]}   [description]
 */
const getDistricts = (city_id, agency_type, agency_subtype) => dispatch => {
  dispatch({
    type: UPDATE_LOADER,
    payload: true
  });
  dispatch({
    type: UPDATE_AGENCY,
    payload: {
      name: "districts",
      value: []
    }
  });
  dispatch({
    type: UPDATE_AGENCY,
    payload: {
      name: "city_id",
      value: city_id
    }
  });
  const endpoint = agency_subtype
    ? `/api/new/review/region/bycity/${city_id}/${agency_type}/${agency_subtype}`
    : `/api/new/review/region/bycity/${city_id}/${agency_type}`;
  instance
    .get(endpoint)
    .then(res => {
      dispatch({
        type: UPDATE_AGENCY,
        payload: {
          name: "districts",
          value: res.data.regions
        }
      });
      dispatch({
        type: UPDATE_LOADER,
        payload: false
      });
    })
    .catch(err => console.log(err));
};

/**
 * [получает всех услугодателей которые относятся к этому району]
 * @param  {[string]} region [id района]
 * @return {[type]}   [description]
 */
const getAgencies = (region_id, agency_type, agency_subtype) => dispatch => {
  dispatch({
    type: UPDATE_LOADER,
    payload: true
  });
  dispatch({
    type: UPDATE_AGENCY,
    payload: {
      name: "agencies",
      value: []
    }
  });
  dispatch({
    type: UPDATE_AGENCY,
    payload: {
      name: "district_id",
      value: region_id
    }
  });
  dispatch({ type: INITIAL_REVIEW });
  const endpoint = agency_subtype
    ? `/api/new/review/agencies/veryfied/${region_id}/${agency_type}/${agency_subtype}`
    : `/api/new/review/agencies/veryfied/${region_id}/${agency_type}`;
  instance.get(endpoint, {}).then(res => {
    dispatch({
      type: UPDATE_AGENCY,
      payload: {
        name: "agencies",
        value: res.data.agencies
      }
    });
    dispatch({
      type: UPDATE_AGENCY,
      payload: {
        name: "count_agencies",
        value: res.data.count
      }
    });
    dispatch({
      type: UPDATE_LOADER,
      payload: false
    });
  });
};

/**
 * [получает всех услугодателей которые относятся к этому району]
 * @param  {[string]} region [id района]
 * @return {[type]}   [description]
 */
const checkWorkTime = agency_id => {
  return instance
    .get(`/api/new/review/scheduletime/` + agency_id)
    .then(res => {
      return res.data.time;
    })
    .catch(err => {
      return false;
    });
};

/**
 * [получает версию обновления кэш]
 * @return {[type]}   [description]
 */
const getVersion = () => dispatch => {
  return instance
    .get(`/api/new/review/version`)
    .then(async res => {
      let currentVersion = await getItem("version");
      if (!currentVersion || currentVersion !== res.data.version) {
        await saveItem("version", res.data.version);
        dispatch({
          type: UPDATE_VERSION,
          payload: "reload"
        });
      } else if (currentVersion === res.data.version) {
        dispatch({
          type: UPDATE_VERSION,
          payload: "force-cache"
        });
      }
    })
    .catch(err => {});
};

module.exports = {
  getAllcities,
  getDistricts,
  getAgencies,
  getAgencyTypes,
  updateAgency,
  search,
  checkWorkTime,
  getVersion
};
