import { courseConstants, favConstants } from '../actions/constants';

const initState = {
  courses: [],
  vcourses: [],
  courseDetails: {},
  error: null,
  loading: false,
};

export default (state = initState, action) => {
  switch (action.type) {
    case courseConstants.GET_COURSES_REQUEST:
      break;
    case courseConstants.GET_COURSES_SUCCESS:
      state = {
        ...state,
        courses: action.payload.courses,
      };
      break;
    case courseConstants.GET_COURSES_FAILURE:
      break;
    case courseConstants.GET_COURSE_BY_SLUG:
      state = {
        ...state,
        courses: action.payload.courses,
      };
      break;
    case courseConstants.ADD_COURSE_REQUEST:
      break;
    case courseConstants.DELETE_COURSE_REQUEST:
      break;
    case courseConstants.DELETE_COURSE_SUCCESS:
      state = {
        ...state,
      };
      break;
    case courseConstants.DELETE_COURSE_FAILURE:
      break;
    case courseConstants.GET_VCOURSES_REQUEST:
      break;
    case courseConstants.GET_VCOURSES_SUCCESS:
      state = {
        ...state,
        vcourses: action.payload.vcourses,
      };
      break;
    case courseConstants.GET_VCOURSES_FAILURE:
      break;
    default:
      return state;
  }
  return state;
};
