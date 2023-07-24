import {Col, Row, Card, Spinner, Pagination} from "react-bootstrap";
import ProductCard from "./ProductCard";
import React, {useState} from "react";
import {Alert} from "react-bootstrap";

const SearchResults = (props) => {
    const {searchResults, currentPage, pageReducer, totalPages, displayCard, setItems, isLoading,isExist,
        setMsg} = props;
    const [manualPage, setManualPage] = useState(currentPage);
    const handlePageSubmit = (event) => {
        event.preventDefault();
        const newPage = +manualPage;
        if (!isNaN(newPage) && newPage >= 1 && newPage <= totalPages) {
            pageReducer({type: 'SET_PAGE', page: newPage});
        }
    };
    return (
        <section className={'container-fluid'}>
            {isLoading ? (
                <Row className={"justify-content-center"}>
                    <Spinner animation={"border"} role={"status"} variant={"primary"}>
                        <span className={"sr-only"}>Loading...</span>
                    </Spinner>
                </Row>
            ) : (
                <Row>
                    <Row>
                        {searchResults.length > 0 ? (
                            <>
                                <Pagination className={`justify-content-center ${isLoading ? 'd-none' : ''}`}
                                            size={"md"} variant={"secondary"} items={totalPages}
                                            style={{fontSize: '1rem'}}
                                >
                                    <Pagination.First
                                        onClick={() => pageReducer({type: 'FIRST_PAGE'})}
                                    />
                                    <Pagination.Prev
                                        onClick={() => pageReducer({type: 'DEC_PAGE'})}
                                        disabled={currentPage === 1}
                                    />
                                    <Pagination.Item active>{currentPage}</Pagination.Item>
                                    <Pagination.Next
                                        onClick={() => pageReducer({type: 'INC_PAGE'})}
                                        disabled={currentPage === totalPages}
                                    />
                                    <Pagination.Last
                                        onClick={() => pageReducer({type: 'SET_PAGE', page: totalPages})}
                                    />
                                    <form onSubmit={handlePageSubmit} className={"d-flex mx-2"}>
                                        <input type="number" min={1} max={totalPages} value={manualPage}
                                               onChange={(event) => setManualPage(event.target.value)}
                                               className={"form-control"} style={{width: '5rem'}}/>
                                        <button type="submit" className={"btn btn-primary"}>Go</button>
                                    </form>
                                </Pagination>

                                <Row className={"my-1"}>
                                    {searchResults.find((result) => result.page === currentPage)?.results.map((product) => (
                                        <Col lg={3} md={4} key={product.id}>
                                            <ProductCard setItems={setItems} product={product} handleClick={displayCard}
                                                         href={"#view-details"} setMsg={setMsg} isExist={isExist}/>
                                        </Col>
                                    ))}
                                </Row>
                            </>
                        ) : (
                            <Col md={12} className={"my-3"}>
                                <Card
                                    className={"text-center shadow-lg rounded border-0 p-3"} key={"no-results"}
                                    style={{fontFamily: 'monospace'}}>
                                    <Card.Body>
                                        <Card.Title>{isLoading ? <Spinner animation="border"/> :
                                            <p> No results found &#128533;</p>}</Card.Title>
                                    </Card.Body>
                                </Card>
                            </Col>
                        )}
                    </Row>
                </Row>
            )}
        </section>
    )
}
export default SearchResults;
