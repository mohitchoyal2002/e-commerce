import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    cart: []
}

const CartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    add: (state, action)=>{
        state.cart.push(action.payload)
    },
    setProductInCart: (state, action)=>{
      state.cart = action.payload
    },
    deleteProduct: (state, action)=>{
      state.cart.pop();
    }
  }
});

export const {add, setProductInCart, deleteProduct} = CartSlice.actions
export const Products = state=>state.CartSlice.cart;

export default CartSlice.reducer