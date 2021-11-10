import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { Container, Col, Row, Carousel } from "react-bootstrap";
import NavigationBar from "../NavigationBar.jsx";
import MyList from "../MyList.jsx";
import jwtDecode from "jwt-decode";
import UserContext from "../../context/UserContext.js";
import { countFollowers, countFollowing } from "../../data/follow";
import createList from "../../data/lists";

const Profile = (props) => {
  const [listName, setListName] = useState("");
  const [listMsg, setListMsg] = useState("");
  const [followers, setFollowers] = useState(0);
  const [following, setFollowing] = useState(0);

  const { currUser, setUser } = useContext(UserContext);

  // useEffect(() => {
  //   var user = currUser;
  //   if (!user) {
  //     //not logged in, redirect to login
  //     props.history.push("/");
  //   }
  // }, []);

  useEffect(() => {
    (async () => {
      try {
        let res = await countFollowers(0);
        if (res.status === 200) {
          console.log("Count Followers", res.data.count);
          setFollowers(res.data.count);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  });

  useEffect(() => {
    (async () => {
      try {
        let res = await countFollowing(0);
        if (res.status === 200) {
          console.log("Count Following", res.data.count);
          setFollowing(res.data.count);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  });

  const handleAddList = async () => {
    try {
      const res = await createList(listName);
      setListMsg(res.data.message);
      window.location.reload();
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
                <h4>
                  Welcome,{" "}
                  <em>
                    <u>{currUser.username}</u>
                  </em>
                  !
                </h4>
                <strong>Name: </strong>
                {currUser.firstName} {currUser.lastName}
                <br />
                <strong>Followers: </strong> {followers}
                <br />
                <strong>Following: </strong> {following}
                <br />
                <br />
                <strong>Add New List: </strong>
                <input
                  type="text"
                  onChange={(e) => {
                    setListName(e.target.value);
                  }}
                  id="new-list-input"
                  placeholder="New List Name"
                />
                <br />
                <br />
                <button
                  onClick={handleAddList}
                  className="main_button"
                  id="new-list-btn"
                >
                  Create A New List
                </button>
                <br />
                <p className="message">{listMsg}</p>
              </div>
            )}
          </Col>
        </Row>
      </Container>
      <MyList message={listMsg} />
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
