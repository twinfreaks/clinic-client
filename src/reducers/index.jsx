import {combineReducers} from 'redux';
import page from './page';
import doctors from './doctors';
import activeUser from './active-user';

export default combineReducers({
  page,
  doctors,
  activeUser
})