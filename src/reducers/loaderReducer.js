import { UPDATE_LOADER } from "../constants/loader";

const initialState = {
    status: false

}

export default (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_LOADER:
            return {
                ...state,
                status: action.payload
            }

        default:
            return state
    }
}
