import SearchBar from '../SearchBar';
import {useState, useEffect, useReducer} from "react";
import {Row, Col, Alert} from "react-bootstrap";
import {
    API_URL, INIT_FILTER, DISCOVER_URL, SEARCH_URL, FIRST_PAGE, SORT_BY, START_YEAR, END_YEAR
    , MAX_PAGES
} from "../constants";
import {Filter, SearchResults, DisplayCartDetails, PupularMovies} from "../customs";
import {json, status} from "../funcs";

const ShoppingPage = (props) => {
    // ================== state ==================
    const [card, setCard] = useState(null);
    const [genres, setGenres] = useState([]);
    const [search, setSearch] = useState("");
    const [history, setHistory] = useState([]);
    const [display, setDisplay] = useState(false);
    const [totalPages, setTotalPages] = useState(0);
    const [isDiscover, setIsDiscover] = useState(true);
    const [isSearching, setIsSearching] = useState(true);
    const [searchResults, setSearchResults] = useState([]);
    const [currentPage, pageDisptach] = useReducer(pageReducer, FIRST_PAGE);
    const [filter, filterDispatch] = useReducer(filterReducer, INIT_FILTER);
    const {loading, setLoading, msg, setMsg} = props;
    // ================== functions ==================
    const handleError = error => {
        setMsg(error.message);
        setLoading(false)
    };

    function handleSearch() {
        setSearchResults([])
        setIsSearching(true);
        setIsDiscover(false);
        pageDisptach({type: "FIRST_PAGE"});
    }

    const displayCard = (product) => {
        setCard(product);
        setDisplay(true);
    }

// ================== HOOKS ==================
    function pageReducer(state, action) {
        switch (action.type) {
            case 'INC_PAGE':
                return state + 1;
            case 'DEC_PAGE':
                return state - 1;
            case 'SET_PAGE':
                return action.page;
            case 'FIRST_PAGE':
                return FIRST_PAGE;
            default:
                return state;
        }
    }

    function filterReducer(state, action) {
        switch (action.type) {
            case 'UPDATE':
                return {...state, [action.payload.key]: action.payload.value};
            case 'RESET':
                return INIT_FILTER;
            case 'SET':
                return action.payload;
            case 'POPULAR_MOVIES':
                setIsDiscover(true);
                setIsSearching(true);
                pageDisptach({type: "FIRST_PAGE"});
                return {...state, popularmovie: true};
            default:
                return state;
        }
    }

    const isValidPage = () => (currentPage < totalPages && !searchResults.find(res => res.page === currentPage));

    const getUrl = () => {
        let url = "";
        if (isDiscover) {
            let filterQuery = filter.genres.length > 0 ? `${filter.genres.map(genre => `&with_genres=${genre}`).join('')}` : "&without_genres=10749";
            filterQuery += filter.popularmovie ? SORT_BY : "";
            filterQuery += filter.releaseYear.start ? `&${START_YEAR}=${filter.releaseYear.start}` : "";
            filterQuery += filter.releaseYear.end ? `&${END_YEAR}=${filter.releaseYear.end}` : "";
            url = `${DISCOVER_URL}&page=${currentPage}${filterQuery}`;
        } else {
            url = `${SEARCH_URL}&query=${search}&page=${currentPage}`;
        }
        return url;
    }
    useEffect(() => {
        const fetchData = async () => {
            const url = getUrl();
            setLoading(true);
            await fetch(`${API_URL}${url}`)
                .then(status)
                .then(json)
                .then(data => {
                    const exist = searchResults.find(res => res.page === currentPage);
                    if (exist) {
                        exist.results = data.results;
                        setSearchResults(searchResults);
                    } else
                        setSearchResults([...searchResults, {page: currentPage, results: data.results}]);
                    setLoading(false);
                    setIsSearching(false);
                    setTotalPages(data.total_pages > MAX_PAGES ? MAX_PAGES : data.total_pages);
                }).catch(handleError);
            setLoading(false);
        }
        if (isSearching || isValidPage()) {
            fetchData();
        }
    }, [isSearching, currentPage, filter, isDiscover]);
    // ================== JSX ==================
    return (
        <section style={{fontFamily: 'monospace'}}>
            <Row>
                <PupularMovies data={searchResults} genres={genres} filterDispatch={filterDispatch}/>
                <Row className={'min-vh-100 mx-2 p-3'}>
                    <Col xs={12} md={2}
                         className={"bg-light rounded shadow-lg p-3"}>
                        <Filter setMsg={setMsg} filter={filter} setFilter={filterDispatch} genres={genres}
                                setIsLoading={setLoading}
                                filterReducer={filterDispatch} setIsDiscover={setIsDiscover}
                                setIsSearching={setIsSearching} setGenres={setGenres}
                        />
                    </Col>
                    <Col xs={12} md={10} className={"mx-auto"}>
                        <Row className={"my-6 mx-auto"}>
                            <Row className={'bg-light rounded shadow-lg my-6 mx-auto    '}>
                                <SearchBar search={search} setSearch={setSearch} setIsSearching={setIsSearching}
                                           handleSearch={handleSearch} setMsg={setMsg} setHistory={setHistory}
                                           history={history}
                                />
                            </Row>
                            {msg && (<Row className={"my-3 mx-auto"}>
                                <Alert variant={"danger"} className={'shadow-lg'}>{msg}</Alert>
                            </Row>)}
                        </Row>
                        <Row>
                            {(display && card) &&
                                <DisplayCartDetails card={card} setDisplay={setDisplay} genres={genres}/>
                            }
                            <SearchResults searchResults={searchResults} totalPages={totalPages}
                                           currentPage={currentPage} isLoading={loading}
                                           pageReducer={pageDisptach} displayCard={displayCard}
                                           setItems={props.setItems} setMsg={setMsg} isExist={props.isExist}/>
                        </Row>
                    </Col>
                </Row>
            </Row>
        </section>
    );
}
export default ShoppingPage;
