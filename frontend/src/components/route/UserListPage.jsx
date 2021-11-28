import { useState, useEffect, useContext, useRef } from "react";
import { useParams } from "react-router-dom";
import { Container } from "react-bootstrap";
import { Col, Row } from "react-bootstrap";

import UserContext from "../../context/UserContext.js";
import NavigationBar from "../NavigationBar.jsx";
import MovieList from "../MovieList.jsx";
import Movie from "../Movie.jsx";

import {
  getListContent,
  removeFromList,
  changeList,
  getLists,
} from "../../data/lists";
import { getMovieData } from "../../data/movie.js";

const UserListPage = (props) => {
  const { userid, listid } = useParams();
  const [listName, setListName] = useState("");

  const [listContent, setListContent] = useState([]);
  const [listContentDetails, setListContentDetails] = useState([]);
  const [removeMsg, setRemoveMsg] = useState("");

  const [changeListBool, setChangeListBool] = useState(false);
  const [listInfo, setListInfo] = useState([]);
  const [selectedItemtoChange, setSelectedItemtoChange] = useState(null);
  const [selectedlist, setSelectedList] = useState(null);
  const [changeListMsg, setChangeListMsg] = useState("");

  const { currUser, setUser } = useContext(UserContext);

  //Get list items
  useEffect(() => {
    (async () => {
      let res = await getListContent(listid);
      console.log("Getting list content in ListPage", res);
      setListContent(res.data.listContent);
    })();
  }, [removeMsg]);

  //Get movie data for all items in list
  useEffect(() => {
    (async () => {
      const allFn = [...new Set(listContent.map((movie) => movie.imdbId))].map(
        (id) => {
          return async () => {
            return await getMovieData(id);
          };
        }
      );
      const listContentInfo = await Promise.all(allFn.map((fn) => fn()));
      setListContentDetails(listContentInfo);
    })();
  }, [listContent]);

  //Get all list info (name)
  useEffect(() => {
    (async () => {
      let res = await getLists(userid);
      console.log("Getting other user list info in ListPage", res);
      setListInfo(res.data.listInfo);
      if (res.data.listInfo.length > 0) {
        for (var i = 0; i < res.data.listInfo.length; i++) {
          if (res.data.listInfo[i]["id"] == listid) {
            setListName(res.data.listInfo[i]["listName"]);
            break;
          }
        }
      }
    })();
  }, []);

  return (
    <div>
      <NavigationBar history={props.history} />
      <Container className="mb-4">
        <Container>
          {listName && (
            <div>
              <sub>
                <a href={`/user/${userid}`}>Back to User Page</a><br/>
                {/* <em>My List</em> */}
              </sub>
              <h3>{listName}</h3>
            </div>
          )}
        </Container>
      </Container>

      {listContentDetails.length > 0 ? (
        <Container>
          {/* {listContentDetails.map((movie) => {
            return (
              <Col key={movie["imdbID"]} className={movie["imdbID"]}>
                <Movie movie={movie} key={movie.imdbID} />
                <button className="btn btn-primary" onClick={handleRemove}>
                  Remove From List
                </button>
                <br />
              </Col>
            );
          })} */}
          {listContentDetails && (
            <div>
              <MovieList
                movies={listContentDetails}
                row={
                  listContentDetails.length >= 6 ? 6 : listContentDetails.length
                }
              >
              </MovieList>
            </div>
          )}
        </Container>
      ) : (
        <Container>
          <Container>
              <>This list doesn't have anything in it yet!</>
          </Container>
        </Container>
      )}
    </div>
  );
};

export default UserListPage;
