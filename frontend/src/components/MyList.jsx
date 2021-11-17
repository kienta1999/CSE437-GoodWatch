import { Container, ListGroup, Row, Col } from "react-bootstrap";
import { useState, useEffect, useContext } from "react";

import { getLists } from "../data/lists";
import UserContext from "../context/UserContext.js";

const MyList = (props) => {
  const [listInfo, setListInfo] = useState([]);
  const [message, setMessage] = useState(props.message)
  
  const { currUser, setUser } = useContext(UserContext);
  
  useEffect(() => {
    (async () => {
      let res = await getLists();
      console.log("Getting list info in MyList", res);
      setListInfo(res.data.listInfo);
    })();
  }, []);

  return (
    <Container>
      <Row>
        <Col>
        <h4>
          My Lists
          <hr></hr>
        </h4>
        <ListGroup>
          {listInfo &&
            listInfo.map(function (li, index) {
              return (
                <ListGroup.Item action key={li.id} href={`/profile/list/${li.id}`}>
                  {li.listName}
                </ListGroup.Item>
              );
            })}
        </ListGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default MyList;
