import { useState, useEffect, useContext, useRef } from "react";
import { useParams } from "react-router-dom";
import { Container } from "react-bootstrap";
import { Col } from "react-bootstrap";

import UserContext from "../../context/UserContext.js";
import NavigationBar from "../NavigationBar.jsx";
import MovieList from "../MovieList.jsx";
import Movie from "../Movie.jsx";


import { getListContent, removeFromList } from "../../data/lists";
import { getMovieData } from "../../data/movie.js";

const ListPage = (props) => {
  const { listid } = useParams();
  const [listContent, setListContent] = useState([]);
  const [listContentDetails, setListContentDetails] = useState([]);

  //IMPORTANT: user info is passed down from App.js in props.userInfo
  const { currUser, setUser } = useContext(UserContext);

  useEffect(() => {
    (async () => {
      let res = await getListContent(listid);
      console.log("Getting list content in ListPage", res);
      setListContent(res.data.listContent);
    })();
  }, []);

  useEffect(() => {
    (async () => {
    const allFn = [...new Set(listContent
      .map((movie) => movie.imdbId))]
      .map((id) => {
        return async () => {
          return await getMovieData(id);
        };
      });
    let listContentInfo = await Promise.all(allFn.map((fn) => fn()));
    
    console.log(listContentInfo)

    setListContentDetails([...new Set(listContentInfo)])
    })();
  }, [listContent]);

  const handleRemove = async (event) => {
    event.preventDefault();
    console.log(event.target.parentNode.className)
    let itemId = event.target.parentNode.className
    try {
      const res = await removeFromList(listid, itemId);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <NavigationBar history={props.history}/>
      {
        listContentDetails.length > 0 ? (
          <Container>
            {/* {listContentDetails.map((movie) => {
              console.log(movie)
              return (
                <div key={movie['imdbID']} className={movie['imdbID']}>
                  <Col>
                    <Movie movie={movie} key={movie.imdbID} />
                    <button className="btn btn-warning" onClick={handleRemove}>Remove From List</button>
                  </Col>
                  <br />
                </div>
              );
            })} */}
            {listContentDetails &&
                <div>
                    <MovieList movies={listContentDetails} row={listContentDetails.length >= 5? 5:listContentDetails.length}>
                        <button className="btn btn-warning" onClick={handleRemove}>Remove From List</button>
                    </MovieList>
                </div>
            }
          </Container>
        ) : (
          <Container>This list doesn't have anything in it yet! Add some movies or TV shows to this list to see them here.</Container>
        )
      }
    </div>
  );
};

export default ListPage;