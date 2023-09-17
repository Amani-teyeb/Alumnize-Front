import { authConstants, favConstants } from './constants';
import axiosInstance from '../../helpers/axios';

export const signup = (user) => {
  return async (dispatch) => {
    dispatch({ type: authConstants.SIGNUP_REQUEST });
    const res = await axiosInstance.post(`/signup`, {
      ...user,
    });

    if (res.status === 201) {
      const { token, user } = res.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      dispatch({
        type: authConstants.SIGNUP_SUCCESS,
        payload: {
          token,
          user,
        },
      });
      dispatch(login(user));
    } else {
      dispatch({
        type: authConstants.SIGNUP_FAILURE,
        payload: { error: res.data.error },
      });
    }
  };
};

export const login = (user) => {
  console.log(user);

  return async (dispatch) => {
    dispatch({ type: authConstants.LOGIN_REQUEST });
    const res = await axiosInstance.post(`/signin`, {
      ...user,
    });

    if (res.status === 200) {
      const { token, user } = res.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      dispatch({
        type: authConstants.LOGIN_SUCCESS,
        payload: {
          token,
          user,
        },
      });
    } else {
      dispatch({
        type: authConstants.LOGIN_FAILURE,
        payload: { error: res.data.error },
      });
    }
  };
};

export const isUserLoggedIn = () => {
  return async (dispatch) => {
    const token = localStorage.getItem('token');
    if (token) {
      const user = JSON.parse(localStorage.getItem('user'));
      dispatch({
        type: authConstants.LOGIN_SUCCESS,
        payload: {
          token,
          user,
        },
      });
    } else {
      dispatch({
        type: authConstants.LOGIN_FAILURE,
        payload: { error: 'Failed to login' },
      });
    }
  };
};
export const Logout = () => {
  return async (dispatch) => {
    dispatch({ type: authConstants.LOGOUT_REQUEST });
    const res = await axiosInstance.post(`signout`);

    if (res.status === 200) {
      localStorage.clear();
      dispatch({ type: authConstants.LOGOUT_SUCCESS });
      dispatch({ type: favConstants.REST_CART });
    } else {
      dispatch({
        type: authConstants.LOGOUT_FAILURE,
        payload: { error: res.data.error },
      });
    }
  };
};

export const getUserWishlist = () => {
  return async (dispatch) => {
    dispatch({ type: favConstants.GET_MYCOURSES_REQUEST });
    const res = await axiosInstance.get(`wishlist`);
    if (res.status === 201) {
      dispatch({
        type: favConstants.GET_MYCOURSES_SUCCESS,
        payload: res.data,
      });
    } else {
      // dispatch({
      //     type:
      // })
    }
  };
};

export const addPayPic = (form) => {
  return async (dispatch) => {
    dispatch({ type: authConstants.ADD_PAYPIC_REQUEST });
    const res = await axiosInstance.put(`/user/payPicUpdate`, form);

    if (res.status === 201) {
      dispatch({
        type: authConstants.ADD_PAYPIC_SUCCESS,
        payload: res.data,
      });
    } else {
      dispatch({ type: authConstants.ADD_PAYPIC_FAILURE });
    }
  };
};

export const updateUser = (theuser) => {
  return async (dispatch) => {
    try {
      const res = await axiosInstance.post(`/user/editUser`, theuser);
      dispatch({ type: authConstants.UPDATE_USER_REQUEST });

      if (res.status === 201) {
        dispatch({
          type: authConstants.UPDATE_USER_SUCCESS,
          payload: res.data,
        });
        console.log(res.data);
      }
    } catch (error) {
      dispatch({ type: authConstants.UPDATE_USER_FAILURE });
    }
  };
};
