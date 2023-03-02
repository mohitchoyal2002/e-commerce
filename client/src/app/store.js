import {configureStore} from '@reduxjs/toolkit'
import UserReducer from '../features/userSlice'
import CardSlice from '../features/CardSlice';
import ProductSlice from '../features/ProductSlice';
import CartSlice from '../features/CartSlice';
import ProfileSlice from '../features/profileSlice';
import orderSlice from '../features/orderSlice';

export default configureStore({
  reducer:{
    UserReducer,
    CardSlice,
    ProductSlice,
    CartSlice,
    ProfileSlice,
    orderSlice
  }
})