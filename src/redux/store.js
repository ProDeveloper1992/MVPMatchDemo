import AsyncStorage from '@react-native-community/async-storage';
import {createStore, applyMiddleware} from 'redux';

import {persistStore, persistReducer} from 'redux-persist';
import {composeWithDevTools} from 'redux-devtools-extension';

import thunk from 'redux-thunk';
import rootReducer from './reducers';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['userState'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(
  persistedReducer,
  // applyMiddleware(thunk),
  composeWithDevTools(applyMiddleware(thunk)),
);

let persistor = persistStore(store);

export {store, persistor};
