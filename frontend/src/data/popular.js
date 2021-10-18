// import React from "react";

// export default class getPopularMovieData extends React.Component {
//     constructor(props) {
//       super(props);
//       this.state = {
//         error: null,
//         isLoaded: false,
//         movies: []
//       };
//     }
  
//     async componentDidMount() {
//       const url = "https://api.themoviedb.org/3/movie/popular?api_key=ba49528b9403e15b24208bdec23df4b8&language=en-US&page=1"
//       const res = await fetch(url);
//       const data = await Response.json();
//       console.log(data)
    
//     }
  
//     render() {
//     //   const { error, isLoaded, movies } = this.state;
//     //   if (error) {
//     //     return <div>Error: {error.message}</div>;
//     //   } else if (!isLoaded) {
//     //     return <div>Loading...</div>;
//     //   } else {
//     //     return (
//     //     //   <ul>
//     //     //     {movies.map(movie => (
//     //     //       <li key={movie.id}>
//     //     //         {movie.title}
//     //     //       </li>
//     //     //     ))}
//     //     //   </ul>
//     //     <p>hi</p>
//     //     );
//     //   }
//     return (
//         <p>hi</p>
//     )
    
//     }
//   }
  

// // const getPopularMovieData = () => {
// //   const url = `https://api.themoviedb.org/3/movie/popular?api_key=ba49528b9403e15b24208bdec23df4b8&language=en-US&page=1`;
// //   const res = axios.get(url);
// //   if (res.status === 200) {
// //     return res.data;
// //   }
// //   return null;
// // };


import axios from "axios";

const getPopularMovieData = async () => {
  const url = "https://api.themoviedb.org/3/movie/popular?api_key=ba49528b9403e15b24208bdec23df4b8&language=en-US&page=1";
  const res = await axios.get(url);
  if (res.status === 200) {
    return res.data;
  }
  return null;
};

export { getPopularMovieData };