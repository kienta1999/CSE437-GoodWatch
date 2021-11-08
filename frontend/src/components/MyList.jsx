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
        {listInfo &&
          listInfo.map(function (li, index) {
            return (
              <ListGroup.Item action key={li.id} href={`/profile/list/${li.id}`}>
                {li.listName}
              </ListGroup.Item>
            );
          })}
      </ListGroup>
    </Container>
  );
};

export default MyList;
