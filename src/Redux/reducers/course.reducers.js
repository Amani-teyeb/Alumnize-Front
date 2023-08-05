import { courseConstants } from "../actions/constants"

const initState= {
   courses: [],
   courseDetails: {},
   error: null,
   loading: false
}

export default (state = initState, action) =>{
    switch (action.type){
        case courseConstants.GET_COURSES_REQUEST:
        break
        case courseConstants.GET_COURSES_SUCCESS:
            state = {
                ...state,
                courses: action.payload.courses
            }
        break
        case courseConstants.GET_COURSES_FAILURE:
        break
        case courseConstants.GET_COURSE_BY_SLUG: 
        state = {
            ...state,
            courses: action.payload.courses
        }
        break
        case courseConstants.ADD_COURSE_REQUEST:
        break
    
        default:
            return state;      
      }
      return state;
    };