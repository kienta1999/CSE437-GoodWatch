import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { Container, Col, Row, Carousel } from "react-bootstrap";
import NavigationBar from "../NavigationBar.jsx";
import MyList from "../MyList.jsx";
import MovieRecommendation from "../MovieRecommendation.jsx";
import jwtDecode from "jwt-decode";
import UserContext from "../../context/UserContext.js";
import { getFollowers, getFollowing } from "../../data/follow";
import createList from "../../data/lists";
import UserSearching from "../UserSearching.jsx";
import getAllUsers from "../../data/allUsers";
import UserLabel from "../UserLabel.jsx";

const Profile = (props) => {
  const [listName, setListName] = useState("");
  const [listMsg, setListMsg] = useState("");
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [allUsers, setAllUsers] = useState([]);

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
        let res = await getFollowers(0);
        if (res.status === 200) {
          setFollowers(res.data);
          console.log("followers", res.data);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        let res = await getFollowing(0);
        if (res.status === 200) {
          setFollowing(res.data);
          console.log("following", res.data);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  });

  useEffect(() => {
    (async () => {
      try {
        let res = await getAllUsers();
        if (res.status === 200) {
          console.log("all", res.data);
          setAllUsers(res.data);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  },[]);

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
                <br />
                <strong>Followers: </strong>
                <UserLabel users={followers}/>
                <strong>Following: </strong>
                <UserLabel users={following}/>
                <br />
                <strong>Go and Visit Other Users: </strong> 
                <UserSearching userList={allUsers}/>
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
                <button onClick={handleAddList} className="btn btn-primary">
                  Create A New List
                </button>
                <br />
                <p className="message">{listMsg}</p>
              </div>
            )}
          </Col>
        </Row>
      </Container>
      {currUser && <MyList message={listMsg} />}
      <br/>
      {currUser && <MovieRecommendation />}
    </div>
  );
};

export default Profile;
