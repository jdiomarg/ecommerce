import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { setIsLoading } from "./isLoading.slices";

export const productSlice = createSlice({
    name: "Product",
    initialState: [],
    reducers: {
        setProduct: (state, action) => {
            const product = action.payload;
            return product;
        }
    }
});

export const getProductThunk = () => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios
        .get("https://ecommerce-api-react.herokuapp.com/api/v1/products")
        .then((res) => dispatch(setProduct(res.data.data.products))) // setProduct(res.data.data.products)
        .finally(() => dispatch(setIsLoading(false)));
};

export const filterProductThunk = searchValue => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios
        .get(`https://ecommerce-api-react.herokuapp.com/api/v1/products?query=${searchValue}`)
        .then((res) => dispatch(setProduct(res.data.data.products))) // setProduct(res.data.data.products)
        .finally(() => dispatch(setIsLoading(false)));
};

export const filterCategoryThunk = (categoryId) => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios
        .get(`https://ecommerce-api-react.herokuapp.com/api/v1/products?category=${categoryId}`)
        .then((res) => dispatch(setProduct(res.data.data.products)))
        .catch(error => console.log(error.response))
        .finally(() => dispatch(setIsLoading(false)));
};

export const { setProduct } = productSlice.actions;

export default productSlice.reducer;
