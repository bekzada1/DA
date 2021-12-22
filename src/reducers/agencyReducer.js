import { UPDATE_AGENCY, INITIAL_AGENCY } from "../constants/agency";

const initialState = {
  cities: [],
  districts: [],
  agencies: [],
  count_agencies: 0,
  count_all_agencies: 0,
  agency_type: {},
  agency_subtype: {},
  agency_subtypes: [],
  all_agency_types: [],
  agency_types: [],
  gos_agency_types: [],
  all_gos: [],
  business_agency_types: [],
  all_business: [],
  agency: {},

  city_id: null,
  district_id: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_AGENCY:
      return {
        ...state,
        [action.payload.name]: action.payload.value
      };

    case INITIAL_AGENCY:
      return {
        ...initialState
      };

    default:
      return state;
  }
};
