import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { Container, Col, Row, Carousel } from "react-bootstrap";
import NavigationBar from "../NavigationBar.jsx";
import MyList from "../MyList.jsx";
import jwtDecode from "jwt-decode";
import UserContext from "../../context/UserContext.js";

// import { getMovieData } from "../../data/movie.js";
import createList from "../../data/lists";

const Profile = (props) => {
  const [listName, setListName] = useState("");
  const [listMsg, setListMsg] = useState("");

  //IMPORTANT: user info is passed down from App.js in props.userInfo
  const { currUser, setUser } = useContext(UserContext);

  useEffect(() => {
    var user = currUser;
    if (!user) {
      //not logged in, redirect to home
      // props.history.push("/"); TODO: NOT WORKING
    }
  }, []);

  const handleAddList = async () => {
    try {
      const res = await createList(listName);
      setListMsg(res.data.message);
    } catch (error) {
      //GET LISTS TO RELOAD
      console.log(error);
    }
  };

  return (
    <div>
      <NavigationBar history={props.history} />
      <Container>
        <Row>
          <Col>
            {currUser && (
              <div>
                <h4>Welcome, {currUser.username}!</h4>
                <strong>Name: </strong>
                {currUser.firstName} {currUser.lastName}
                <br></br>
                <strong>Add New List:</strong>
                <input
                  type="text"
                  onChange={(e) => {
                    setListName(e.target.value);
                  }}
                  id="new-list-input"
                  placeholder="New List Name"
                />
                <button
                  onClick={handleAddList}
                  className="main_button"
                  id="new-list-btn"
                >
                  Add
                </button>
                <br />
                <p className="message">{listMsg}</p>
              </div>
            )}
          </Col>
        </Row>
      </Container>
      <MyList />
    </div>
  );
};

export default Profile;

  //   return (
  //     <div>
  //       <NavigationBar history={props.history} setUser={props.setUser} userInfo={props.userInfo}/>
  //       <Container>
  //         <Row>
  //           <Col>
  //             {props.userInfo && (
  //               <div>
  //                 <h4>Welcome, {props.userInfo.username}!</h4>
  //                 <strong>Name: </strong>{props.userInfo.firstName} {props.userInfo.lastName}<br></br>
  //                 <strong>Add New List:</strong>
  //                 <input type="text"
  //                     onChange={(e) => {setListName(e.target.value);}}
  //                     id="new-list-input"
  //                     placeholder="New List Name"
  //                 />
  //                 <button onClick={handleAddList} className="main_button" id="new-list-btn">Add</button>
  //                 <br />
  //                 <p className="message">{listMsg}</p>
  //               </div>
  //             )}
  //           </Col>
  //         </Row>
  //       </Container>
  //       <MyList userInfo={props.userInfo}/>
  //     </div>
  //   );
  // };
  
  // export default Profile;
