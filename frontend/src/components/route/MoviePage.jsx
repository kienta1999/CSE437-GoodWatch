import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getMovieData } from "../../data/movie.js";
import { getLists, addToList } from "../../data/lists";
import NavigationBar from "../NavigationBar.jsx";
import { Container } from "react-bootstrap";

const MoviePage = (props) => {
  const { movieid } = useParams();
  const [data, setData] = useState(null);
  const [selectedlist, setSelectedList] = useState("1");
  const [addToListMsg, setAddToListMsg] = useState("");
  const [listInfo, setListInfo] = useState([]);

  //IMPORTANT: user info is passed down from App.js in props.userInfo

  useEffect(() => {
    (async () => {
      let res = await getLists();
      console.log("Getting list info in MoviePage", res)
      setListInfo(res.data.listInfo);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const result = await getMovieData(movieid);
      if (result) setData(result);
    })();
  }, [movieid]);

  const handleAddToList = async () => {
    try {
      const res = await addToList(selectedlist, movieid);
      setAddToListMsg(res.data.message);
    } catch (error) {
        console.log(error);
    }
  }

  const body = data ? (
    <Container>
      <img src={data.Poster} alt={data.Title} />
      <p>
        {data.Title}, {data.Year}
      </p>
      {listInfo && (
        <select name="userLists" onChange={(e) => {setSelectedList(e.target.value);setAddToListMsg("");}}>
          {listInfo.map(function(li, index){
              return <option value={li.id}>{li.listName}</option>
          })}
        </select>
      )}
      <button onClick={handleAddToList} className="main_button" id="add-to-list-btn">Add to List</button>
      <br />
      <p className="message">{addToListMsg}</p>
      <p>
        <strong>Actors:</strong> {data.Actors}
      </p>
      <p>
        <strong>Gerne:</strong> {data.Genre}
      </p>
      <p>
        <strong>Ratings:</strong> {data.imdbRating}
      </p>
      <p>
        <strong>Votes:</strong> {data.imdbVotes}
      </p>
      <p>
        <strong>Plot: </strong>
        {data.Plot}
      </p>
    </Container>
  ) : (
    <div>Loading...</div>
  );


  return (
    <div>
      <NavigationBar />
      {body}
    </div>
  );
};

export default MoviePage;
