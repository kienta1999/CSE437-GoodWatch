import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import NavigationBar from "../NavigationBar.jsx";
import UserContext from "../../context/UserContext.js";

import Profile from "./Profile";
import MyList from "../MyList.jsx";

import checkUser from "../../data/checkUser";
import checkFollow from "../../data/follow";
import {
  follow,
  unfollow,
  countFollowers,
  countFollowing,
} from "../../data/follow";

const UserPage = (props) => {
  const { userid } = useParams();
  const [checkedUser, setCheckedUser] = useState(null);
  const [followed, setFollowed] = useState(false);
  const [followers, setFollowers] = useState(0);
  const [following, setFollowing] = useState(0);

  //IMPORTANT: user info is passed down from App.js in props.userInfo
  const { currUser, setUser } = useContext(UserContext);

  // useEffect(() => {
  //     var user = currUser;
  //     if (!user) {
  //       //not logged in, redirect to login
  //       props.history.push("/");
  //     }
  //   }, []);

  useEffect(() => {
    (async () => {
      try {
        let res = await checkUser(userid);
        if (res.status === 200) {
          console.log("Check User", res);
          setCheckedUser(res.data);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, [userid]);

  useEffect(() => {
    (async () => {
      try {
        let res = await countFollowers(userid);
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
        let res = await countFollowing(userid);
        if (res.status === 200) {
          console.log("Count Following", res.data.count);
          setFollowing(res.data.count);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  });

  useEffect(() => {
    (async () => {
      try {
        let res = await checkFollow(userid);
        if (res.status === 200) {
          console.log("Check Follow", res);
          setFollowed(res.data.followed);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  });

  const handleFollow = async () => {
    if (!currUser) {
      alert("Please login to follow other users");
    } else {
      try {
        const curr_userid = currUser._id;
        let res = await follow(curr_userid, userid);
        if (res.status === 200) {
          alert(res.data.message);
          setFollowed(true);
        } else {
          alert(res.data.message);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleUnfollow = async () => {
    if (!currUser) {
      alert("Please login to unfollow other users");
    } else {
      try {
        const curr_userid = currUser._id;
        let res = await unfollow(curr_userid, userid);
        if (res.status === 200) {
          alert(res.data.message);
          setFollowed(false);
        } else {
          alert(res.data.message);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  if (currUser && userid == currUser._id) {
    return <Profile {...props} />;
  } else {
    return (
      <div>
        <NavigationBar history={props.history} />
        <Container>
          <Row>
            <Col>
              {!checkedUser && (
                <div>
                  <h4>User Does Not Exist</h4>
                </div>
              )}
              {checkedUser && (
                <div>
                  <sub>
                    <a href="/profile">Back to Profile</a><br/>
                  </sub>
                  <h3>
                    Welcome to{" "}
                    <em>
                      {checkedUser.username}
                    </em>
                    's page!
                  </h3>
                  {/* <strong>Followers: </strong> {followers}
                  <br />
                  <strong>Following: </strong> {following}
                  <br /> */}
                  <div className="mb-2">
                    {checkedUser && currUser && (
                      <div>
                        {!followed ? (
                          <button
                            onClick={handleFollow}
                            className="btn"
                            id="new-list-btn"
                          >
                            Follow
                          </button>
                        ) : (
                          <button
                            onClick={handleUnfollow}
                            className="btn"
                            id="new-list-btn"
                          >
                            Unfollow
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                  <div className="d-inline-block mr-5 mb-2">
                    <h6>Followers: </h6>
                    {followers}
                  </div>
                  <div className="d-inline-block mb-2">
                    <h6>Following: </h6>
                    {following}
                  </div>
                  <br />
                </div>
              )}
              </Col>
          </Row>
        </Container>
        <br></br>
        {checkedUser && 
        <>
          <MyList otherUser={userid} />
        </>
      }
      </div>
    );
  }
};

export default UserPage;
