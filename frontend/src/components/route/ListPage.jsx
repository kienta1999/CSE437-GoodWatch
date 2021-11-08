import { useState, useEffect, useContext, useRef } from "react";
import { useParams } from "react-router-dom";
import { Container } from "react-bootstrap";

import UserContext from "../../context/UserContext.js";
import NavigationBar from "../NavigationBar.jsx";
import MovieList from "../MovieList.jsx";


import { getListContent } from "../../data/lists";
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
    var listContentInfo = []
    listContent.map((movie) => {
      (async () => {
        //MAYBE USE A DIFFERENT FUNCTION SO WE ARE NOT GETTING SOOO MUCH DATA EACH TIME
        const result = await getMovieData(movie.imdbId);
        if (result) {
          listContentInfo.push(result)
        }
      })();
    });
    setListContentDetails(listContentInfo)
  }, [listContent]);

  const handleRemove = async (event) => {
    event.preventDefault();
    console.log(event.target.parentNode.className)
    let itemId = event.target.parentNode.className
    // try {
    //   const res = await logout(history);
    // } catch (error) {
    //   console.log(error);
    // }
  }

  return (
    <div>
      <NavigationBar />
      {
        listContent.length > 0 ? (
          <Container>
            {listContent.map((movie) => {
              console.log(movie)
              return (
                <div key={movie['imdbId']} className={movie['imdbId']}>
                  {movie['imdbId']}
                  <button onClick={handleRemove}>Remove From List</button>
                </div>
              );
            })}
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