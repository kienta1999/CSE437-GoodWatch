import { Container, ListGroup } from "react-bootstrap";

const MyList = () => {
    return (
        <Container>
            <h4>
                MY LIST
                <hr></hr>
            </h4>
            <ListGroup>
                <ListGroup.Item action href="#link1">Want To Watch</ListGroup.Item>
                <ListGroup.Item action href="#link2">Currently Watching</ListGroup.Item>
                <ListGroup.Item action href="#link3">Watched</ListGroup.Item>
            </ListGroup>
        </Container>

    );
}

export default MyList;