import {combineReducers, configureStore} from '@reduxjs/toolkit'
import {thunk} from 'redux-thunk'
import productsReducer from './slices/productsSlice'
import productReducer from './slices/productSlice'
import authReducer from './slices/authSlice'
import cartReducer from './slices/cartSlice'
import orderReducer from './slices/orderSlice';
import  useReducer from './slices/userSlice'


const reducer = combineReducers({

     productsState:productsReducer,
     productState:productReducer,
     authState : authReducer,
     cartState :cartReducer,
     orderState: orderReducer,
     userState : useReducer,
})

const store = configureStore({
    reducer: reducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk)
  });

export default store;