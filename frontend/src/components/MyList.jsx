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
      if (!props.otherUser){
        let res = await getLists();
        console.log("Getting list info in MyList", res);
        setListInfo(res.data.listInfo);
      }
    })();
  }, [currUser, deleteMsg]);

  //otherUser

  //getting lists
  useEffect(() => {
    (async () => {
      if (props.otherUser) {
        let res = await getLists(props.otherUser);
        console.log("Getting other user's list info in MyList", res);
        setListInfo(res.data.listInfo);
      }
    })();
  }, [props.otherUser]);

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
          {listInfo && listInfo.length > 0 ? (
            listInfo.map(function (li, index) {
              return (
                <NavDropdown.Item key={li.id} href={`/profile/list/${li.id}`}>
                  {li.listName}
                </NavDropdown.Item>
              );
          })) : (
            <NavDropdown.Item href="/profile">
              You don't have any lists yet! Make one in your <a href="/profile">profile</a>
            </NavDropdown.Item>
          )}
        </>
      ) :
      (
        <Container>
          <Row>
            <Col>
            {listInfo && listInfo.length > 0 ? (
              <>
                {(!props.otherUser) && (
                  <>
                    {/* <small className="message">{deleteMsg}</small> */}
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
                )}
                {(props.otherUser) && (
                  <>
                    <ListGroup>
                      {listInfo &&
                        listInfo.map(function (li, index) {
                          return (
                            <ListGroup.Item action key={li.id} href={`/user/list/${props.otherUser}/${li.id}`}>
                              {li.listName}
                            </ListGroup.Item>
                          );
                      })}
                    </ListGroup>
                  </>
                )}
              </>
            ) : (
              <>
              {!props.otherUser && (<div>You don't have any lists yet! Make one in your <a href="/profile">profile</a></div>)}
              {props.otherUser && (<div>This user doesn't have any lists yet</div>)}
              </>
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
