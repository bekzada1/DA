import { combineReducers } from "redux";
import review from "./reviewReducer";
import agency from "./agencyReducer";
import loader from "./loaderReducer";
import auth from "./authReducer";
import error from "./errorReducer";
import version from "./versionReducer";
import support from "./supportReducer";

export default combineReducers({
  review,
  agency,
  loader,
  auth,
  error,
  version,
  support
});
