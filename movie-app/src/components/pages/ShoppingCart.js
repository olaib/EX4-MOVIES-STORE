import {Offcanvas, Row, Col, Pagination, Button, ButtonGroup,Spinner
} from 'react-bootstrap';
import CartItem from '../customs/CartItem';
import React, {useEffect, useState, useContext} from 'react';
import {ItemsProvider} from '../../App';
import {PRICE, CART_ITEMS_PER_PAGE, ALREADY_EXIST, ITEM_REMOVED ,ITEMS_REMOVED,ITEMS_NOT_SELECTED
} from '../constants';
import 'react-toastify/dist/ReactToastify.css';
import {SESSION_URL} from '../constants';
import {status} from '../funcs';

const ShoppingCart = (props) => {
        const {items, dispatch} = useContext(ItemsProvider);
        const [totalItems, setTotalItems] = useState(0);
        const [selectedItems, setSelectedItems] = useState([]);
        const {showCart, handleClose, emptyCart, setMsg} = props;
        const [loading, setLoading] = useState(false);

        useEffect(() => {
            setTotalItems(items.length);
        }, [items.length]);

        const [activePage, setActivePage] = useState(1);
        const lastItemIndex = activePage * CART_ITEMS_PER_PAGE
        const firstItemIndex = lastItemIndex - CART_ITEMS_PER_PAGE;
        const cartItemsToDisplay = items.slice(firstItemIndex, lastItemIndex);
        const handlePageChange = (pageNumber) => {
            setActivePage(pageNumber);
        };

        const handleCheckboxChange = (e) => {
            const itemId = +e.target.dataset.itemid;
            if (selectedItems.includes(itemId)) {
                setSelectedItems(selectedItems.filter((id) => id !== itemId));
            } else {
                setSelectedItems([...selectedItems, itemId]);
            }
        };
        /***
         * this function is used to delete an item from the cart.
         * @param itemId
         * @returns {Promise<void>}
         */
        const handleDeleteItem = async (itemId) => {
            setLoading(true);
            await fetch(`${SESSION_URL}${itemId}`,
                {method: 'DELETE'})
                .then(status)
                .then(data => {
                    dispatch({type: 'REMOVE_ITEM', payload: {id: itemId}});
                    setMsg(ITEM_REMOVED);
                }).catch(err => setMsg(err.message));
            setLoading(false);
        }
        /***
         * this function is used to delete the selected items from the cart.
         * @returns {Promise<void>}
         */
        const handleDeleteSelectedItems = async () => {
            const selectedIds = selectedItems.map((id) => id);
            if (selectedIds.length === 0) {
                setMsg(ITEMS_NOT_SELECTED);
                return;
            }
            setLoading(true);
            await fetch(`${SESSION_URL}delete`, {
                method: 'DELETE',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(selectedIds)
            })
                .then(status)
                .then(data => {
                    dispatch({type: 'DELETE_ITEMS', payload: {items: selectedIds}});
                    setMsg(ITEMS_REMOVED);
                })
                .catch(err => setMsg(err.message));
            setLoading(false);
        }

        return (
            <div style={{fontFamily: 'monospace'}}>
                <Offcanvas show={showCart} onHide={handleClose} placement={'end'}>
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title>Shopping Cart</Offcanvas.Title>
                        {loading && <Spinner animation="border" variant="primary"/>}
                    </Offcanvas.Header>
                    <Offcanvas.Body style={{height: '100vh', overflowY: 'scroll'}}>
                        {cartItemsToDisplay.length !== 0 ? (
                                <Row>
                                    <i className="fas fa-trash-alt" type={'button'}
                                       style={{fontSize: '1.5rem', cursor: 'pointer', color: 'red'}}
                                       onClick={emptyCart}/>
                                    {cartItemsToDisplay.map((item) => (
                                        <Row key={item.id} className={'my-3'}>
                                            <CartItem
                                                item={item}
                                                selected={selectedItems.includes(item.id)}
                                                handleCheckboxChange={handleCheckboxChange}
                                                isSelected={selectedItems.includes(item.id)}
                                                handleDeleteItem={handleDeleteItem}
                                            />
                                        </Row>
                                    ))}
                                    <Row md={2}>
                                        <Pagination className={'my-3'}>
                                            {[...Array(Math.ceil(items.length / CART_ITEMS_PER_PAGE)).keys()].map((pageNumber) => (
                                                <Pagination.Item
                                                    key={pageNumber + 1}
                                                    active={pageNumber + 1 === activePage}
                                                    onClick={() => handlePageChange(pageNumber + 1)}
                                                >
                                                    {pageNumber + 1}
                                                </Pagination.Item>
                                            ))}
                                        </Pagination>
                                    </Row>
                                    <Row className={'my-3'}>
                                        <h5>Total: {parseFloat(totalItems * PRICE).toFixed(2)} $</h5>

                                        <Row>
                                            <ButtonGroup className={'my-3'}>
                                                <Col md={6}>
                                                    {selectedItems.length > 0 && (
                                                        <Button className={'btn btn-danger'} onClick={handleDeleteSelectedItems}
                                                                disabled={selectedItems.length === 0} rule={'button'}>
                                                            <i className="fas fa-trash-alt"/>
                                                        </Button>
                                                    )}
                                                </Col>
                                                <Col md={6}>
                                                    <Button rule={'button'} href={'/checkout'} disabled={items.length === 0}
                                                            className={'btn btn-primary'}>
                                                        Checkout
                                                    </Button>
                                                </Col>
                                            </ButtonGroup>

                                        </Row>
                                    </Row>
                                </Row>
                            )
                            : (
                                <Row className={'text-center'}>
                                    <Col md={12}>
                                        <h3>Cart is empty </h3>
                                        <h2><i className="fas fa-xl fa-shopping-cart mt-5"/></h2>
                                        <i className="fas fa-xl fa-arrow-down py-5"/>
                                        <h4 className={'text-muted'}>
                                            take a look at our <a href={'/movies'}>movies</a> and enjoy! &#128521;</h4>
                                    </Col>
                                </Row>
                            )}
                    </Offcanvas.Body>
                </Offcanvas>
            </div>
        );
    }
;

export default ShoppingCart;
