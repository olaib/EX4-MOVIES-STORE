import {
    Form, Button, Card, Badge, Row, Col,
    Container, ListGroup, Overlay, Popover, Tooltip, OverlayTrigger
} from "react-bootstrap";
import React, {useState, useEffect} from "react";
import {json, status} from "../funcs";
import {API_URL, GENRES, API_KEY, INIT_FILTER,FILTERED_GENRES} from "../constants";

// ========================== COMPONENTS ==========================
const GenresFilter = (props) => {
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        props.filterReducer({type: "UPDATE", payload: {key: "genres", value: selectedGenres}});
    }, [selectedGenres]);

    const handleGenreChange = (e) => {
        const genreId = +e.target.value;
        if (selectedGenres.includes(genreId)) {
            setSelectedGenres(selectedGenres.filter((id) => id !== genreId));
        } else {
            setSelectedGenres([...selectedGenres, genreId]);
        }
    };

    return (
        <>
            <Form.Check type="checkbox" label="Genres" onChange={() => setIsOpen(!isOpen)}/>
            {isOpen &&
                <Form.Group>
                    <ul>
                        {props.genres.map((genre) => (
                            <li key={genre.id}>
                                <Form.Check
                                    key={genre.id}
                                    type="checkbox"
                                    value={genre.id}
                                    label={genre.name}
                                    checked={selectedGenres.includes(genre.id)}
                                    onChange={handleGenreChange}
                                />
                            </li>
                        ))}
                    </ul>
                </Form.Group>
            }
        </>
    );
};

const ReleaseYearFilter = (props) => {
    const [releaseYear, setReleaseYear] = useState({start: null, end: new Date().toISOString().slice(0, 10)});
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        props.filterReducer({type: "UPDATE", payload: {key: "releaseYear", value: releaseYear}});
    }, [releaseYear]);

    const handleStartDateChange = (e) => {
        const start = e.target.value;
        const {end} = releaseYear;
        if (start || end) {
            if (!start || !end) {
                const year = start || end;
                setReleaseYear({start: year, end: year});
            } else {
                setReleaseYear({start: start, end: end});
            }
        }
    }

    const handleEndDateChange = (e) => {
        setReleaseYear({...releaseYear, end: e.target.value});
    };


    return (
        <>
            <Form.Check type="checkbox" label="Release Year" onChange={() => setIsOpen(!isOpen)}/>
            {isOpen &&
                <Form.Group>
                    <Form.Label>From</Form.Label>
                    <Form.Control
                        type="date"
                        value={releaseYear.start}
                        onChange={handleStartDateChange}
                    />
                    <Form.Label>To</Form.Label>
                    <Form.Control
                        type="date"
                        value={releaseYear.end}
                        onChange={handleEndDateChange}
                    />
                </Form.Group>
            }
        </>
    );
}
const PopularMoviesFilter = ({filterReducer}) => {
    const [popularMovies, setPopularMovies] = useState(false);

    const handlePopularMoviesChange = (e) => {
        setPopularMovies(e.target.checked);
    };
    useEffect(() => {
        filterReducer({type: "POPULAR_MOVIES"});
    }, [popularMovies]);

    return (
        <Form.Group>
            <Form.Check
                type="checkbox"
                label="Popular Movies"
                checked={popularMovies}
                onChange={handlePopularMoviesChange}
            />
        </Form.Group>
    );
}

const Filter = (props) => {
    const {filter, genres, setGenres, setIsLoading, filterReducer} = props;
    const [filterHistory, setFilterHistory] = useState([]);

    const handleError = (error) => props.setMsg(error.message);

    // fetch genres from API
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            await fetch(`${API_URL}/${GENRES}?api_key=${API_KEY}`)
                .then(status)
                .then(json)
                .then(data => {
                    data = data.genres.filter((genre) => FILTERED_GENRES.includes(genre.name));
                    props.setGenres(data);
                    filterReducer({type: "UPDATE", payload: {key: "genres", value: data.map((genre) => genre.id)}});
                })
        }
        fetchData()
            .catch(handleError);
        setIsLoading(false);
    }, []);

    return (
        <Container className={'mt-3 rounded '}>
            <h5 className={'text-center'}><i className="fas fa-filter"/> Filter</h5>
            <FilterHistory filterHistory={filterHistory} setFilterHistory={setFilterHistory}
                           setIsDiscover={props.setIsDiscover} setIsSearching={props.setIsSearching}
                           filterReducer={filterReducer} genres={genres}/>
            <hr/>
            <GenresFilter filterReducer={filterReducer} genres={props.genres} setGenres={setGenres}/>
            <hr/>
            <ReleaseYearFilter filterReducer={filterReducer}/>
            <hr/>
            <PopularMoviesFilter filterReducer={filterReducer}/>
            <hr/>
            <Button variant="outline-primary" onClick={() => {
                setFilterHistory([...filterHistory, filter]);
                props.setIsDiscover(true);
                props.setIsSearching(true);
            }}>
                Search</Button>
        </Container>
    );
};
export default Filter;


