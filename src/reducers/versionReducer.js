import { UPDATE_VERSION } from "../constants/version";

const initialState = {
    cache: 'force-cache'

}

export default (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_VERSION:
            return {
                ...state,
                cache: action.payload
            }

        default:
            return state
    }
}
