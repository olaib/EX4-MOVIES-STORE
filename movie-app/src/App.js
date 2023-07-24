import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import NavAppBar from "./components/NavAppBar";
import {Modal, Row} from "react-bootstrap";
import {status, json} from "./components/funcs";
import React, {useState, useReducer, createContext, useEffect} from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";

import {
    ErrorPage,
    Home,
    Checkout,
    SearchPage,
    ShoppingCart,
    OrderComplete,
} from "./components/pages";
// import  from "./components/pages";
import {SESSION_URL, CART_CLEARED} from "./components/constants";

// Create the ItemsProvider context for the cart items
const ItemsProvider = createContext();

const App = () => {
    return (
        <div className={'App'}>
            <Website/>
            <PageFooter/>
        </div>
    );
};

/***
 * Website component is the main component of the website.
 * @returns {JSX.Element}
 * @constructor
 */
const Website = () => {
    // ===================== STATES =====================
    /** cart items state */
    const [items, dispatch] = useReducer(itemsReducer, []);
    const [showCart, setShowCart] = useState(false);
    const [totalItems, setTotalItems] = useState(0);
    const [msg, setMsg] = useState('');
    const [loading, setLoading] = useState(false);
    // ==================================================

    /***
     * this function is used to clear the cart items.
     * @returns {Promise<void>}
     */
    const emptyCart = async () => {
        setLoading(true);
        await fetch(SESSION_URL, {
            method: 'DELETE',
        })
            .then(status)
            .then(data => {
                dispatch({type: 'EMPTY_CART'});
                setMsg(CART_CLEARED);
            })
            .catch(err => setMsg(err.message));
        setLoading(false);
    }
    /***
     * this function is used to fetch the cart items from the session.
     * @returns {Promise<void>}
     */
    const fetchCartItems = async () => {
        setLoading(true);
        await fetch(SESSION_URL)
            .then(status)
            .then(json)
            .then(data => {
                if (data) {
                    dispatch({type: 'SET_ITEMS', items: data});
                }
            })
            .catch(err => setMsg(err.message));
        setLoading(false);
    };
    /***
     * This useEffect hook is used to fetch the cart items from the session.
     */
    useEffect(() => {
        fetchCartItems();
    }, []);

    /***
     * This useEffect hook is used to update the cart items
     * @param state
     * @param action
     * @returns {DataTransferItemList|*|*[]}
     */
    function itemsReducer(state, action) {
        switch (action.type) {
            case 'ADD_ITEM':
                return [...state, action.payload.item];
            case 'SET_ITEMS':
                return action.items;
            case 'REMOVE_ITEM':
                const id = action.payload.id;
                return state.filter(item => item.id !== id);
            case 'EMPTY_CART':
                return [];
            case 'DELETE_ITEMS':
                return state.filter(item => !action.payload.items.includes(item.id))
            default:
                break;
        }
        return state;
    }

    /**
     * @param product
     * @returns {boolean}
     * @constructor
     */
    const ItemExist = (id) => !!items.find(item => item.id === id);

    const handleClose = () => setShowCart(false);
    // ======================= JSX =======================
    return (
        <div className="App">
            <div section="body">
                <Row>
                    <NavAppBar items={items.length} showCart={showCart} setShowCart={setShowCart}/>
                </Row>
                <Row>
                    {msg &&
                        <Modal show={true} onHide={() => setMsg('')} animation={true}>
                            <Modal.Header closeButton className="bg-dark text-white text-center border-info">
                                <Modal.Title>Notification</Modal.Title>
                            </Modal.Header>
                            <Modal.Body className="bg-dark text-white">{msg}</Modal.Body>
                            <Modal.Footer className="bg-dark text-white border-info">
                                <button className="btn btn-outline-light" onClick={() => setMsg('')}>
                                    Close
                                </button>
                            </Modal.Footer>
                        </Modal>
                    }
                    <ItemsProvider.Provider value={{items, dispatch}}>
                        <ShoppingCart showCart={showCart} handleClose={handleClose} emptyCart={emptyCart}
                                      setMsg={setMsg}
                                      ItemExist={ItemExist} setTotalItems={setTotalItems} loading={loading}/>
                        <BrowserRouter>
                            <Routes>
                                <Route path="/" exact element={<Home setShowCart={setShowCart}/>}/>
                                <Route path="/movies" element={
                                    <SearchPage items={items} itemsDispatch={dispatch}
                                                setMsg={setMsg} ItemExist={ItemExist} loading={loading}
                                                setLoading={setLoading} isExist={ItemExist}/>
                                }/>
                                <Route path="/order-complete" element={<OrderComplete/>}/>
                                {/*//if checkout was items==0 then redirect to home*/}
                                <Route
                                    path={`/checkout/`}
                                    element={ <Checkout total={items.total} totalPrice={totalItems} itemsDispatch={dispatch} emptyCart={emptyCart} setTotalItems={setTotalItems} items={items} />}
                                />
                                <Route path="*" element={<ErrorPage/>}/>
                            </Routes>
                        </BrowserRouter>
                    </ItemsProvider.Provider>
                </Row>
            </div>
        </div>
    );
}

/***
 * Footer component
 * @returns {JSX.Element}
 * @constructor
 */
const PageFooter = () => {
    return (
        <footer className="bg-dark text-center text-white my-5 py-3 container-fluid" aria-hidden={'true'}>
            <p>© 2023 Popcornflix Shop. All rights reserved.</p>
        </footer>
    );
};

export default App;
export {ItemsProvider};
