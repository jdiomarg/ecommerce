import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { addProductThunk } from '../store/slices/cart.slices';
import { getProductThunk } from '../store/slices/product.slice';
import { Card, Form } from 'react-bootstrap'

const ProductsDetail = () => {

    const allProducts = useSelector(state => state.product)
    const [productDetail, setProductDetail] = useState({})
    const [suggestedProducts, setSuggestedProducts] = useState([]);
    const [quantity, setQuantity] = useState("")

    const { id } = useParams();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const addPurchase = () => {
        alert("Item Added to your Cart")
        const purchase = {
            products: productDetail.id,
            quantity: quantity,
        }
        dispatch(addProductThunk(purchase))
        console.log(purchase)
    }

    useEffect(() => {
        dispatch(getProductThunk())
    }, [])

    useEffect(() => {
        const productsFind = allProducts.find(productItem => productItem.id === Number(id))
        setProductDetail(productsFind);

        const filteredProducts = allProducts.filter(productItem => productItem.category.id === productsFind?.category.id)
        setSuggestedProducts(filteredProducts);
    }, [allProducts, id])

    console.log(productDetail);

    return (
        <div className="row m-3">
            <div style={{ display: "flex", justifyContent: "space-around", backgroundColor: "white", padding: "100px" }}>
                <img src={productDetail?.productImgs?.[0]} style={{ width: "400px" }} alt="" />
                {/* <img src={productDetail?.productImgs?.[1]} style={{ width: "400px" }} alt="" />
                <img src={productDetail?.productImgs?.[2]} style={{ width: "200px" }} alt="" /> */}
            </div>
            <h1 style={{ marginTop: "40px" }}>{productDetail?.title}</h1>
            <p style={{ textAlign: "justify" }}>{productDetail?.description}</p>
            <div className='container-price'>
                <small className='small-txt'>Price:</small>
                <div>
                    <h1><strong>${productDetail?.price}</strong></h1>
                </div>
            </div>

            <Form.Label htmlFor="inputNumber">Quantity</Form.Label>
            <Form.Control
                type="number"
                aria-describedby="passwordHelpBlock"
                value={quantity}
                onChange={e => setQuantity(e.target.value)}
            />
            <button onClick={addPurchase} className="btn btn-primary">Add to Cart <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-cart3" viewBox="0 0 16 16">
                <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l.84 4.479 9.144-.459L13.89 4H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
            </svg>
            </button>
            <h2 className="subtitulo-catalogo ">Más opciones...</h2>
            <div className="row" style={{ marginBottom: "80px", marginTop: "60px" }}>
                <ul style={{ display: "flex", justifyContent: "space-between", }}>
                    {
                        suggestedProducts.map(product => (
                            <li style={{ textDecoration: "none", width: "260px", height: "525px", backgroundColor: "white", padding: "10px", textAlign: "center" }} onClick={() => navigate(`/product/${product.id}`)}>
                                <Card >
                                    <Card.Img style={{ width: "240px", height: "350px" }} variant="top" src={product.productImgs[0]} />
                                    <Card.Body>
                                        <Card.Title>{product.title}</Card.Title>
                                    </Card.Body>
                                    <Card.Footer>
                                        <h2>US$ {product.price}</h2>
                                    </Card.Footer>
                                </Card>
                            </li>
                        ))
                    }
                </ul>
            </div>

        </div>
    );
};

export default ProductsDetail;