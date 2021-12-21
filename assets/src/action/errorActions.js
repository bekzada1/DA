import { UPDATE_ERR, INITIAL_ERR } from "../constants/err";


/**
 * [изменяет текст ошибки]
 * @param  {[type]} name [название инпута ошибки]
 * @param  {[text]} name [текст ошибки]
 */
const updateError = (name, text) => dispatch => {
    dispatch({
        type: UPDATE_ERR,
        payload: {
            name, text
        }
    })
}

/**
 * [возвращает к начальному значению]
 */
const initialError = () => dispatch => {
    dispatch({
        type: INITIAL_ERR
    })
}



module.exports = {
    updateError,
    initialError
}
