import React from 'react';
import {Col, Row, Card} from "react-bootstrap";
import AnimatedBtn from "../customs/AnimatedBtn";

const ErrorPage = () => {
    return (
        <section key={"errorPage"} className={"my-5 flex-column justify-content-center align-items-center"}>
            <Row className={"my-5 justify-content-center text-center align-items-center d-flex flex-column"}>
                <Col md={6} className={"text-center"}>
                    <Card className={"shadow-lg p-3 mb-5 bg-white rounded-6"} sm={6}>
                        <Card.Header className={"text-center shadow-md display-6"}>Error 404</Card.Header>
                        <Card.Body className={"text-center"}>
                            <i className="fas fa-exclamation-triangle"
                               style={{color: 'red', fontSize: '100px'}}/>
                            <Card.Title>Page Not Found <span
                                className={'display-6'}>&#128533;</span></Card.Title>
                            <Card.Subtitle>
                                <br/>
                                <h5 style={{
                                    fontFamily: 'monospace',
                                    fontStyle: 'italic',
                                }}>
                                    The page you are looking for does not exist.
                                </h5>
                            </Card.Subtitle>
                            <br/>
                            <Row>
                                <Col className="text-center">
                                    <AnimatedBtn value={"Go Back"} link={"/"} icon={"fas fa-arrow-left"}/>
                                </Col>
                            </Row>
                            <br/>
                        </Card.Body>
                        <Card.Footer className={"text-muted text-center"}>Popcornflix</Card.Footer>
                    </Card>
                </Col>
            </Row>
        </section>
    );
}

export default ErrorPage;
