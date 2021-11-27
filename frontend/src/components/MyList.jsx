import { Container, ListGroup, Row, Col, Navbar, Nav, NavDropdown} from "react-bootstrap";
import { useState, useEffect, useContext } from "react";

import { getLists, deleteList } from "../data/lists";
import UserContext from "../context/UserContext.js";

const MyList = (props) => {
  const [listInfo, setListInfo] = useState([]);
  const [message, setMessage] = useState(props.message)
  const [deleteMsg, setDeleteMsg] = useState("");
  
  const { currUser, setUser } = useContext(UserContext);
  
  //getting lists
  useEffect(() => {
    (async () => {
      let res = await getLists();
      console.log("Getting list info in MyList", res);
      setListInfo(res.data.listInfo);
    })();
  }, [currUser, deleteMsg]);

  //Delete list
  const handleDelete = async (event) => {
    event.preventDefault();
    console.log(event.target.classList[0]);
    var listId = event.target.classList[0]
    try {
      const res = await deleteList(listId);
      // window.location.reload();
      console.log(res);
      setDeleteMsg(res.data.message);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
    {props.navList ? 
      (
        <>
          {listInfo &&
            listInfo.map(function (li, index) {
              return (
                <NavDropdown.Item key={li.id} href={`/profile/list/${li.id}`}>
                  {li.listName}
                </NavDropdown.Item>
              );
          })}
        </>
      ) :
      (
        <Container>
          <Row>
            <Col>
            {listInfo ? (
              <>
              <small className="message">{deleteMsg}</small>
              <ListGroup>
                {listInfo &&
                  listInfo.map(function (li, index) {
                    return (
                      <ListGroup.Item action key={li.id} href={`/profile/list/${li.id}`}>
                        {li.listName}
                        <button onClick={handleDelete} className={`${li.id} btn btn-sm deleteButton`}>Delete</button>
                      </ListGroup.Item>
                    );
                  })}
              </ListGroup>
              </>
            ) : (
              <div>Loading...</div>
            )}
            </Col>
          </Row>
        </Container>
      )
    }
    </>
  );
};

export default MyList;
