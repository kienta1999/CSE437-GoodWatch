import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { Container } from "react-bootstrap";
import NavigationBar from "../NavigationBar.jsx";
import MyList from "../MyList.jsx";
import UserContext from "../../context/UserContext.js";

import Profile from "./Profile"

import checkUser from "../../data/checkUser";
import checkFollow from "../../data/follow";
import { follow, unfollow } from "../../data/follow";

const UserPage = (props) => {
    const { userid } = useParams();
    const [ checkedUser, setCheckedUser ] = useState(null);
    const [ logged, setLogged ] = useState(false);
    const [ isSelf, setIsSelf ] = useState(false);
    const [ followed, setFollowed ] = useState(false);

    //IMPORTANT: user info is passed down from App.js in props.userInfo
    const { currUser, setUser } = useContext(UserContext);

    useEffect(() => {
        var user = currUser;
        if (!user) {
        //not logged in, redirect to home
        // props.history.push("/"); TODO: NOT WORKING
        }
    }, []);

    useEffect(() => {
        if (userid === currUser._id) {
            setIsSelf(true);
        }
      }, [currUser._id, userid]);

    useEffect(() => {
        (async () => {
          let res = await checkUser(userid);
          console.log("Check User", res);
          setCheckedUser(res.data);
        })();
      }, [userid]);

    useEffect(() => {
        (async () => {
          let res = await checkFollow(currUser._id, userid);
          console.log("Check Follow", res);
          setFollowed(res.data.followed);
        })();
      }, [currUser._id, userid]);
    

    const handleFollow = async () => {
        if (!currUser) {
            alert("Please login to follow other users");
        } else {
            try {
                const curr_userid = currUser._id;
                let res = await follow(curr_userid, userid);
                alert("Successfully Follow!")
                setFollowed(true)
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
                alert("Successfully Unfollow!")
                setFollowed(false)
            } catch (error) {
                console.log(error);
            }
            
        }
    };

    if (isSelf) {
        return (
            <Profile {...props} />
        )
    } else {
        return (
            <div>
            <NavigationBar history={props.history} />
            <Container>
                {!checkedUser && (
                    <div>
                        <h4>User Not Exist</h4>
                    </div>
                )}
                {checkedUser && (
                    <div>
                        <h4>{checkedUser.username}</h4>
                    </div>
                )}
                {currUser && (
                    <div>
                        {!followed 
                            ? 
                                <button
                                    onClick={handleFollow}
                                    className="main_button"
                                    id="new-list-btn"
                                >
                                Follow
                                </button>
                            : 
                                <button
                                    onClick={handleUnfollow}
                                    className="main_button"
                                    id="new-list-btn"
                                >
                                Unfollow
                                </button>
                        }
                    </div>
                )}
                <br></br>
            </Container>
            <MyList />
            </div>
        );
    }

};

export default UserPage;
