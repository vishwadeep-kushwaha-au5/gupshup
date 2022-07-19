
import { combineReducers } from 'redux';

import auth from "./auth"
import status from './status'
import profile from './profile';
import post from './post';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// export default combineReducers({
//     auth,
//     status
// });

const rootPersistConfig = {
    key: 'root',
    storage: storage,
    blacklist: ['auth', 'status', 'profile', 'post'],
  };

const authPersistConfig = {
    key: 'auth',
    storage: storage,
    whitelist: ['user'], // only persist "isLoggedIn"
  };

const rootReducer = combineReducers({
    auth: persistReducer(authPersistConfig, auth),
    profile,
    post,
    status
  });

export default persistReducer(rootPersistConfig, rootReducer);