import { combineReducers } from 'redux';
import authReducer from './auth.reducers';
import courseReducer from './course.reducers';
import themeReducers from './theme.reducers';
import chatReducers from './chat.reducers';

const rootReducer = combineReducers({
  auth: authReducer,
  course: courseReducer,
  theme: themeReducers,
  chat: chatReducers,
});
export default rootReducer;
