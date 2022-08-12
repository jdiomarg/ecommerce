import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./slices/cart.slices";
import isLoadingSlice from "./slices/isLoading.slices";
import productSlice from "./slices/product.slice";
import purchaseSlice from "./slices/purchases.slice";

export default configureStore({
    reducer: {
        isLoading: isLoadingSlice,
        product: productSlice,
        purchase: purchaseSlice,
        cart: cartSlice,
    }
});
