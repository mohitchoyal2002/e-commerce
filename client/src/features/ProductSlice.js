import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  products: null,
  selectedProduct: null
}

const ProductSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setProducts: (state, action)=>{
      state.products = action.payload
    },
    setSelectedProduct: (state, action)=>{
      state.selectedProduct = action.payload
    }
  }
});

export const {setProducts, setSelectedProduct} = ProductSlice.actions

export const products = state=>state.ProductSlice.products
export const selectedProduct = state=>state.ProductSlice.selectedProduct

export default ProductSlice.reducer