const FilterHistory = (props) => {
    const [show, setShow] = useState(false);
    const {filterHistory, setFilterHistory, setIsDiscover, setIsSearching, filterReducer, genres} = props;
    const handleClick = () => setShow(!show);
    const renderTooltip = (history) => (
        <Popover id="filter-history-tooltip" className="filter-history-popover w-100">
            <Popover.Header className={'bg-white'}>
                <h3 className={'text-center'}>
                    <Button variant="outline-danger rounded-circle" disabled={filterHistory.length === 0}
                            size={'sm'} className="float-right"
                            onClick={() => setFilterHistory([])}
                            style={{position: 'absolute', left: '0', top: '0'}}>
                        <i className="fas fa-sm fa-trash-alt"/>
                    </Button>
                    Filter History</h3>
                <i className="fas fa-sm fa-times mt-2 mx-2" onClick={() => setShow(false)} type={'button'}
                   style={{position: 'absolute', right: '0', top: '0'}}/>
            </Popover.Header>
            <Popover.Body>
                <div style={{maxHeight: '300px', overflowY: 'auto'}}>
                    {history.length === 0 ? <h6 className={'text-center'}>No filter history</h6> : (
                        history.map((filter, index) => (
                            <Card key={index} className="mb-2  mt-2 border-bottom border-dark shadow-sm">
                                <Card.Body>
                                    <Row className="justify-content-between">
                                        <ListGroup variant="flush">
                                            <ListGroup.Item>
                                                <b>Genres:</b>{' '}
                                                {filter.genres.map((genreId) =>
                                                    genres.find((genre) => genre.id === genreId)?.name
                                                ).join(', ')}
                                            </ListGroup.Item>
                                            <ListGroup.Item className=" justify-content-between">
                                                <h6><i className="fas fa-sm fa-calendar-alt"/> Release Year:</h6>
                                                <span type="date"> {filter.releaseYear.start} </span>
                                                <span type="date"> - {filter.releaseYear.end} </span>
                                            </ListGroup.Item>
                                            <ListGroup.Item>
                                                <b>Popular Movies: </b>
                                                {filter.popularMovies ? (
                                                    <i className="fas fa-check" style={{color: 'green'}}/>
                                                ) : (
                                                    <i className="fas fa-times" style={{color: 'red'}}/>
                                                )}
                                            </ListGroup.Item>
                                        </ListGroup>
                                    </Row>
                                    <hr/>
                                    <div className="text-center mt-2">
                                        <i
                                            type="button"
                                            className="fas fa-sm fa-search mx-2 text-primary"
                                            onClick={() => {
                                                filterReducer({type: "SET", payload: filter});
                                                setIsDiscover(true);
                                                setIsSearching(true);
                                            }}
                                        />
                                        <i className="fas fa-trash-alt mx-2" style={{color: 'red'}}
                                           type="button"
                                           as={Button}
                                           onClick={() => {
                                               setFilterHistory(
                                                   filterHistory.filter((filterHistory) => filterHistory !== filter)
                                               );
                                           }}
                                        />
                                    </div>
                                </Card.Body>
                            </Card>
                        )))}

                </div>
            </Popover.Body>
        </Popover>
    );

    return (
        <div className="text-center mb-3 position-relative">
            <OverlayTrigger placement="right" overlay={renderTooltip(filterHistory)} show={show}>
                <Button variant="outline-primary" onClick={handleClick}>
                    <i className="fas fa-history"/> History
                </Button>
            </OverlayTrigger>
        </div>
    );
};
