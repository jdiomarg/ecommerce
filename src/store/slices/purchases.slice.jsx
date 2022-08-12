import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import getConfig from '../../utils/getConfig';
import { setIsLoading } from './isLoading.slices';

export const purchaseSlice = createSlice({
    name: 'purchase',
    initialState: [],
    reducers: {
        setPurchase: (state, action) => {
            const purchase = action.payload;
            return purchase
        }
    }
})

export const getPurchasesThunk = () => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios.get(`https://ecommerce-api-react.herokuapp.com/api/v1/purchases`, getConfig())
        .then((res) => dispatch(setPurchase(res.data.data.purchases)))
        .finally(() => dispatch(setIsLoading(false)));
}

export const addPurchaseThunk = purchase => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios
        .post(
            `https://ecommerce-api-react.herokuapp.com/api/v1/purchases`,
            purchase,
            getConfig()
        )
        .then(() => dispatch(getPurchasesThunk()))
        .finally(() => dispatch(setIsLoading(false)));
};

// export const buyCart = () => (dispatch) => {
//     dispatch(setIsLoading(true));
//     return axios
//         .post(
//             "https://ecommerce-api-react.herokuapp.com/api/v1/purchases",
//             {},
//             getConfig()
//         )
//         .then(() => dispatch(setPurchase([])))
//         .finally(() => dispatch(setIsLoading(false)));
// };


export const { setPurchase } = purchaseSlice.actions;

export default purchaseSlice.reducer;