import { configureStore } from '@reduxjs/toolkit';
import loginNameReducer from './LoginName'; 
import UserNameReducer from './UserName';
import OrderReducer from './Orders'
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import { combineReducers } from '@reduxjs/toolkit';

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  timeout: 2000
};

const reducer = combineReducers({
  loginname: loginNameReducer,
  username: UserNameReducer,
  orders:OrderReducer
});

const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
export const persistor = persistStore(store);

export default store;