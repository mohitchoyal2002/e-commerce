import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  orders: [],
  selectedOrder: null
}

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    setOrders: (state, action)=>{
      state.orders = action.payload
    },
    setSelectedOrder: (state, action)=>{
      state.selectedOrder = action.payload
    } 
  }
});

export const {setOrders} = orderSlice.actions

export default orderSlice.reducer