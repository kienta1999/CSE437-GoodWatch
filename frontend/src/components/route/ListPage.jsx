import { useState, useEffect, useContext, useRef } from "react";
import { useParams } from "react-router-dom";
import { Container } from "react-bootstrap";

import UserContext from "../../context/UserContext.js";
import NavigationBar from "../NavigationBar.jsx";
import MovieList from "../MovieList.jsx";


import { getListContent, removeFromList, changeList } from "../../data/lists";
import { getMovieData } from "../../data/movie.js";

const ListPage = (props) => {
  const { listid } = useParams();
  const [listContent, setListContent] = useState([]);
  const [listContentDetails, setListContentDetails] = useState([]);
  const [removeMsg, setRemoveMsg] = useState("");

  const { currUser, setUser } = useContext(UserContext);

  useEffect(() => {
    (async () => {
      let res = await getListContent(listid);
      console.log("Getting list content in ListPage", res);
      setListContent(res.data.listContent);
    })();
  }, [removeMsg]);

  useEffect(() => {
    (async () => {
    // var listContentInfo = []
    const allFn = listContent
      .map((movie) => movie.imdbId)
      .map((id) => {
        return async () => {
          return await getMovieData(id);
        };
      });
    const listContentInfo = await Promise.all(allFn.map((fn) => fn()));

    console.log(listContentInfo)
    setListContentDetails(listContentInfo)
    })();
  }, [listContent]);

  const handleRemove = async (event) => {
    event.preventDefault();
    console.log(event.target.parentNode.className)
    let itemId = event.target.parentNode.className
    try {
      const res = await removeFromList(listid, itemId);
      console.log(res)
      setRemoveMsg(res.data.message)
    } catch (error) {
      console.log(error);
    }
  }

  // const changeList = async (event) => {
  //   event.preventDefault();
  //   console.log(event.target.parentNode.className)
  //   let itemId = event.target.parentNode.className
  //   try {
  //     const res = await changeList(listid, itemId);
  //     console.log(res)
  //     setChangeListMsg(res.data.message)
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  return (
    <div>
      <NavigationBar history={props.history}/>
      {
        listContentDetails.length > 0 ? (
          <Container>
            {listContentDetails.map((movie) => {
              console.log(movie)
              return (
                <div key={movie['imdbID']} className={movie['imdbID']}>
                  <p>{movie['Title']}</p>
                  <button onClick={handleRemove}>Remove From List</button>
                </div>
              );
            })}
            {removeMsg && (<p className="message">{removeMsg}</p>)}
            {/* {listContentDetails && <MovieList movies={listContentDetails} row={5} />} */}
          </Container>
        ) : (
          <Container>This list doesn't have anything in it yet! Add some movies or TV shows to this list to see them here.</Container>
        )
      }
    </div>
  );
};

export default ListPage;