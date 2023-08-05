import axiosInstance from "../../helpers/axios"
import { themeConstants } from "./constants"

export const getThemes =() =>{
    return async dispatch => {
        dispatch({ type: themeConstants.GET_THEMES_REQUEST})
        const res = await axiosInstance.get(`theme/getTheme`)
        if(res.status === 201){
            dispatch ({
                type: themeConstants.GET_THEMES_SUCCESS, 
                payload: res.data
            })
        } else {
            dispatch({
                type: themeConstants.GET_THEMES_FAILURE
            })
        }
    }
}