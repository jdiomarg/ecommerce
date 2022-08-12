import React, { useEffect } from 'react';
import { Button, Offcanvas } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getCartThunk } from '../store/slices/cart.slices';


const CartSideBar = ({ show, handleClose }) => {
    const dispatch = useDispatch();

    const purchases = useSelector(state => state.cart);

    const navigate = useNavigate();

    console.log(purchases)

    useEffect(() => {
        dispatch(getCartThunk());
    }, [])

    return (
        <div>
            <Offcanvas show={show} onHide={handleClose} placement='end'>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>My Shopping Cart</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Button onClick={() => dispatch(buyCart())}>Process Order</Button>
                    <ul style={{ marginTop: "40px" }}>
                        {
                            purchases.map(purchase => (
                                <li onClick={() => navigate(`/product/${purchase.id}`)}>
                                    <p>Brand: {purchase.brand}</p>
                                    Item: {purchase.title}
                                    <h1>Price: US$ {purchase.price}</h1>
                                    Status: {purchase.status}
                                    <br />
                                </li>
                            ))}
                    </ul>
                </Offcanvas.Body>
            </Offcanvas>
        </div>
    );
};

export default CartSideBar;