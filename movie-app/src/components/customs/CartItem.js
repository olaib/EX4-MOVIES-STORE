import {Card, Button, Col, Row} from "react-bootstrap";
import MoviesImg from "../../assets/images/movies.png";
import React from "react";
import {PRICE, IMAGE_URL} from "../constants";
import NO_IMAGE from "../../assets/images/movies.png";

const CartItem = (props) => {
    const {item, selectedItems, handleCheckboxChange, dispatch, isSelected,handleDeleteItem} = props;

    return (
        <Card className="mb-3">
            <Row className="text-align-center">
                <Col xs={2}>
                    <input type="checkbox" checked={isSelected} onChange={handleCheckboxChange}
                           data-itemid={item.id}/>
                </Col>
            </Row>
            <div className="d-flex">
                <Col xs={4}>
                    <Card.Img variant="left"
                              src={`${item.poster_path ? IMAGE_URL + item.poster_path : NO_IMAGE}`}
                              className="img-fluid"/>
                </Col>
                <Col xs={8}>
                    <Card.Body>
                        <Card.Title>{item.title}</Card.Title>
                        <Card.Text>${PRICE}</Card.Text>
                        <Button key={"delete-btn"} variant="danger" size="sm" onClick={() => handleDeleteItem(+item.id)}>
                            <i className="fas fa-trash-alt"/>
                        </Button>
                    </Card.Body>
                </Col>
            </div>
        </Card>
    );
};

export default CartItem;
