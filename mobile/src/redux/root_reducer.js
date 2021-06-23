import {combineReducers} from 'redux';
import patientsReducer from './patients/patient.reducer';
import {persistReducer} from 'redux-persist';
import {AsyncStorage} from 'react-native';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['auth'],
};

const rootReducer = combineReducers({
  patientsReducer,
});

export default persistReducer(persistConfig, rootReducer);
