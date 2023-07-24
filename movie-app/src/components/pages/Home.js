import {Row, Col} from "react-bootstrap";
import ItemCards from "../customs/ItemCards";
import AnimatedBtn from "../customs/AnimatedBtn";
import {HOME_ITEMS} from "../constants";

const titleStyle = {
    fontFamily: 'fantasy',
    fontStyle: 'italic',
    textShadow: '1px 1px 1px #000000'
}

const Home = () => {
    return (
        <section key={"home"} className={'min-vh-100'}>
            <Row className={"my-5 text-center rounded"}>
                <Col className={"d-flex flex-column justify-content-center align-items-center"}>
                    <div style={titleStyle} className={"my-3"}>
                    <h3 className={'display-2'}>Welcome to Popcornflix Shop! <i className="fas fa-film fa-lg"/> &nbsp;</h3>
                        <h3>Get Your Popcorn Ready! Discover the Latest and Greatest Movies at Our Online Shop!</h3>
                    </div>
                    <h6 style={{fontFamily: 'monospace', fontStyle: 'italic',fontSize: '20px'}}
                        className={"my-3 border-0 rounded-6 shadow-sm p-3 home-container"}>
                        <div style={{fontFamily: 'monospace', fontStyle: 'italic', color: 'black', fontSize: '20px'}}>
                            We have a wide selection of movies, TV shows, and video games for you to choose from!<br/>
                            <br/>
                            Your One-Stop-Shop for All Your Movie Needs and Wants, Enjoy! &#128526;
                        </div>
                    </h6>
                </Col>
            </Row>
            <Row className={"my-5"}>
                <Col className={'text-center'}>
                    <AnimatedBtn title={"Shop Now"} link={"/movies"} img={HOME_ITEMS[0].img}
                                 value={"Start Shopping Now!"}/>
                </Col>
            </Row>
            <Row className={"mx-2"} style={{fontFamily: 'monospace'}}>
                <h5 className={"text-center bg-gradient bg-dark text-white p-3 shadow-lg rounded-3"}
                    style={{fontStyle: 'italic', color: 'black', fontSize: '30px'}}
                >Our Services</h5>
                {HOME_ITEMS.map((item) => (
                    <Col key={item.title} md={4} className={"my-3"}>
                        <ItemCards title={item.title} image={item.img} description={item.description} link={item.link}/>
                    </Col>
                ))}
            </Row>
        </section>
    );
}

export default Home;
