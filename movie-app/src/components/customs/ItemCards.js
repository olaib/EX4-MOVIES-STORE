import {Card} from 'react-bootstrap';

const ItemCards = (props) => {
    return (
        <div style={{textDecoration: 'none', color: 'black'}}>
            <Card
                className={"hovered card-sections shadow-lg rounded-circle h-100 border-0 mb-3 border-0 shadow-sm p-3 home-container"}>
                <div className="card-img-container rounded-circle">
                    <Card.Img src={props.image} className="img-fluid border-6 card-img-top border-6 shadow-sm"
                              alt={props.title}/>
                </div>
                <Card.Body className="card-body d-flex flex-column justify-content-between">
                    <Card.Title
                        className="mb-0 text-center badge rounded-5 rounded bg-secondary">{props.title}</Card.Title>
                    <p className="d-none d-md-block text-center mb-1"><small>{props.description}</small></p>
                    <a rule={'btn'} className="btn justify-content-center text-primary" href={props.link}>
                        <i className="fas fa-eye me-2" style={{color: "blue"}}/> View
                    </a>
                </Card.Body>
            </Card>
        </div>
    )
}

export default ItemCards;
