import axiosInstance from '../../helpers/axios';
import { favConstants } from './constants';
import store from '../store';

export const getMyCourses = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: favConstants.ADD_MYCOURSES_REQUEST });
      const res = await axiosInstance.get('/mycourse/getcourseliste');
      if (res.status === 200) {
        const { courseItems } = res.data;
        console.log({ getMyCourses: courseItems });
        if (courseItems) {
          dispatch({
            type: favConstants.ADD_MYCOURSES_SUCCESS,
            payload: { courseItems },
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const addTofav = (course) => {
  return async (dispatch) => {
    const {
      mycourse: { courseItems },
      auth,
    } = store.getState();

    courseItems[course._id] = {
      course,
    };
    if (auth.authenticate) {
      dispatch({ type: favConstants.ADD_MYCOURSES_REQUEST });
      const payload = {
        courseItems: [
          {
            course: course._id,
          },
        ],
      };
      const res = await axiosInstance.post('/mycourse/addcourse', payload);
      if (res.status === 201) {
        dispatch(getMyCourses());
      } else {
        localStorage.setItem('mycourse', JSON.stringify(courseItems));
        dispatch({
          type: favConstants.ADD_MYCOURSES_SUCCESS,
          payload: { courseItems },
        });
      }
    }
  };
};

export const updateMyCourses = () => {
  return async (dispatch) => {
    const { auth } = store.getState();
    const courseItems = localStorage.getItem('mycourse') ? JSON.parse(localStorage.getItem('mycourse')) : null;
    if (auth.authenticate) {
      localStorage.removeItem('mycourse');

      if (courseItems) {
        const payload = {
          courseItems: Object.keys(courseItems).map((key, index) => {
            return {
              course: courseItems[key]._id,
            };
          }),
        };
        if (Object.keys(courseItems).length > 0) {
          const res = await axiosInstance.post('/mycourse/addcourse', payload);
          if (res.status === 201) {
            dispatch(getMyCourses());
          }
        }
      }
    } else {
      dispatch({
        type: favConstants.ADD_MYCOURSES_SUCCESS,
        payload: { courseItems },
      });
    }
  };
};
