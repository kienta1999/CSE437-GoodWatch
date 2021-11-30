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

const ListPage = (props) => {
  const { listid } = useParams();
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
      // if (res.data.listContent.length > 0) {
      //   setSelectedItemtoChange(res.data.listContent[0]["imdbId"]);
      // }
      setRemoveMsg("");
      // setChangeListMsg("");
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
      let res = await getLists();
      console.log("Getting list info in ListPage", res);
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

  const handleRemove = async (event) => {
    event.preventDefault();
    console.log(event.target.parentNode.classList[0]);
    let itemId = event.target.parentNode.classList[0];
    try {
      var idList = [{id: listid}]
      const res = await removeFromList(idList, itemId);
      // window.location.reload();
      console.log(res);
      setRemoveMsg(res.data.message);
    } catch (error) {
      console.log(error);
    }
  };

  // const handleMove = async (event) => {
  //   setChangeListBool(!changeListBool);
  // };

  // const handleChangeList = async (event) => {
  //   let itemId = selectedItemtoChange;
  //   try {
  //     const res = await changeList(selectedlist, itemId);
  //     console.log(res);
  //     setChangeListMsg(res.data.message);
  //     setChangeListBool(!changeListBool);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <div>
      <NavigationBar history={props.history} />
      <Container className="mb-4">
        <Container>
          {listName && (
            <>
            <div>
              <sub>
                <a href="/profile">Back to Profile</a><br/>
              </sub>
              <h3>{listName}</h3>
              {/* {listContent && (
                <sub>{listContent.length} Items</sub>
              )} */}
            </div>
            </>
          )}
          {removeMsg && <p className="message">{removeMsg}</p>}
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
                setUpdateMsg={setRemoveMsg}
              >
                <button className="btn btn-sm btn-primary" onClick={handleRemove}>
                  Remove From List
                </button>
              </MovieList>
            </div>
          )}

          {/* {listContentDetails && (user != currUser._id) && (
            <div>
              <MovieList
                movies={listContentDetails}
                row={
                  listContentDetails.length >= 6 ? 6 : listContentDetails.length
                }
                setUpdateMsg={setRemoveMsg}
              >
              </MovieList>
            </div>
          )} */}
        </Container>
      ) : (
        <Container>
          <Container>
            {/* {(user != currUser._id) ?
            (
              <>This list doesn't have anything in it yet!</>
            ) :
            ( */}
              <>This list doesn't have anything in it yet! Add some movies or TV shows
              to this list to see them here.</>
            {/* )} */}
          </Container>
        </Container>
      )}
    </div>
  );
};

export default ListPage;
