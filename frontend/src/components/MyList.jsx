import { Container, ListGroup } from "react-bootstrap";
import { useState, useEffect, useContext } from "react";

import { getLists } from "../data/lists";
import UserContext from "../context/UserContext.js";

const MyList = (props) => {
  const [listInfo, setListInfo] = useState([]);
  const { currUser, setUser } = useContext(UserContext);
  //IMPORTANT: user info is passed down from App.js in props.userInfo

  useEffect(() => {
    (async () => {
      let res = await getLists();
      console.log("Getting list info in MyList", res);
      setListInfo(res.data.listInfo);
    })();
  }, []);

  return (
    <Container>
      <h4>
        My Lists
        <hr></hr>
      </h4>
      <ListGroup>
        <ListGroup.Item action key="0123" href="helo">
          Want To Watch
        </ListGroup.Item>
        <ListGroup.Item action key="112" href="#link2">
          Currently Watching
        </ListGroup.Item>
        <ListGroup.Item action key="234" href="#link3">
          Watched
        </ListGroup.Item>
        {listInfo &&
          listInfo.map(function (li, index) {
            return (
              <ListGroup.Item action key={li.id} href="#link4">
                {li.listName}
              </ListGroup.Item>
            );
          })}
      </ListGroup>
    </Container>
  );
};

export default MyList;
