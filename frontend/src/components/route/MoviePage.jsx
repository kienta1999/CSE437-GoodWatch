import { useState, useEffect, useContext, useRef } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";

import UserContext from "../../context/UserContext.js";
import NavigationBar from "../NavigationBar.jsx";
import StarRating from "../StarRating.jsx";
import AllReview from "../AllReviews.jsx";

import { getMovieData } from "../../data/movie.js";
import { submitReview } from "../../data/review";
import { getLists, addToList, checkList } from "../../data/lists";

const MoviePage = (props) => {
  const { movieid } = useParams();
  const [data, setData] = useState(null);
  const [existingList, setExistingList] = useState("");

  const [listInfo, setListInfo] = useState([]);
  const [possibleListIds, setPossibleListIds] = useState([]);
  const [selectedlist, setSelectedList] = useState(null);
  const [addToListMsg, setAddToListMsg] = useState("");
  const [star, setStar] = useState(0);
  const commentRef = useRef("");

  const [reviewMsg, setReviewMsg] = useState(null);
  const [goodwatchScore, setGoodwatchScore] = useState(null);

  const { currUser, setUser } = useContext(UserContext);

  useEffect(() => {
    (async () => {
      // if (currUser && JSON.stringify(currUser) !== "{}") {
      let res = await checkList(movieid, possibleListIds);
      console.log("Checking list info in MoviePage", res);
      if (res.data.existingList) {
        if (res.data.existingList.length > 0) {
          setExistingList(res.data.existingList[0].listName);
        }
      }
      // }
    })();
  }, [addToListMsg, possibleListIds]);

  useEffect(() => {
    (async () => {
      // if (currUser && JSON.stringify(currUser) !== "{}") {
      let res = await getLists();
      console.log("Getting list info in MoviePage", res);
      setListInfo(res.data.listInfo);
      if (res.data.listInfo) {
        if (res.data.listInfo.length > 0) {
          setSelectedList(res.data.listInfo[0]["id"]);

          let possibleListIdsTemp = [];
          res.data.listInfo.map((list) => {
            console.log(list);
            possibleListIdsTemp.push(list["id"]);
          });
          setPossibleListIds(possibleListIdsTemp);
        }
      }
      // }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const result = await getMovieData(movieid);
      if (result) setData(result);
    })();
  }, [movieid]);

  const handleAddToList = async () => {
    if (!currUser || JSON.stringify(currUser) === "{}") {
      alert("Please login to submit a review");
    } else {
      try {
        const res = await addToList(selectedlist, movieid);
        setAddToListMsg(res.data.message);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleSubmitReview = async () => {
    if (!currUser || JSON.stringify(currUser) === "{}") {
      alert("Please login to submit a review");
    } else {
      const comment = commentRef.current.value;
      const userid = currUser._id;
      try {
        await submitReview(userid, movieid, star, comment);
        commentRef.current.value = "";
        setReviewMsg("Review submitted successfully");
      } catch (error) {
        if (error.response.status === 404) {
          setReviewMsg("Please leave a rating");
        } else {
          setReviewMsg("Something wrong with the server");
        }
      }
    }
  };

  const getGoodWatchAverageRating = (averageScore) => {
    setGoodwatchScore(averageScore);
  };

  const body = data ? (
    <Container>
      <Row>
        <Col>
      <img src={data.Poster} alt={data.Title} />
      <p>
        {data.Title}, {data.Year}
      </p>
      {existingList && (
        <div>
          <strong>This movie is in your "{existingList}" list</strong>
          <br></br>
          <br></br>
        </div>
      )}
      {listInfo && listInfo.length > 0 && !existingList ? (
        <>
          <select
            name="userLists"
            onChange={(e) => {
              setSelectedList(e.target.value);
              setAddToListMsg("");
            }}
          >
            {listInfo.map(function (li, index) {
              return (
                <option key={li.id} value={li.id}>
                  {li.listName}
                </option>
              );
            })}
          </select>
          <button
            onClick={handleAddToList}
            className="btn btn-primary"
          >
            Add to List
          </button>
          <br />
          <p className="message">{addToListMsg}</p>
        </>
      ) : (
        <></>
      )}

      {listInfo &&
      listInfo.length == 0 &&
      currUser &&
      JSON.stringify(currUser) !== "{}" ? (
        <p>
          You don't have any lists yet! Make one in your profile page first to
          add this movie to a list.
        </p>
      ) : (
        <></>
      )}

      <p>
        <strong>Actors:</strong> {data.Actors}
      </p>
      <p>
        <strong>Gerne:</strong> {data.Genre}
      </p>
      <p>
        <strong>IMDB Ratings:</strong> {data.imdbRating} / 10
      </p>
      {goodwatchScore > 0 ? (
        <p>
          <strong>GoodWatch Ratings:</strong> {goodwatchScore.toFixed(2)} / 5
        </p>
      ) : (
        <p>
          <strong>GoodWatch Ratings:</strong> N/A
        </p>
      )}
      <p>
        <strong>Votes:</strong> {data.imdbVotes}
      </p>
      <p>
        <strong>Plot: </strong>
        {data.Plot}
      </p>
      <div className="review form-group">
        <h3>Submit your review</h3>
        <StarRating
          numberOfStars="5"
          currentRating="0"
          onClick={(s) => {
            setStar(+s);
          }}
          fontSize="4rem"
          mutable
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
        {reviewMsg && <p style={{ color: "red" }}>{reviewMsg}</p>}
      </div>
      <AllReview
        movieid={movieid}
        getGoodWatchAverageRating={getGoodWatchAverageRating}
      />
      </Col>
      </Row>
    </Container>
  ) : (
    <div>Loading...</div>
  );

  return (
    <div>
      <NavigationBar history={props.history} />
      {body}
    </div>
  );
};

export default MoviePage;
