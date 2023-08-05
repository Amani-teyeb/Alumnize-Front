import axios from 'axios';
import { api } from '../../Config/urlConfig';
import { chatConstants } from './constants';
import axiosInstance from '../../helpers/axios';

const token = window.localStorage.getItem('token');

export const getFriends = (search) => {
  return async (dispatch) => {
    dispatch({ type: chatConstants.GET_FRIENDS_REQUEST });
    const res = await axiosInstance.get(`/getUserSearch?search=${search}`);
    if (res.status === 200) {
      dispatch({
        type: chatConstants.GET_FRIENDS_SUCCESS,
        payload: res.data,
      });
    } else {
      dispatch({ type: chatConstants.GET_FRIENDS_FAILURE });
    }
  };
};

export const accessChat = (userId) => {
  return async (dispatch) => {
    dispatch({ type: chatConstants.ACCESS_CHAT_REQUEST });
    const res = await axiosInstance.post(`/chat`, { userId });
    if (res.status === 200) {
      dispatch({
        type: chatConstants.ACCESS_CHAT_SUCCESS,
        payload: res.data,
      });

      dispatch(fetchChats());
    } else {
      dispatch({ type: chatConstants.ACCESS_CHAT_FAILURE });
    }
  };
};

export const fetchChats = () => {
  return async (dispatch) => {
    dispatch({ type: chatConstants.FETCH_CHAT_REQUEST });
    const res = await axiosInstance.get(`/chat`);
    if (res.status === 200) {
      dispatch({
        type: chatConstants.FETCH_CHAT_SUCCESS,
        payload: res.data,
      });
    } else {
      dispatch({ type: chatConstants.FETCH_CHAT_FAILURE });
    }
  };
};

export const accessChatById = (chatId) => {
  return async (dispatch) => {
    dispatch({ type: chatConstants.ACCESS_CHATBYID_REQUEST });
    const res = await axiosInstance.get(`/chat/${chatId}`);
    if (res.status === 200) {
      dispatch({
        type: chatConstants.ACCESS_CHATBYID_SUCCESS,
        payload: res.data,
      });
      dispatch(getMessages(chatId));
    } else {
      dispatch({ type: chatConstants.ACCESS_CHATBYID_FAILURE });
    }
  };
};

export const createGroup = ({ groupChatName, selectedUsers }) => {
  return async (dispatch) => {
    dispatch({ type: chatConstants.CREATE_GROUP_REQUEST });
    const res = await axiosInstance.post(`/chat/group`, {
      name: groupChatName,
      users: JSON.stringify(selectedUsers),
    });
    if (res.status === 200) {
      dispatch({
        type: chatConstants.CREATE_GROUP_SUCCESS,
        payload: res.data,
      });
    } else {
      dispatch({ type: chatConstants.CREATE_GROUP_FAILURE });
    }
  };
};

export const updateGroupName = ({ groupChatName, selectchatId }) => {
  return async (dispatch) => {
    dispatch({ type: chatConstants.UPDATE_GROUP_NAME_REQUEST });
    const res = await axiosInstance.put(`/chat/rename`, {
      chatId: selectchatId,
      chatName: groupChatName,
    });
    if (res.status === 200) {
      dispatch({
        type: chatConstants.UPDATE_GROUP_NAME_SUCCESS,
        payload: res.data,
      });
      dispatch(fetchChats());
    } else {
      dispatch({ type: chatConstants.UPDATE_GROUP_NAME_FAILURE });
    }
  };
};
export const addUserToGroup = ({ selectchatId, userId }) => {
  return async (dispatch) => {
    dispatch({ type: chatConstants.ADD_USER_REQUEST });
    const res = await axiosInstance.put(`/chat/groupadd`, {
      chatId: selectchatId,
      userId,
    });
    if (res.status === 200) {
      dispatch({
        type: chatConstants.ADD_USER_SUCCESS,
        payload: res.data,
      });
      dispatch(fetchChats());
    } else {
      dispatch({ type: chatConstants.ADD_USER_FAILURE });
    }
  };
};

export const removeUserFromGroup = ({ selectchatId, userId }) => {
  return async (dispatch) => {
    dispatch({ type: chatConstants.REMOVE_USER_REQUEST });
    const res = await axiosInstance.put(`/chat/groupremove`, {
      chatId: selectchatId,
      userId,
    });
    if (res.status === 200) {
      dispatch({
        type: chatConstants.REMOVE_USER_SUCCESS,
        payload: res.data,
      });
      dispatch(getMessages(selectchatId));
    } else {
      dispatch({ type: chatConstants.REMOVE_USER_FAILURE });
    }
  };
};

export const sendNewMessage = ({ chatId, newMessage }) => {
  return async (dispatch) => {
    dispatch({ type: chatConstants.SEND_MESSAGE_REQUEST });
    const res = await axiosInstance.post(`/message`, {
      content: newMessage,
      chatId,
    });
    if (res.status === 200) {
      dispatch({
        type: chatConstants.SEND_MESSAGE_SUCCESS,
        payload: res.data,
      });
      dispatch(getMessages(chatId));
    } else {
      dispatch({ type: chatConstants.SEND_MESSAGE_FAILURE });
    }
  };
};

export const getMessages = (chatId) => {
  // console.log(chatId);
  return async (dispatch) => {
    dispatch({ type: chatConstants.GET_MESSAGES_REQUEST });
    const res = await axiosInstance.get(`/message/${chatId}`);
    if (res.status === 200) {
      dispatch({
        type: chatConstants.GET_MESSAGES_SUCCESS,
        payload: res.data,
      });
    } else {
      dispatch({ type: chatConstants.GET_MESSAGES_FAILURE });
    }
  };
};
