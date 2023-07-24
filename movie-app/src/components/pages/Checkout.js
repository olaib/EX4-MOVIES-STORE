import {useState} from 'react';
import {Row, Col, Form, Button,Alert} from 'react-bootstrap';

import {FORM_INPUTS, FORM_DATA, TITLE_STYLE, PRICE, PURCHASES_URL,
    ORDER_CONFIRMATION_URL
} from '../constants';

/***
 * checkout page component
 * @returns {JSX.Element}
 * @constructor
 */
const Checkout = (props) => {
    const [formData, setFormData] = useState(FORM_DATA);
    const {items} = props;
    const total = items.length * PRICE
    const [msg, setMsg] = useState('');
    const handleChange = (e) => setFormData({...formData, [e.target.name]: e.target.value});

    const handleSubmit = async(e) => {
        e.preventDefault();
        if(total ===0 ) return false;
        const formdata = new FormData(e.target);
        fetch(PURCHASES_URL, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(Object.fromEntries(formdata))

        })
            .then(res => {
                if (res.status === 400) {
                    return res.json().then(data => {
                        const errorMessage = Object.values(data).join('\n');
                        throw new Error(errorMessage);
                    });
                } else if(res.status >= 200 && res.status < 300) {
                    return Promise.resolve(res);
                }
                return res.text().then(errorMessage =>
                    Promise.reject(new Error(errorMessage))
                );
            })
            .then(async res => {
                await props.emptyCart();
                window.location.href = ORDER_CONFIRMATION_URL;
            })
            .catch(err => {
                setMsg(err.message);
            });
    };
    return (
        <div style={{fontFamily: 'monospace'}} className={'my-5 mx-5'}>
            <h1 className={'text-center my-5'}
                style={TITLE_STYLE}>
                Checkout Page
            </h1>
            <Form onSubmit={handleSubmit}>
                <Row className={'my-3 rounded shadow-lg p-3'}>
                    <i className="fas fa-shopping-cart fa-2x text-center"/>
                    <Col md={6}>
                        <Row>
                            <h3 className={'text-center'}>Billing Details</h3>
                            <hr/>
                            {FORM_INPUTS.map((input, index) => (
                                <Row className={'my-3'} key={index}>
                                    < CustomForm
                                        key={index} label={input.label}
                                        type={input.type} placeholder={input.placeholder}
                                        name={input.name} value={formData[input.name]}
                                        onChange={handleChange}
                                    />
                                </Row>
                            ))}
                            {msg && <Alert variant={'danger'} className={'shadow-lg py-3'}>
                                {Object.keys(msg).length > 0?(
                                        <ul>
                                            {msg.split('\n').map((value, index) => (
                                                <li key={index}>{value}</li>
                                            ))}
                                        </ul>
                                    )
                                    : (
                                        <p>{msg}</p>
                                    )
                                }
                            </Alert>}
                        </Row>
                    </Col>
                    <Col md={6}>
                        <Row>
                            <h3 className={'text-center'}>Order Summary</h3>
                            <hr/>
                            <Row>
                                <h5>Items: {total??0}</h5>
                                <hr/>
                                <h3>Total: {parseFloat(total??0 * PRICE).toFixed(2)}</h3>
                                <input type="hidden" name="payment" value={parseFloat(total??0 * PRICE).toFixed(2)}/>
                                <p className={'text-muted'}>See items in cart above &#8593;</p>
                                <Button variant="dark" type="submit" className={'my-3 py-3'}>
                                    Pay Now
                                </Button>
                            </Row>
                        </Row>
                        <div className={'text-center my-3 col-md-6'}>
                            <h5>Payment Methods</h5>
                            <hr/>
                            <Row>
                                <img src="https://www.paypalobjects.com/webstatic/mktg/logo/AM_mc_vs_dc_ae.jpg"
                                     className={'img-fluid'}
                                     alt="PayPal Acceptance Mark"/>
                            </Row>
                        </div>
                    </Col>
                </Row>
            </Form>
        </div>
    );
};

export default Checkout;

/***
 * CustomForm component for create form inputs
 */
const CustomForm = (props) => {
    const {label, type, placeholder, name, value, onChange, pattern, invalidMsg} = props;

    return (
        <Form.Group controlId={`form${name}`}>
            <Col md={8}>
                <Form.Label>{label}</Form.Label>
                <Form.Control type={type} placeholder={placeholder} name={name} value={value}
                              onChange={onChange}
                />
                <Form.Control.Feedback type="invalid">
                    {invalidMsg}
                </Form.Control.Feedback>
            </Col>
            {name === 'email' && (
                <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                </Form.Text>
            )}
        </Form.Group>
    );
};
