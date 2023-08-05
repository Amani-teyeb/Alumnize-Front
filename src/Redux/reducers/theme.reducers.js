import { themeConstants } from "../actions/constants"

const initState = {
    themes : [],
    loading : false,
    error: null
}

export default  (state = initState, action) =>{
    switch(action.type){
        case themeConstants.GET_THEMES_REQUEST:
        break;
        case themeConstants.GET_THEMES_SUCCESS:
        state = {
           ...state,
           themes: action.payload.themes
        }
        break;
        case themeConstants.GET_THEMES_FAILURE:
        break
        default: return state;
    }
    return state
}