import { useState, useEffect, useContext, useRef } from "react";
import { useParams } from "react-router-dom";
import { Container } from "react-bootstrap";

import UserContext from "../../context/UserContext.js";
import NavigationBar from "../NavigationBar.jsx";
import StarRating from "../StarRating.jsx";

import { getMovieData } from "../../data/movie.js";
import submitReview from "../../data/submitReview";
import { getLists, addToList, checkList} from "../../data/lists";

const MoviePage = (props) => {
  const { movieid } = useParams();
  const [data, setData] = useState(null);
  const [existingList, setExistingList] = useState("");
  const [listInfo, setListInfo] = useState([]);
  const [selectedlist, setSelectedList] = useState("1");
  const [addToListMsg, setAddToListMsg] = useState("");
  const [star, setStar] = useState(0);
  const commentRef = useRef("");
  
  const { currUser, setUser } = useContext(UserContext);
  
  useEffect(() => {
    (async () => {
      let res = await checkList(movieid);
      console.log("Checking list info in MoviePage", res);
      if (res.data.existingList) {
        setExistingList(res.data.existingList[0].listName);
      } 
    })();
  }, []);

  useEffect(() => {
    (async () => {
      let res = await getLists();
      console.log("Getting list info in MoviePage", res);
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
  };

  const handleSubmitReview = async () => {
    if (!currUser) {
      alert("Please login to submit a review");
    } else {
      const comment = commentRef.current.value;
      const userid = currUser._id;
      await submitReview(userid, movieid, star, comment);
    }
  };

  const body = data ? (
    <Container>
      <img src={data.Poster} alt={data.Title} />
      <p>
        {data.Title}, {data.Year}
      </p>
      {existingList && (
        <p>This movie is already in your "{existingList}" list</p>
      )}
      {(listInfo.length > 0 && !existingList) ? (
        <>
        <select
          name="userLists"
          onChange={(e) => {
            setSelectedList(e.target.value);
            setAddToListMsg("");
          }}
        >
          {listInfo.map(function (li, index) {
            return <option value={li.id}>{li.listName}</option>;
          })}
        </select>
        <button
        onClick={handleAddToList}
        className="main_button"
        id="add-to-list-btn"
        >
          Add to List
        </button>
        <br />
        <p className="message">{addToListMsg}</p>
        </>
      ):(<></>)}

      {(listInfo.length == 0) ? 
      (<p>You don't have any lists yet! Make one in your profile page first to add this movie to a list.</p>)
      :(<></>)}
      
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
      <div className="review form-group">
        <h3>Review</h3>
        <StarRating
          numberOfStars="5"
          currentRating="0"
          onClick={(s) => {
            setStar(+s);
          }}
        />
        <label for="comment">Comment</label>

        <textarea
          className="form-control"
          id="comment"
          name="comment"
          rows="4"
          cols="50"
          placeholder="Is the movie good?"
          ref={commentRef}
        ></textarea>
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleSubmitReview}
        >
          Submit
        </button>
      </div>
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
