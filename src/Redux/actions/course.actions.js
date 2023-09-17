import { courseConstants, favConstants } from './constants';
import axiosInstance from '../../helpers/axios';
import { getUserWishlist } from './auth.actions';

export const getAllCourses = () => {
  return async (dispatch) => {
    dispatch({ type: courseConstants.GET_COURSES_REQUEST });
    const res = await axiosInstance.get(`/course/allcourses`);
    if (res.status === 200) {
      dispatch({
        type: courseConstants.GET_COURSES_SUCCESS,
        payload: res.data,
      });
    } else {
      dispatch({ type: courseConstants.GET_COURSES_FAILURE });
    }
  };
};

export const AddCourse = (form) => {
  return async (dispatch) => {
    dispatch({ type: courseConstants.ADD_COURSE_REQUEST });
    const res = await axiosInstance.post(`/course/create`, form);

    if (res.status === 201) {
      dispatch({
        type: courseConstants.ADD_COURSE_SUCCESS,
        payload: res.data,
      });
      dispatch(getAllCourses());
    } else {
      dispatch({ type: courseConstants.ADD_COURSE_FAILURE });
    }
  };
};

export const getCourseBySlug = (slug) => {
  return async (dispatch) => {
    const res = await axiosInstance.get(`/courses/${slug}`);
    console.log(res);
    if (res.status === 200) {
      dispatch({
        type: courseConstants.GET_COURSE_BY_SLUG,
        payload: res.data,
      });
    } else {
      // dispatch({
      //     type:
      // })
    }
  };
};

export const addToWishList = (courseId) => {
  console.log(courseId);
  return async (dispatch) => {
    dispatch({ type: favConstants.ADD_MYCOURSES_REQUEST });
    const res = await axiosInstance.put(`/mycourse/addcourse`, { courseId });
    if (res.status === 201) {
      dispatch({
        type: favConstants.ADD_MYCOURSES_SUCCESS,
        payload: res.data,
      });
      dispatch(getUserWishlist());
      console.log(res.data);
    } else {
      // dispatch({
      //     type:
      // })
    }
  };
};

export const deleteCourse = (courseId) => {
  return async (dispatch) => {
    try {
      const res = await axiosInstance.post(`/course/deleteCourse`, courseId);
      dispatch({ type: courseConstants.DELETE_COURSE_REQUEST });

      if (res.status === 201) {
        dispatch({
          type: courseConstants.DELETE_COURSE_SUCCESS,
          payload: res.data,
        });
        dispatch(getAllCourses());
      }
    } catch (error) {
      dispatch({ type: courseConstants.DELETE_COURSE_FAILURE });
    }
  };
};
