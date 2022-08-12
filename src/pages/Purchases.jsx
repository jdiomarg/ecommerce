import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPurchasesThunk } from '../store/slices/purchases.slice';

const Purchases = () => {

    const dispatch = useDispatch();

    const purchases = useSelector(state => state.purchases)

    useEffect(() => {
        dispatch(getPurchasesThunk());
    }, [])

    console.log(purchases);

    const getTotal = () => {
        let total = 0;

        purchases.forEach(product => {
            total += toString(product.cart.products.price)
            return total
        });
        return precioTotal
    }

    return (
        <div>
            <h1>Purchases</h1>
            <ul>
                {purchases?.map((purchase) => (
                    <li key={purchases}>
                        <h1>Precio:{purchase.cart.status}</h1>
                        {total}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Purchases;