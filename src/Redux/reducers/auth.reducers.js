import { authConstants, favConstants } from '../actions/constants';

const initState = {
  token: null,
  user: {
    firstName: '',
    lastName: '',
    email: '',
    picture: '',
  },
  wishlist: [],
  images: [],
  authenticate: false,
  authenticating: false,
  loading: false,
  error: null,
  message: '',
};

export default (state = initState, action) => {
  console.log(action);
  switch (action.type) {
    case authConstants.LOGIN_REQUEST:
      state = {
        ...state,
        authenticating: true,
      };
      break;
    case authConstants.LOGIN_SUCCESS:
      state = {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        authenticate: true,
        authenticating: false,
      };
      break;
    case authConstants.SIGNUP_REQUEST:
      state = {
        ...state,
        authenticating: true,
      };
      break;
    case authConstants.SIGNUP_SUCCESS:
      state = {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        authenticate: true,
        authenticating: false,
      };
      break;
    case authConstants.SIGNUP_FAILURE:
      break;
    case authConstants.LOGOUT_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case authConstants.LOGOUT_SUCCESS:
      state = {
        ...initState,
      };
      break;
    case authConstants.LOGOUT_FAILURE:
      state = {
        ...state,
        error: action.payload.error,
        loading: false,
      };
      break;

    case favConstants.ADD_MYCOURSES_SUCCESS:
      state = {
        ...state,
        wishlist: [action.payload],
      };
      break;
    case favConstants.GET_MYCOURSES_SUCCESS:
      state = {
        ...state,
        wishlist: action.payload,
      };
      break;

    case authConstants.UPDATE_USER_REQUEST:
      break;

    case authConstants.UPDATE_USER_SUCCESS:
      state = {
        ...state,
      };
      break;

    case authConstants.UPDATE_USER_FAILURE:
      break;
    case authConstants.GET_IMAGES_REQUEST:
      break;
    case authConstants.GET_IMAGES_SUCCESS:
      state = {
        ...state,
        images: action.payload.images,
      };
      break;
    case authConstants.GET_IMAGES_FAILURE:
      break;

    default:
      return state;
  }
  return state;
};
