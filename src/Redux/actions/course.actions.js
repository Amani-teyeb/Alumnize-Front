import {courseConstants} from './constants'
import axiosInstance from '../../helpers/axios'


export const getAllCourses = () =>{
    return async dispatch =>{
        dispatch({type: courseConstants.GET_COURSES_REQUEST})
        const res = await axiosInstance.get(`/course/allcourses`)
        if(res.status === 200){
            dispatch ({
                type: courseConstants.GET_COURSES_SUCCESS,
                payload: res.data  
            })
        }else{
            dispatch({type: courseConstants.GET_COURSES_FAILURE})
        }

    }
}

export const AddCourse = (form) =>{
    return async dispatch =>{
        dispatch({type: courseConstants.ADD_COURSE_REQUEST})
        const res = await axiosInstance.post(`/course/create`, form)
  
        if(res.status === 201){
            dispatch ({
                type: courseConstants.ADD_COURSE_SUCCESS,
                payload: res.data
            })
            dispatch(getAllCourses())
        }else{
            dispatch({type: courseConstants.ADD_COURSE_FAILURE})
        }

    }
}

export const getCourseBySlug = (slug) =>{
    return async dispatch => {
        const res = await axiosInstance.get(`/courses/${slug}`);
        console.log(res)
        if (res.status === 200) {
            dispatch({
                type: courseConstants.GET_COURSE_BY_SLUG,
                payload: res.data
            });
        } else {
            // dispatch({
            //     type: 
            // })
        }
    }
}
