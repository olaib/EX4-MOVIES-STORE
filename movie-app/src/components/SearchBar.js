import {Button, Form, Stack, OverlayTrigger, Tooltip, Popover, Row, ButtonGroup} from "react-bootstrap";
import {Filter} from "./customs/Filter";
import {useState, useEffect, Fragment} from "react";

const SearchBar = (props) => {
    const [searchHstroy, setSearchHstroy] = useState([]);

    const {search, setSearch, handleSearch,setIsSearching} = props;

    return (
        <Stack direction="horizontal" gap={3}>
            <Button
                className="btn-sm rounded-circle"
                variant="danger"
                onClick={() => setSearch("")}
            >
                <i className="fas fa-eraser"/>
            </Button>
            <Form.Control
                autoFocus={true}
                autoComplete="on"
                type="text"
                className={"me-auto rounded-pill shadow-sm border-0"}
                placeholder="Search ..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <Button
                className="btn-sm rounded-circle"
                variant="success"
                onClick={() => {
                    if (search !== "") {
                        handleSearch(search);
                        setSearchHstroy([search, ...searchHstroy]);
                    }
                }}
            >
                <i className="fas fa-search"/>
            </Button>
            <SearchBarHistory searchHistory={searchHstroy} setSearchHistory={setSearchHstroy}
                                handleSearch={handleSearch} setSearch={setSearch}/>
        </Stack>
    );
};

export default SearchBar;



const SearchBarHistory = (props) => {
    const [show, setShow] = useState(false);
    const {searchHistory, setSearchHistory, handleSearch,setSearch} = props;

    const handleClick = () => setShow(!show);

    const renderTooltip = () => (
        <Popover id="search-history-tooltip" className="search-history-popover w-100">
            <Popover.Header className={'bg-white'}>
                <h3 className={'text-center'}>
                    <Button variant="outline-danger rounded-circle" disabled={searchHistory.length === 0}
                            size={'sm'} className="float-right"
                            onClick={() => setSearchHistory([])}
                            style={{position: 'absolute', left: '0', top: '0'}}>
                        <i className="fas fa-sm fa-trash-alt"/>
                    </Button>
                    Search History
                </h3>
                <i className="fas fa-sm fa-times mt-2 mx-2" onClick={() => setShow(false)} type={'button'}
                   style={{position: 'absolute', right: '0', top: '0'}}/>
            </Popover.Header>
            <Popover.Body>
                <div style={{maxHeight: '300px', overflowY: 'auto', overflowX: 'hidden'}}>
                    {searchHistory.length !== 0 ? (
                        searchHistory.map((search, index) => (
                            <Row className="justify-content-start" key={index}>
                                <ButtonGroup aria-label="Basic example" className="mb-2">
                                    <i className="fas fa-sm fa-times mt-2 mx-2" onClick={() => {
                                        setSearchHistory(searchHistory.filter((item) => item !== search));
                                    }} type={'button'}/>
                                    <Button
                                        key={index}
                                        variant="outline-primary"
                                        className="btn-sm rounded-pill shadow-sm border-0 me-2"
                                        onClick={() => {
                                            setShow(false);
                                            setSearch(search)
                                            handleSearch(search);
                                        }}
                                    >
                                        {search}
                                    </Button>
                                </ButtonGroup>
                            </Row>
                        ))
                    ) : (
                        <p className={'text-center'}>No search history</p>
                    )}
                </div>
            </Popover.Body>
        </Popover>
    );

    return (
        <div className="mb-3 position-relative">
            <OverlayTrigger placement="left" overlay={renderTooltip(searchHistory)} show={show}>
                <Button variant="info" className="btn-sm rounded-pill shadow-sm border-0 me-2" onClick={handleClick}>
                    <i className="fas fa-history"/>
                </Button>
            </OverlayTrigger>
        </div>
    );


}

