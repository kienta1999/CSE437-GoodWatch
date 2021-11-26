import { useState, useEffect, useContext, useRef } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col} from "react-bootstrap";
import { MultiSelect } from "react-multi-select-component";

import UserContext from "../../context/UserContext.js";
import NavigationBar from "../NavigationBar.jsx";
import UpdateLists from "../UpdateLists.jsx";
import StarRating from "../StarRating.jsx";
import AllReview from "../AllReviews.jsx";

import { getMovieData } from "../../data/movie.js";
import { submitReview } from "../../data/review";
import { getLists, addToList, checkList, removeFromList } from "../../data/lists";

const MoviePage = (props) => {
  const { movieid } = useParams();
  const [data, setData] = useState(null);

  const [existingLists, setExistingLists] = useState([]);
  const [listInfo, setListInfo] = useState([]);
  const [listOptions, setListOptions] = useState([{label:"hi",value:"hi"}]);
  const [possibleListIds, setPossibleListIds] = useState(null);
  const [selectedlists, setSelectedLists] = useState([]);
  const [addToListMsg, setAddToListMsg] = useState("");

  const [star, setStar] = useState(0);
  const commentRef = useRef("");

  const [reviewMsg, setReviewMsg] = useState(null);
  const [goodwatchScore, setGoodwatchScore] = useState(null);

  const { currUser, setUser } = useContext(UserContext);

  //Get all user's lists
  useEffect(() => {
    (async () => {
  
      let res = await getLists();
      console.log("Getting list info in MoviePage", res);
      setListInfo(res.data.listInfo);

      if (res.data.listInfo) {
        if (res.data.listInfo.length > 0) {

          let possibleListIdsTemp = [];
          res.data.listInfo.map((list) => {
            console.log(list);
            possibleListIdsTemp.push(list["id"]);
          });
          setPossibleListIds(possibleListIdsTemp);
        }
      }

      if (res.data.listInfo) {
        if (res.data.listInfo.length > 0) {
          var listOpts = []
          res.data.listInfo.map(function (li, index) {
            listOpts.push({
              label: li.listName,
              value: li.id
            })
          });
          setListOptions(listOpts);
        }
      }
     
    })();
  }, []);

  //Check if movie is currently in a list
  useEffect(() => {
    (async () => {
      if (possibleListIds) {
        let res = await checkList(movieid, possibleListIds);
        console.log("Checking list info in MoviePage", res);
        if (res.data.existingLists) {
          if (res.data.existingLists.length > 0) {
            var selected = []
            res.data.existingLists.map(function (li, index) {
              selected.push({
                label: li.listName,
                value: li.id
              })
            });
            setExistingLists(selected);
            setSelectedLists(selected)
          }
        }
      }
    })();
  }, [addToListMsg, possibleListIds]);

  //Get data about movie
  useEffect(() => {
    (async () => {
      const result = await getMovieData(movieid);
      if (result) setData(result);
    })();
  }, [movieid]);

  //Add movie to selected lists
  const handleAddToList = async () => {
    if (!currUser || JSON.stringify(currUser) === "{}") {
      alert("Please login to add to lists");
    } else {
      try {

        const res = await removeFromList(listInfo, movieid)
        console.log("Remove from all lists", res)

        const res2 = await addToList(selectedlists, movieid);
        setAddToListMsg(res2.data.message);

      } catch (error) {
        console.log(error);
      }
    }
  };

  //Submit reviw
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

  //Get movie rating
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
          {/* {existingLists && (
            <div>
              <strong>This movie is in your <a href={`/profile/list/${existingLists.id}`}>{existingLists.listName}</a> list</strong>
              <br></br>
              <br></br>
            </div>
          )} */}
          
          <UpdateLists movieid={movieid}/>

          {/* {listInfo && listInfo.length > 0 ? (
            <>
              <pre>{JSON.stringify(selectedlists)}</pre>
              <MultiSelect
                options={listOptions}
                value={selectedlists}
                onChange={setSelectedLists}
                labelledBy="Select"
                hasSelectAll={false}
                disableSearch={true}
              />
              <button
                onClick={handleAddToList}
                className="btn btn-primary"
              >
                Update Lists
              </button>

              <br />
              <p className="message">{addToListMsg}</p>
            </>
          ) : (
            <></>
          )} */}

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
    <Container><Row><Col>Loading...</Col></Row></Container>
  );

  return (
    <div>
      <NavigationBar history={props.history} />
      {body}
    </div>
  );
};

export default MoviePage;
