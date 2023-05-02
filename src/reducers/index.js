import { configureStore } from '@reduxjs/toolkit'
import userSlice from './features/user/userSlice'
import loadingSlice from './features/loading/loadingSlice'
import alertSlice from './features/alert/alertSlice'
import productSlice from './features/product/productSlice'
import categorySlice from './features/category/categorySlice'
import cartSlice from './features/cart/cartSlice'
import orderSlice from './features/orders/orderSlice'

export default configureStore({
  reducer: {
      user:userSlice,
      loading:loadingSlice,
      alert:alertSlice,
      product:productSlice,
      category:categorySlice,
      cart:cartSlice,
      order:orderSlice
  },
})



