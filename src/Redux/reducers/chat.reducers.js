import { chatConstants } from '../actions/constants';
// friends : searchResult
const initState = {
  friends: [],
  selectedChat: {},
  chats: [],
  messages: [],
  loading: false,
};

export default (state = initState, action) => {
  switch (action.type) {
    case chatConstants.GET_FRIENDS_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case chatConstants.GET_FRIENDS_SUCCESS:
      state = {
        ...state,
        friends: action.payload.users,
        loading: false,
      };
      break;
    case chatConstants.GET_FRIENDS_FAILURE:
      state = {
        ...state,
        loading: true,
      };
      break;
    case chatConstants.ACCESS_CHAT_REQUEST:
      break;
    case chatConstants.ACCESS_CHAT_SUCCESS:
      state = {
        ...state,
        selectedChat: action.payload,
        loading: false,
      };
      break;
    case chatConstants.ACCESS_CHAT_FAILURE:
      break;
    case chatConstants.FETCH_CHAT_REQUEST:
      break;
    case chatConstants.FETCH_CHAT_SUCCESS:
      state = {
        ...state,
        chats: action.payload,
      };
      break;
    case chatConstants.FETCH_CHAT_FAILURE:
      break;
    case chatConstants.CREATE_GROUP_SUCCESS:
      state = {
        ...state,
        chats: [...state.chats, action.payload],
      };
      break;
    case chatConstants.ACCESS_CHATBYID_SUCCESS:
      state = {
        ...state,
        selectedChat: action.payload,
      };
      break;
    case chatConstants.UPDATE_GROUP_NAME_SUCCESS:
      state = {
        ...state,
        selectedChat: action.payload,
      };
      break;
    case chatConstants.ADD_USER_SUCCESS:
      state = {
        ...state,
        selectedChat: action.payload,
      };
      break;
    case chatConstants.REMOVE_USER_SUCCESS:
      state = {
        ...state,
        selectedChat: action.payload,
      };
      break;
    case chatConstants.SEND_MESSAGE_SUCCESS:
      state = {
        ...state,
        messages: [...state.messages, action.payload],
      };
      break;
    
      case chatConstants.RECIEVE_MESSAGE_SUCCESS:
        state = {
          ...state,
          messages: [...state.messages, action.payload],
        };
        break;

    case chatConstants.GET_MESSAGES_SUCCESS:
      state = {
        ...state,
        messages: action.payload,
      };
      break;

    default:
      return state;
  }
  return state;
};
