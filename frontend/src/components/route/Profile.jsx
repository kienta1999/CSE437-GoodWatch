import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
// import { getMovieData } from "../../data/movie.js";
import NavigationBar from "../NavigationBar.jsx";
import MyList from "../MyList.jsx";
import jwtDecode from 'jwt-decode'

import { Container, Col, Row, Carousel } from "react-bootstrap";

const Profile = (props) => {
    const [currUser, setUser] = useState(props.userInfo);

    useEffect(() => {
      var user = localStorage.getItem('user')
      console.log("Profile getting user", user)
      console.log("new State", currUser)
      if (!user) {
        props.history.push("/");
      } 
      setUser(user);
    }, []);

    // const { movieid } = useParams();
    // const [data, setData] = useState(null);
    // useEffect(() => {
    //   (async () => {
    //     const result = await getMovieData(movieid);
    //     if (result) setData(result);
    //   })();
    // }, [movieid]);
    // const body = data ? (
    //   <Container>
    //     <img src={data.Poster} alt={data.Title} />
    //     <p>
    //       {data.Title}, {data.Year}
    //     </p>
    //     <p>
    //       <strong>Actors:</strong> {data.Actors}
    //     </p>
    //     <p>
    //       <strong>Gerne:</strong> {data.Genre}
    //     </p>
    //     <p>
    //       <strong>Ratings:</strong> {data.imdbRating}
    //     </p>
    //     <p>
    //       <strong>Votes:</strong> {data.imdbVotes}
    //     </p>
    //     <p>
    //       <strong>Plot: </strong>
    //       {data.Plot}
    //     </p>
    //   </Container>
    // ) : (
    //   <div>Loading...</div>
    // );
    return (
      <div>
        <NavigationBar history={props.history} userInfo={currUser}/>
        {currUser._id && (
          <p>hi {currUser.username}</p>
        )}
        <MyList />
      </div>
    );
  };
  
  export default Profile;