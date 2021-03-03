import { combineReducers } from "redux";
import alertReducer from '@reducers/alertReducer';
import authReducer from '@reducers/authReducer';
import userReducer from '@reducers/userReducer';
import permissionsReducer from '@reducers/permissionsReducer';

const rootReducer = combineReducers({
  alert: alertReducer,
  auth: authReducer,
  user: userReducer,
  permissions: permissionsReducer,
});

export default rootReducer;