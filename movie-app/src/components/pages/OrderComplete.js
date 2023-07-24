import React from "react";
import {Col, Container, Row} from "react-bootstrap";
import AnimatedBtn from "./../customs/AnimatedBtn"
import {TITLE_STYLE} from "../constants";

const OrderComplete = () => {
    return (
        <Container>
            <Row>
                <Col>
                    <h1 className={'text-center my-5'}
                        style={TITLE_STYLE}>
                        Order Complete
                    </h1>
                </Col>
            </Row>
            <Row className={'justify-content-center text-center align-items-center d-flex flex-column'}>
                <i className="fas fa-check-circle fa-10x text-center" style={{color: '#28a745'}}/>
                <h1 className={'text-center my-2'}>Thank you for your order!</h1>
                <p>We hope you enjoy your chosen films. If you'd like to continue shopping for more movies, feel free to
                    explore our extensive collection.</p>
                <p className={'text-center'}>Select an option below to continue:</p>
                <h3><i className="fas fa-arrow-down"/></h3>
                <Col sm={3}>
                    <AnimatedBtn value={'Continue Shopping'} link={'/movies'} icon={'fas fa-shopping-cart'}/>
                </Col>
                <Col sm={3} className={'my-3'}>
                    <AnimatedBtn value={'Go Home'} link={'/'} icon={'fas fa-home'}/>
                </Col>
            </Row>
        </Container>
    );
}

export default OrderComplete;
