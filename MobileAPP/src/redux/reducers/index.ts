import {combineReducers} from 'redux';
import auth from './auth';
import app from './app';
import home from './home';

const appReducer: any = combineReducers({
  auth,
  app,
  home,
});

export default appReducer;

// export type State = ReturnType
export type State = ReturnType<typeof appReducer>;
