import React, { useState } from 'react';
import { Modal, OverlayTrigger, Popover, Card, Col, Container, Row, Badge, Button } from 'react-bootstrap';
import { IMAGE_URL } from '../constants';
import '../../public/style.css';

const DisplayCartDetails = ({ card, setDisplay, genres }) => {
    const [tooltipVisible, setTooltipVisible] = useState(false);

    const handleToggleTooltip = () => {
        setTooltipVisible(!tooltipVisible);
    };

    const renderTooltip = () => (
        <Popover id="cart-details-tooltip">
            <Popover.Body>
                <Card.Text>{card.title}</Card.Text>
                <Card.Text>{card.overview}</Card.Text>
            </Popover.Body>
        </Popover>
    );

    return (
        <Container className="my-5 view-details" id="view-details">
            <Row className="justify-content-center">
                <Col md={12} className="my-5">
                    <Card className="card-display text-center shadow-lg rounded border-0 p-3">
                        <Col md={12} className="my-5">
                            <OverlayTrigger
                                placement="right"
                                overlay={renderTooltip()}
                                show={tooltipVisible}
                                onToggle={handleToggleTooltip}
                            >
                                <Card.Img
                                    src={`${IMAGE_URL}${card.poster_path}`}
                                    alt={card.title}
                                    className="img-fluid border-6 card-img-top shadow-sm border-6 rounded"
                                    style={{ height: '300px', width: '100%' }}
                                />
                            </OverlayTrigger>
                        </Col>
                        <Card.Body>
                            <StarRating average={card.vote_average} count={card.vote_count} />
                            <Card.Title>{card.title}</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">{card.release_date}</Card.Subtitle>
                            <Card.Text>{card.overview}</Card.Text>
                            <Card.Text>
                                {genres.filter((genre) => card.genre_ids.includes(+genre.id)).map((genre) => (
                                    <Badge key={genre.id} pill bg="primary" className="me-2">
                                        {genre.name}
                                    </Badge>
                                ))}
                            </Card.Text>
                        </Card.Body>
                        <Card.Footer>
                            <Button variant="danger" onClick={() => setDisplay(false)}>
                                Close
                            </Button>
                        </Card.Footer>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

const StarRating = ({ average, count }) => {
    const filledStars = Math.floor(average / 2);
    const emptyStars = 5 - filledStars;

    return (
        <div className="rating d-flex align-items-center">
            {[...Array(filledStars)].map((star, i) => (
                <i key={i} className="fas fa-star" style={{ color: '#d5f575' }} />
            ))}
            {[...Array(emptyStars)].map((star, i) => (
                <i key={i} className="far fa-star" style={{ color: 'rgb(99,108,145)' }} />
            ))}
            <span className="vote-count ms-2">
        ({count} <i className="fas fa-vote-yea" />)
      </span>
        </div>
    );
};

export { DisplayCartDetails , StarRating};
