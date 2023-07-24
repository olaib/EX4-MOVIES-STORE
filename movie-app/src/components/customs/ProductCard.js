import "../../public/style.css";
import {useContext, useState} from "react";
import {ItemsProvider} from "../../App";
import {StarRating} from "./DisplayCard";
import {status, handleError, json} from "../funcs";
import {Button, Card, Spinner} from "react-bootstrap";
import {PRICE, IMAGE_URL, movieImg, SESSION_URL, ALREADY_EXIST, ITEM_ADD_SUCCESS} from "../constants";
import {toast} from "react-toastify";

const ProductCard = (props) => {
    const {dispatch} = useContext(ItemsProvider);
    const [loading, setLoading] = useState(false);
    const {
        product, handleClick, setMsg, isExist,
    } = props;
    const addToCart = async () => {
        setLoading(true);
        await fetch(SESSION_URL, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(product)
        }).then(status)
            .then(data => {
                dispatch({type: "ADD_ITEM", payload: {item: product}})
                setMsg(ITEM_ADD_SUCCESS);
            })
            .catch(err => setMsg(err.message));
        setLoading(false);
    }
    return (
        <Card
            className={"card-sections hover-box shadow-lg border-0 border-0 p-3 rounded h-100"}
            aria-controls="example-collapse-text" key={product.id} style={{fontStyle: "cursive"}}
        >
            <Card.Img variant="top"
                      type="button"
                      src={`${product.poster_path ? IMAGE_URL + product.poster_path : movieImg}`}
                      className={`img-fluid border-6 card-img-top ${product.poster_path ?? 'border-6 shadow-sm'}`}
                      alt={`${product.title}`} style={{height: "300px"}}/>
            <Card.Body className="card-body justify-content-between">
                <Card.Title className="text-center text-capitalize mb-0" style={{fontSize: "1.2rem"}}>
                    {product.title}
                </Card.Title>
                <Button className="text-end"
                        variant="transparrent" size="sm"
                        onClick={() => handleClick(product)}>
                    <i className={`fas fa-info-circle me-2 ${product.overview ? 'text-primary' : 'text-secondary'}`}/>
                    <small className={`${product.overview ? 'text-primary' : 'text-secondary'}`}>
                        {product.overview ? 'View Details' : 'No Details'}
                    </small>
                </Button>
                {product.release_date &&
                    <p><i className="fas fa-calendar-alt me-2" style={{color: "#4d4646"}}/>
                        <small>{product.release_date}</small>
                    </p>}
                <StarRating average={product.vote_average} count={product.vote_count}/>
            </Card.Body>
            <Card.Footer className="text-center">
                <p className="me-2">{`Price: ${PRICE}`} &nbsp;
                    <Button className="text-end" variant="success" size="sm" style={{borderRadius: "50%"}}
                             onClick={addToCart}   disabled={isExist(product.id)}>
                    <i className="fas fa-shopping-cart" style={{color: "#A6CC85"}}/>
                        {loading && <Spinner animation="border" variant="light" size="sm"/>}
                    </Button>
                </p>
            </Card.Footer>
        </Card>
    );
}

export default ProductCard;
