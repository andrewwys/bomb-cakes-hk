import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import displayReducer from './display/display.reducer';
import cartReducer from './cart/cart.reducer';
import dataReducer from './data/data.reducer';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['cart', 'display'],
};

const rootReducer = combineReducers({
  display: displayReducer,
  cart: cartReducer,
  data: dataReducer,
});

export default persistReducer(persistConfig, rootReducer);
