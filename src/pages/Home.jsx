import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filterProductThunk, getProductThunk, filterCategoryThunk } from '../store/slices/product.slice';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate } from "react-router-dom"
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import axios from 'axios';
import ListGroup from 'react-bootstrap/ListGroup';
import { Row, Col } from 'react-bootstrap'

const home = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [searchValue, setSearchValue] = useState("");
    const [categories, setCategories] = useState([]);

    const products = useSelector(state => state.product)

    useEffect(() => {
        dispatch(getProductThunk())

        axios.get('https://ecommerce-api-react.herokuapp.com/api/v1/products/categories')
            .then(res => setCategories(res.data.data.categories))
    }, [])

    return (
        <div>
            <Row>
                <Col style={{ marginTop: "4rem", marginLeft: "4rem" }} lg={3}>
                    <ListGroup>
                        {categories.map(category => (
                            <ListGroup.Item style={{ cursor: "pointer" }}
                                key={category.id}
                                onClick={() => dispatch(filterCategoryThunk(category.id))}>
                                {category.name}
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Col>
                <Col>
                    <h1 style={{ textAlign: "center", paddingTop: "5rem", fontSize: "3rem" }}>OUR PRODUCTS</h1>
                    <InputGroup style={{ width: "50rem", marginLeft: "auto", marginRight: "auto", marginTop: "2rem" }} className="mb-3">
                        <Form.Control
                            placeholder="Search for a Product"
                            aria-label="Recipient's username"
                            aria-describedby="basic-addon2"
                            onChange={e => setSearchValue(e.target.value)}
                            value={searchValue}
                        />
                        <Button style={{ width: "10rem" }} variant="outline-secondary" onClick={() => dispatch(filterProductThunk(searchValue))} id="button-addon2">
                            Search
                        </Button>
                    </InputGroup>

                    <Row xs={1} xl={1} className="g-4">
                        <div style={{ display: "flex", flexWrap: "wrap", width: "100%", gap: "4rem", marginTop: "4rem", marginBottom: "8rem", justifyContent: "center", alignItems: "center" }}>
                            {
                                products.map(productItem => (
                                    <div onClick={() => navigate(`/product/${productItem.id}`)}>
                                        <Col key={products.id}>
                                            <Card style={{ paddingBottom: "10px", width: '20rem', height: "34rem" }}>
                                                <Card.Img variant="top" src={productItem.productImgs} style={{ padding: "1rem", height: "15rem", height: "20rem" }} />
                                                <Card.Body>
                                                    <Card.Title style={{ textAlign: "center" }}>{productItem.category.name}</Card.Title>
                                                    <Card.Text style={{ textAlign: "center" }}>
                                                        {productItem.title}
                                                    </Card.Text>
                                                    <Card.Title style={{ textAlign: "center" }}>US$ {productItem.price}</Card.Title>
                                                    <Button style={{ marginLeft: "50px", marginRight: "50px", marginTop: "10px", marginBottom: "10px", paddingLeft: "50px", paddingRight: "50px" }} variant="primary">More Info...</Button>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                    </div>
                                ))
                            }
                        </div>
                    </Row>
                </Col>
            </Row>
        </div >

    );
};

export default home;