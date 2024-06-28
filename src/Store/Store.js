import { configureStore } from "@reduxjs/toolkit";
import ProductSlicer from "../Slices/ProductSlice";
import ProductDetailSlice from "../Slices/ProductDetailSlice";
import UserDetailSlice from "../Slices/UserDetailSlice";
export const Store = configureStore({
    reducer: {
        products: ProductSlicer,
        productDetail: ProductDetailSlice,
        UserDetail : UserDetailSlice,
    }
})