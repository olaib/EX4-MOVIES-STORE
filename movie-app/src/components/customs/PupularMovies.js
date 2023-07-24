import React, {useEffect, useState} from "react";
import {Card, Carousel} from "react-bootstrap";
import {IMAGE_URL} from "../constants";

/***
 * Popular movies carousel component for displaying popular movies
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const PopularMovies = (props) => {
    const [pubulars, setPopulars] = useState([]);
    const {data, filterDispatch} = props;
    const [isPupularFetched, setIsPupularFetched] = useState(false)

    useEffect(() => {
        if (isPupularFetched)
            return;
        if (data.length > 0) {
            setPopulars(data[0].results);
            setIsPupularFetched(true);
            return;
        }
        filterDispatch({type: "UPDATE", payload: {key: "sort_by", value: "popularity.desc"}});
    }, [isPupularFetched, data]);

    return (
        <div className="container-fluid rounded-3 shadow-lg bg-white rounded"
             style={{fontFamily: 'monospace'}}>
            <Carousel interval={2000} indicators controls
                      className="carousel slide carousel-fade mx-auto">
                {pubulars.map(movie => (
                    <Carousel.Item key={movie.id} style={{backgroundColor: '#000',height: '50vh'}}>
                        <div style={{position: 'relative', height: '100%', width: '100%'}}>
                            <Card.Img
                                variant="top"
                                src={`${IMAGE_URL}${movie.poster_path}`}
                                className="img-fluid"
                                style={{height: '50vh', width: '100%', objectFit: 'none'}}/>
                            <div className="carousel-caption rounded shadow-lg p-3" style={{
                                backgroundColor: 'rgba(0,0,0,0.64)',
                                position: 'absolute', bottom: 0, left: 0, right: 0
                            }}>
                                <Card.Title className="text-capitalize display-6 mb-4" style={{color: '#fff'}}>
                                    {movie.title}
                                </Card.Title>
                                <Card.Text className="text-capitalize" style={{color: '#fff'}}>
                                    {movie.overview}
                                    <br/>
                                    <i className="fas fa-calendar-alt me-2"/>
                                    <small>{movie.release_date}</small>
                                    <br/>
                                    <i className="fas fa-star me-2"/>
                                    <small>{movie.vote_average}</small>
                                    <br/>
                                    <i className="fas fa-vote-yea me-2 mb-5" style={{color: "#4d4646"}}/>
                                    <small>{movie.vote_count}</small>
                                </Card.Text>
                            </div>
                        </div>
                    </Carousel.Item>
                ))}
            </Carousel>
        </div>
    );
}
export default PopularMovies;
